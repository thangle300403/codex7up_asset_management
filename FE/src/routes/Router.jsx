import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AssetList from "../pages/asset/AssetList";
import AddAsset from "../pages/asset/AddAsset";
import EditAsset from "../pages/asset/EditAsset";
import StatusList from "../pages/status/StatusList";
import AddStatus from "../pages/status/AddStatus";
import EditStatus from "../pages/status/EditStatus";
import DepartmentList from "../pages/department/DepartmentList";
import AddDepartment from "../pages/department/AddDepartment";
import EditDepartment from "../pages/department/EditDepartment";
import AddAssignment from "../pages/asset_asignment/AddAssignment";
import AssignmentList from "../pages/asset_asignment/AssignmentList";
import EditAssignment from "../pages/asset_asignment/EditAssignment";
import Login from "../pages/login/Login";
import FillReport from "../component/FillReport";
import ReportList from "../pages/report/ReportList";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/assets" element={<AssetList />} />
      <Route path="/assets/add" element={<AddAsset />} />
      <Route path="/assets/edit/:id" element={<EditAsset />} />

      <Route path="/statuses" element={<StatusList />} />
      <Route path="/statuses/add" element={<AddStatus />} />
      <Route path="/statuses/edit/:id" element={<EditStatus />} />

      <Route path="/departments" element={<DepartmentList />} />
      <Route path="/departments/add" element={<AddDepartment />} />
      <Route path="/departments/edit/:id" element={<EditDepartment />} />

      <Route path="/assignments" element={<AssignmentList />} />
      <Route path="/assignments/add" element={<AddAssignment />} />
      <Route path="/assignments/edit/:id" element={<EditAssignment />} />
      <Route path="/login" element={<Login />} />

      <Route path="/report/fill" element={<FillReport />} />

      <Route path="/reports" element={<ReportList />} />
    </Routes>
  );
};

export default AppRoutes;
