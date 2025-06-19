const express = require('express');
const router = express.Router();
const AssetController = require('../controllers/AssetController');
const DepartmentController = require('../controllers/DepartmentController');
const StatusController = require('../controllers/StatusController');
const AssetAssignmentController = require('../controllers/AsignmentController');
const AssetReportController = require('../controllers/AssetReportController');
const AuthController = require('../controllers/AuthController');

router.get('/assets', AssetController.getPaginated);
router.get('/assets/all', AssetController.list);
router.get('/assets/status-summary/:departmentId', AssetController.getStatusSummaryByDepartment);
router.get("/assets/by-department/:departmentId", AssetController.getByDepartment);
router.get('/assets/status', AssetController.getAllWithStatus);
router.post('/assets/create', AssetController.createAsset);
router.get('/assets/:id', AssetController.getAssetById);
router.put("/assets/:id", AssetController.updateAsset);
router.delete("/assets/:id", AssetController.deleteAsset);
router.put("/assets/:id/status", AssetController.updateStatus);

router.get("/departments", DepartmentController.getPaginated);
router.get("/departments/all", DepartmentController.getAll);
router.post('/departments/create', DepartmentController.create);
router.get('/departments/:id', DepartmentController.getById);
router.put('/departments/:id', DepartmentController.update);
router.delete("/departments/:id", DepartmentController.delete);

router.get("/statuses", StatusController.getAll);
router.post('/statuses/create', StatusController.create);
router.get('/statuses/:id', StatusController.getById);
router.put('/statuses/:id', StatusController.update);
router.delete("/statuses/:id", StatusController.deleteStatus);

// router.get('/assignments', AssetAssignmentController.getAll);
router.get("/assignments", AssetAssignmentController.getPaginated);
router.post('/assignments/create', AssetAssignmentController.create);
router.delete('/assignments/:id', AssetAssignmentController.delete);
router.get("/assignments/:id", AssetAssignmentController.getById);
router.put("/assignments/:id", AssetAssignmentController.updateDate);
router.delete("/assignments/:id", AssetAssignmentController.delete);

router.get("/reports", AssetReportController.getAll);
router.get("/reports/:id", AssetReportController.getById);
router.post("/reports", AssetReportController.create);
router.delete("/reports/:id", AssetReportController.delete);


router.post("/login", AuthController.login);

module.exports = router;
