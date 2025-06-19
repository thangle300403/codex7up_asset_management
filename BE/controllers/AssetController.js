const AssetModel = require('../models/Asset');
const db = require('../db');

const AssetController = {
    async list(req, res) {
        try {
            const assets = await AssetModel.getAllAssets();
            res.json(assets);
        } catch (error) {
            console.error('Error in AssetController:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async createAsset(req, res) {
        try {
            const asset_id = await AssetModel.addAssetWithAssignment(req.body); // ✅ req.body
            res.json({ message: 'Asset created successfully!', asset_id });
        } catch (err) {
            console.error('Asset creation failed:', err);
            res.status(500).json({ message: 'Asset creation failed', error: err.message });
        }
    },

    async getAssetById(req, res) {
        try {
            const id = req.params.id;
            const asset = await AssetModel.getAssetById(id);

            if (!asset) {
                return res.status(404).json({ message: 'Asset not found' });
            }

            res.json(asset);
        } catch (err) {
            console.error('Error fetching asset:', err);
            res.status(500).json({ message: 'Error fetching asset', error: err.message });
        }
    },

    async updateAsset(req, res) {
        try {
            await AssetModel.updateAsset(req.params.id, req.body);
            res.json({ message: "Asset updated successfully" });
        } catch (err) {
            console.error("Error updating asset:", err.message);
            res.status(500).json({ message: "Update failed", error: err.message });
        }
    },

    async deleteAsset(req, res) {
        try {
            const success = await AssetModel.deleteAsset(req.params.id);
            if (!success) {
                return res.status(404).json({ message: "Asset not found" });
            }
            res.json({ message: "Asset deleted successfully" });
        } catch (err) {
            console.error("Delete error:", err.message);
            res.status(400).json({ message: err.message });
        }
    },

    async getPaginated(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const data = await AssetModel.getPaginated(page, limit);
            res.json(data);
        } catch (err) {
            console.error("Error fetching paginated assignments:", err);
            res.status(500).json({ message: "Error loading paginated assignments" });
        }
    },

    async getAllWithStatus(req, res) {
        try {
            const [rows] = await db.execute(`
      SELECT a.id, a.name, a.description, s.status_name AS status
      FROM assets a
      LEFT JOIN asset_status s ON a.status_id = s.id
    `);
            res.json(rows);
        } catch (err) {
            console.error("Error fetching assets:", err);
            res.status(500).json({ message: "Failed to fetch asset list." });
        }
    },

    async getByDepartment(req, res) {
        const { departmentId } = req.params;

        if (!departmentId) {
            return res.status(400).json({ message: "Department ID is required." });
        }

        try {
            const assets = await AssetModel.getByDepartment(departmentId);
            res.json(assets);
        } catch (err) {
            console.error("Error fetching assets by department:", err);
            res.status(500).json({ message: "Failed to fetch assets." });
        }
    },


    async getStatusSummaryByDepartment(req, res) {
        const { departmentId } = req.params;

        const [rows] = await db.execute(`
    SELECT s.status_name, COUNT(*) as count
    FROM asset_assignment aa
    JOIN assets a ON aa.asset_id = a.id
    LEFT JOIN asset_status s ON a.status_id = s.id
    WHERE aa.department_id = ?
    GROUP BY s.status_name
  `, [departmentId]);

        res.json(rows); // [{ status_name: 'In Use', count: 5 }, ...]
    },

    async updateStatus(req, res) {
        const { id } = req.params;
        const { status_id } = req.body;

        try {
            await db.execute("UPDATE assets SET status_id = ? WHERE id = ?", [status_id, id]);
            res.json({ message: "✅ Status updated" });
        } catch (err) {
            res.status(500).json({ message: "❌ Failed to update", error: err.message });
        }
    }
};

module.exports = AssetController;
