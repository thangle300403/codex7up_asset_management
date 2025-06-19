const db = require('../db');

const AssetReportModel = {
    async create({
        year,
        department_id,
        created_by,
        total_assets,
        notes,
    }) {
        const [result] = await db.execute(
            `INSERT INTO asset_reports 
     (year, department_id, created_by, total_assets, notes, created_at)
     VALUES (?, ?, ?, ?, ?, NOW())`,
            [
                year,
                department_id,
                created_by,
                total_assets,
                notes,
            ]
        );

        return result.insertId;
    },

    async getAll() {
        const [rows] = await db.execute(`
    SELECT * FROM asset_reports
  `);
        return rows;
    },

    async getById(id) {
        const [rows] = await db.execute(`
      SELECT 
        ar.*, 
        d.name AS department_name, 
        e.name AS employee_name
      FROM asset_reports ar
      LEFT JOIN department d ON ar.department_id = d.id
      LEFT JOIN employee e ON ar.created_by = e.id
      WHERE ar.id = ?
    `, [id]);

        return rows[0];
    },

    async delete(id) {
        const [result] = await db.execute(
            'DELETE FROM asset_reports WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    },

    async existsForYear(department_id, year) {
        const [rows] = await db.execute(
            'SELECT COUNT(*) AS count FROM asset_reports WHERE department_id = ? AND year = ?',
            [department_id, year]
        );
        return rows[0].count > 0;
    }
};

module.exports = AssetReportModel;
