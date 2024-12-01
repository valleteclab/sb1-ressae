import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import DemandList from './pages/processes/DemandList';
import DemandCreate from './pages/processes/DemandCreate';
import DemandApprovals from './pages/processes/DemandApprovals';
import UserList from './pages/users/UserList';
import UserCreate from './pages/users/UserCreate';
import OrganizationCreate from './pages/organization/OrganizationCreate';
import PositionCreate from './pages/positions/PositionCreate';
import DepartmentList from './pages/departments/DepartmentList';
import DepartmentCreate from './pages/departments/DepartmentCreate';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/processes" element={<DemandList />} />
          <Route path="/processes/demand/new" element={<DemandCreate />} />
          <Route path="/processes/approvals" element={<DemandApprovals />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/new" element={<UserCreate />} />
          <Route path="/organization/new" element={<OrganizationCreate />} />
          <Route path="/positions/new" element={<PositionCreate />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/departments/new" element={<DepartmentCreate />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;