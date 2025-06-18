const AssetAssignment = require('../models/Assignment');

const AssetAssignmentController = {
    async getAll(req, res) {
        try {
            const data = await AssetAssignment.getAll();
            res.json(data);
        } catch (err) {
            res.status(500).json({ message: "Error loading assignments" });
        }
    },

    async create(req, res) {
        try {
            console.log("🔥 Incoming assignment data:", req.body);
            const { asset_id, department_id, assigned_date } = req.body;
            if (!asset_id || !department_id || !assigned_date) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const id = await AssetAssignment.create({ asset_id, department_id, assigned_date });
            res.status(201).json({ id });
        } catch (err) {
            res.status(500).json({ message: "Error creating assignment" });
        }
    },

    async delete(req, res) {
        try {
            const success = await AssetAssignment.delete(req.params.id);
            if (!success) return res.status(404).json({ message: "Assignment not found" });
            res.json({ message: "Assignment deleted" });
        } catch (err) {
            res.status(500).json({ message: "Error deleting assignment" });
        }
    },

    async getById(req, res) {
        try {
            const assignment = await AssetAssignment.getById(req.params.id);
            if (!assignment) {
                return res.status(404).json({ message: "Assignment not found" });
            }
            res.json(assignment);
        } catch (err) {
            console.error("Error fetching assignment:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    async updateDate(req, res) {
        try {
            const { assigned_date } = req.body;
            if (!assigned_date) {
                return res.status(400).json({ message: "Assigned date is required" });
            }

            const updated = await AssetAssignment.updateDate(req.params.id, assigned_date);
            if (!updated) {
                return res.status(404).json({ message: "Assignment not found or not updated" });
            }

            res.json({ message: "Assignment date updated successfully" });
        } catch (err) {
            console.error("Error updating assignment:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    },
};

module.exports = AssetAssignmentController;
