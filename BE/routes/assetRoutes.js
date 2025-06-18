const express = require('express');
const router = express.Router();
const AssetController = require('../controllers/AssetController');
const DepartmentController = require('../controllers/DepartmentController');
const StatusController = require('../controllers/StatusController');
const AssetAssignmentController = require('../controllers/AsignmentController');

router.get('/assets', AssetController.list);
router.post('/assets/create', AssetController.createAsset);
router.get('/assets/:id', AssetController.getAssetById);
router.put("/assets/:id", AssetController.updateAsset);
router.delete("/assets/:id", AssetController.deleteAsset);

router.get("/departments", DepartmentController.getAll);
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
module.exports = router;
