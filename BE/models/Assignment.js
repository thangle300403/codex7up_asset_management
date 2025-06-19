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
    },

    async getPaginated(page = 1, limit = 10) {
        const offset = (page - 1) * limit;

        const [countRows] = await db.query(`
    SELECT COUNT(*) AS total FROM asset_assignment
  `);
        const total = countRows[0].total;

        const [dataRows] = await db.query(`
    SELECT 
      aa.id,
      a.name AS asset,
      d.name AS department,
      aa.assigned_date
    FROM asset_assignment aa
    JOIN assets a ON a.id = aa.asset_id
    JOIN department d ON d.id = aa.department_id
    ORDER BY aa.assigned_date ASC
    LIMIT ? OFFSET ?
  `, [limit, offset]);

        return {
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            items: dataRows
        };
    },
};

module.exports = Assignment;
