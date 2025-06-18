const DepartmentModel = require("../models/Department");

const DepartmentController = {
    async getAll(req, res) {
        try {
            const departments = await DepartmentModel.getAll();
            res.json(departments);
        } catch (error) {
            console.error("Error fetching departments:", error.message);
            res.status(500).json({ message: "Failed to load departments" });
        }
    },

    async create(req, res) {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ message: "Missing department name" });
            }

            const id = await DepartmentModel.create(name);
            res.status(201).json({ id, name });
        } catch (error) {
            console.error("Error creating department:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const department = await DepartmentModel.getById(id);
            if (!department) {
                return res.status(404).json({ message: "Department not found" });
            }

            res.json(department);
        } catch (error) {
            console.error("Error fetching department:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ message: "Missing department name" });
            }

            const updated = await DepartmentModel.update(id, name);
            if (updated === 0) {
                return res
                    .status(404)
                    .json({ message: "Department not found or unchanged" });
            }

            res.json({ message: "Department updated successfully" });
        } catch (error) {
            console.error("Error updating department:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    async delete(req, res) {
        try {
            const success = await DepartmentModel.delete(req.params.id);
            if (!success) {
                return res.status(404).json({ message: "Department not found" });
            }
            res.json({ message: "Department deleted successfully" });
        } catch (err) {
            console.error("Delete error:", err.message);
            res.status(400).json({ message: err.message });
        }
    },
};

module.exports = DepartmentController;
