const db = require("../db");

const AssetModel = {
    // ✅ Get all assets
    async getAllAssets() {
        const [rows] = await db.query(`
      SELECT 
        a.id,
        a.name,
        a.description,
        d.name AS department,
        s.status_name AS currentStatus
      FROM assets a
      LEFT JOIN asset_assignment aa ON aa.asset_id = a.id
      LEFT JOIN department d ON d.id = aa.department_id
      LEFT JOIN asset_status s ON s.id = a.status_id
      ORDER BY a.id;
    `);
        return rows;
    },

    async sortAssets(statusName) {
        const [rows] = await db.query(
            `
      SELECT 
        a.id,
        a.name,
        a.description,
        d.name AS department,
        s.status_name AS currentStatus
      FROM assets a
      LEFT JOIN asset_assignment aa ON aa.asset_id = a.id
      LEFT JOIN department d ON d.id = aa.department_id
      LEFT JOIN asset_status s ON s.id = a.status_id
      WHERE s.status_name = ?
      ORDER BY a.id;
    `,
            [statusName]
        );
        return rows;
    },

    // ✅ Add new asset with assignment
    async addAssetWithAssignment(data) {
        const { name, description, status_id, department_id, assigned_date } = data;

        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();

            // 1. Insert into assets
            const [assetResult] = await conn.query(
                "INSERT INTO assets (name, description, status_id) VALUES (?, ?, ?)",
                [name, description, status_id]
            );
            const asset_id = assetResult.insertId;

            // 2. Insert into asset_assignment
            await conn.query(
                "INSERT INTO asset_assignment (asset_id, department_id, assigned_date) VALUES (?, ?, ?)",
                [asset_id, department_id, assigned_date]
            );

            await conn.commit();
            return asset_id;
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    },

    // ✅ Get a single asset by ID
    async getAssetById(id) {
        const [rows] = await db.execute(
            `
      SELECT 
        a.id,
        a.name,
        a.description,
        d.id AS department_id,
        d.name AS department,
        s.id AS status_id,
        s.status_name AS currentStatus
      FROM assets a
      LEFT JOIN asset_assignment aa ON a.id = aa.asset_id
      LEFT JOIN department d ON aa.department_id = d.id
      LEFT JOIN asset_status s ON a.status_id = s.id
      WHERE a.id = ?
      `,
            [id]
        );

        return rows[0];
    },

    // ✅ Update asset and assignment
    async updateAsset(id, data) {
        const { name, description, department_id, status_id } = data;

        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();

            // 1. Update assets
            await conn.query(
                "UPDATE assets SET name = ?, description = ?, status_id = ? WHERE id = ?",
                [name, description, status_id, id]
            );

            // 2. Update asset_assignment
            await conn.query(
                "UPDATE asset_assignment SET department_id = ? WHERE asset_id = ?",
                [department_id, id]
            );

            await conn.commit();
            return true;
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    },

    async deleteAsset(id) {
        // Check if asset is assigned to a department
        const [assignments] = await db.query(
            "SELECT * FROM asset_assignment WHERE asset_id = ?",
            [id]
        );
        if (assignments.length > 0) {
            throw new Error("Asset is assigned to a department and cannot be deleted.");
        }

        const [result] = await db.query("DELETE FROM assets WHERE id = ?", [id]);
        return result.affectedRows > 0;
    },

    async getPaginated(page = 1, limit = 10) {
        const offset = (page - 1) * limit;

        const [countRows] = await db.query(`SELECT COUNT(*) as total FROM assets`);
        const total = countRows[0].total;

        const [rows] = await db.query(`
  SELECT 
    a.id,
    a.name,
    a.description,
    d.name AS department,
    s.status_name AS currentStatus
  FROM assets a
  LEFT JOIN asset_status s ON a.status_id = s.id
  LEFT JOIN (
    SELECT aa.asset_id, aa.department_id
    FROM asset_assignment aa
    INNER JOIN (
      SELECT asset_id, MAX(assigned_date) AS latest_date
      FROM asset_assignment
      GROUP BY asset_id
    ) latest ON latest.asset_id = aa.asset_id AND latest.latest_date = aa.assigned_date
  ) latest_assignment ON a.id = latest_assignment.asset_id
  LEFT JOIN department d ON latest_assignment.department_id = d.id
  ORDER BY a.id ASC
  LIMIT ? OFFSET ?
`, [limit, offset]);

        return {
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            items: rows
        };
    },

    async getByDepartment(departmentId) {
        const [rows] = await db.execute(`
      SELECT 
        a.id, 
        a.name, 
        a.description, 
        s.status_name AS status
      FROM assets a
      JOIN asset_assignment aa ON a.id = aa.asset_id
      LEFT JOIN asset_status s ON a.status_id = s.id
      WHERE aa.department_id = ?
      GROUP BY a.id
      ORDER BY a.id DESC
    `, [departmentId]);

        return rows;
    },
};

module.exports = AssetModel;
