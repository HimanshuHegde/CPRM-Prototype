import {  Routes, Route } from "react-router-dom";
import TokenDashboard from "./pages/TokenDashboard";
import AuthPage from "./pages/Auth";
import ProtectedRoute from "./pages/protectRoute";
import OperatorDashboard from "./pages/OperatorDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import DrugInventory from "./pages/DrugInventory";
import BloodBank from "./pages/BloodBank";
import Dashboard from "./pages/Dashboard";
import TokenOptions from "./pages/TokenOption";
import Alerts from "./pages/alerts";
import HandleAlerts from "./pages/handleAlerts";
import AlertOptions from "./pages/AlertOption";

function App() {
  return (  
  
      <Routes>
        <Route path="/alertOption" element={<ProtectedRoute allowedRoles={["admin","Token Screen","Token Operator","Doctor","Drug Inventory Operator","Blood Inventory Operator"]}><AlertOptions /></ProtectedRoute>} />
        <Route path = '/alertScreen' element={<ProtectedRoute allowedRoles={["admin","Token Screen","Token Operator","Doctor","Drug Inventory Operator","Blood Inventory Operator"]}><Alerts /></ProtectedRoute>} />
        <Route path = '/alertOperator' element={<ProtectedRoute allowedRoles={["admin","Token Screen","Token Operator","Doctor","Drug Inventory Operator","Blood Inventory Operator"]}><HandleAlerts /></ProtectedRoute>} />
        <Route path="/tokens" element={<ProtectedRoute allowedRoles={["admin","Token Screen","Token Operator","Doctor"]}><TokenOptions /></ProtectedRoute>} />
        <Route path ="/Dashboard" element={<ProtectedRoute allowedRoles={["admin","Token Screen","Token Operator","Doctor","Drug Inventory Operator","Blood Inventory Operator"]}><Dashboard /></ProtectedRoute>} />
          <Route path="/tokens/TokenOperator/:departmentSlug" element={
            <ProtectedRoute allowedRoles={["admin","Token Operator"]}>
            <OperatorDashboard />
            </ProtectedRoute>} />
          <Route path="/tokens/DoctorDashboard/:slug" element={
            <ProtectedRoute allowedRoles={["admin","Doctor"]}>
            <DoctorDashboard />
            </ProtectedRoute>} />
        <Route path="/tokens/screen/:slug" element={
          <ProtectedRoute allowedRoles={["admin","Token Screen"]}>
          <TokenDashboard />
          </ProtectedRoute>} />
            <Route path="/drugInventory" element={<ProtectedRoute allowedRoles={["admin","Drug Inventory Operator","Doctor"]}><DrugInventory /></ProtectedRoute>} />
            <Route path="/blood_inventory" element={<ProtectedRoute allowedRoles={["admin","Blood Inventory Operator","Doctor"]}><BloodBank /></ProtectedRoute>} />
          
        <Route path="/" element={<AuthPage />} />
      </Routes>
    
  );
}

export default App;
