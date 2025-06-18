const db = require('../db');

const Assignment = {
    async getAll() {
        const [rows] = await db.query(`
      SELECT 
        aa.id,
        a.name AS asset,
        d.name AS department,
        aa.assigned_date
      FROM asset_assignment aa
      JOIN assets a ON a.id = aa.asset_id
      JOIN department d ON d.id = aa.department_id
      ORDER BY aa.assigned_date DESC
    `);
        return rows;
    },

    async create({ asset_id, department_id, assigned_date }) {
        const [result] = await db.execute(
            'INSERT INTO asset_assignment (asset_id, department_id, assigned_date) VALUES (?, ?, ?)',
            [asset_id, department_id, assigned_date]
        );
        return result.insertId;
    },

    async delete(id) {
        const [result] = await db.execute(
            'DELETE FROM asset_assignment WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    },

    async getById(id) {
        const [rows] = await db.query(
            `SELECT id, asset_id, department_id, assigned_date FROM asset_assignment WHERE id = ?`,
            [id]
        );
        return rows[0];
    },

    async updateDate(id, assigned_date) {
        const [result] = await db.query(
            `UPDATE asset_assignment SET assigned_date = ? WHERE id = ?`,
            [assigned_date, id]
        );
        return result.affectedRows > 0;
    }
};

module.exports = Assignment;
