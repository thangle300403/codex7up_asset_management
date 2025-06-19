const AssetReportModel = require("../models/AssetReport");

const AssetReportController = {
    async create(req, res) {
        try {
            const newReportId = await AssetReportModel.create(req.body);
            res.json({ message: "✅ Report created successfully", id: newReportId });
        } catch (error) {
            console.error("Error creating report:", error.message);
            res.status(500).json({ message: "❌ Failed to create report" });
        }
    },

    async getAll(req, res) {
        try {
            const reports = await AssetReportModel.getAll();
            res.json(reports);
        } catch (error) {
            console.error("Error fetching reports:", error.message);
            res.status(500).json({ message: "❌ Failed to load reports" });
        }
    },

    async getById(req, res) {
        try {
            const report = await AssetReportModel.getById(req.params.id);
            if (!report) {
                return res.status(404).json({ message: "Report not found" });
            }
            res.json(report);
        } catch (error) {
            console.error("Error fetching report:", error.message);
            res.status(500).json({ message: "❌ Failed to load report" });
        }
    },

    async delete(req, res) {
        try {
            const deleted = await AssetReportModel.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: "Report not found or already deleted" });
            }
            res.json({ message: "✅ Report deleted successfully" });
        } catch (error) {
            console.error("Error deleting report:", error.message);
            res.status(500).json({ message: "❌ Failed to delete report" });
        }
    }
};

module.exports = AssetReportController;
