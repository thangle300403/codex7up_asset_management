const StatusModel = require("../models/Status");

const StatusController = {
    async getAll(req, res) {
        try {
            const statuses = await StatusModel.getAll();
            res.json(statuses);
        } catch (error) {
            console.error("Error fetching statuses:", error.message);
            res.status(500).json({ message: "Failed to load statuses" });
        }
    },

    async create(req, res) {
        try {
            const { status_name } = req.body;
            if (!status_name) {
                return res.status(400).json({ message: "Missing status_name" });
            }

            const id = await StatusModel.create(status_name);
            res.status(201).json({ id, status_name });
        } catch (error) {
            console.error("Error creating status:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const status = await StatusModel.getById(id);
            if (!status) return res.status(404).json({ message: "Status not found" });

            res.json(status);
        } catch (error) {
            console.error("Error fetching status:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { status_name } = req.body;

            if (!status_name) return res.status(400).json({ message: "Missing status_name" });

            const updated = await StatusModel.update(id, status_name);
            if (updated === 0) return res.status(404).json({ message: "Status not found or unchanged" });

            res.json({ message: "Status updated successfully" });
        } catch (error) {
            console.error("Error updating status:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    async deleteStatus(req, res) {
        try {
            const success = await StatusModel.deleteStatus(req.params.id);
            if (!success) {
                return res.status(404).json({ message: "Status not found" });
            }
            res.json({ message: "Status deleted successfully" });
        } catch (err) {
            console.error("Delete error:", err.message);
            res.status(400).json({ message: err.message });
        }
    },

    async getPaginated(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const data = await StatusModel.getPaginated(page, limit);
            res.json(data);
        } catch (err) {
            console.error("Error fetching paginated assignments:", err);
            res.status(500).json({ message: "Error loading paginated assignments" });
        }
    },
};

module.exports = StatusController;
