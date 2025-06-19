const db = require('../db');

const DepartmentModel = {
    async getAll() {
        const [rows] = await db.execute("SELECT id, name FROM department");
        return rows;
    },

    async create(name) {
        const [result] = await db.execute(
            'INSERT INTO department (name) VALUES (?)',
            [name]
        );
        return result.insertId;
    },

    async getById(id) {
        const [rows] = await db.execute('SELECT * FROM department WHERE id = ?', [id]);
        return rows[0];
    },

    async update(id, name) {
        const [result] = await db.execute(
            'UPDATE department SET name = ? WHERE id = ?',
            [name, id]
        );
        return result.affectedRows;
    },

    async delete(id) {
        // Check if any assets are assigned to this department
        const [assignments] = await db.query(
            "SELECT * FROM asset_assignment WHERE department_id = ?",
            [id]
        );
        if (assignments.length > 0) {
            throw new Error("Department is assigned to assets and cannot be deleted.");
        }

        const [result] = await db.query("DELETE FROM department WHERE id = ?", [id]);
        return result.affectedRows > 0;
    },

    async getPaginated(page = 1, limit = 10) {
        const offset = (page - 1) * limit;

        const [countRows] = await db.query(`SELECT COUNT(*) AS total FROM department`);
        const total = countRows[0].total;

        const [rows] = await db.query(`
      SELECT id, name
      FROM department
      ORDER BY id ASC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

        return {
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            items: rows
        };
    }
};

module.exports = DepartmentModel;
