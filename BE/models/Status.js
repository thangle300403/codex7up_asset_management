const db = require('../db');

const StatusModel = {
    async getAll() {
        const [rows] = await db.execute("SELECT id, status_name  FROM asset_status");
        return rows;
    },

    async create(status_name) {
        const [result] = await db.execute(
            'INSERT INTO asset_status (status_name) VALUES (?)',
            [status_name]
        );
        return result.insertId;
    },

    async getById(id) {
        const [rows] = await db.execute('SELECT * FROM asset_status WHERE id = ?', [id]);
        return rows[0];
    },

    async update(id, status_name) {
        const [result] = await db.execute(
            'UPDATE asset_status SET status_name = ? WHERE id = ?',
            [status_name, id]
        );
        return result.affectedRows;
    },

    async deleteStatus(id) {
        // Check if asset is assigned to a department
        const [assignments] = await db.query(
            "SELECT * FROM assets WHERE status_id = ?",
            [id]
        );
        if (assignments.length > 0) {
            throw new Error("Status is assigned to a asset and cannot be deleted.");
        }

        const [result] = await db.query("DELETE FROM asset_status WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
};

module.exports = StatusModel;
