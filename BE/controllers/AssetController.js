const AssetModel = require('../models/Asset');

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
            console.log("🔥 Received body from frontend:", req.body);
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
    }
};

module.exports = AssetController;
