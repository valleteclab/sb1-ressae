import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Home, 
  FileText, 
  Users, 
  Bell, 
  Settings, 
  LogOut, 
  Building2, 
  Briefcase,
  ChevronDown,
  ChevronRight,
  Plus,
  CheckSquare
} from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  const [isProcessesOpen, setIsProcessesOpen] = useState(true);

  const isActive = (path: string) => {
    return location.pathname.startsWith(path) ? 'bg-gray-100' : '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">SisLicitação</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={`flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100 ${isActive('/')}`}
              >
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </li>

            {/* Processos Menu */}
            <li>
              <button
                onClick={() => setIsProcessesOpen(!isProcessesOpen)}
                className={`flex items-center justify-between w-full text-gray-700 p-2 rounded-lg hover:bg-gray-100 ${isActive('/processes')}`}
              >
                <div className="flex items-center space-x-3">
                  <FileText size={20} />
                  <span>Processos</span>
                </div>
                {isProcessesOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {/* Processos Submenus */}
              {isProcessesOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  <li>
                    <Link
                      to="/processes"
                      className={`flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100 ${isActive('/processes')}`}
                    >
                      <FileText size={18} />
                      <span>Lista de Demandas</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/processes/demand/new"
                      className={`flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100 ${isActive('/processes/demand/new')}`}
                    >
                      <Plus size={18} />
                      <span>Nova Demanda</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/processes/approvals"
                      className={`flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100 ${isActive('/processes/approvals')}`}
                    >
                      <CheckSquare size={18} />
                      <span>Aprovações</span>
                      <span className="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        2
                      </span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Cadastros Menu */}
            <li>
              <button
                onClick={() => setIsRegistrationOpen(!isRegistrationOpen)}
                className="flex items-center justify-between w-full text-gray-700 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <Menu size={20} />
                  <span>Cadastros</span>
                </div>
                {isRegistrationOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {/* Cadastros Submenus */}
              {isRegistrationOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  <li>
                    <Link
                      to="/users"
                      className={`flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100 ${isActive('/users')}`}
                    >
                      <Users size={18} />
                      <span>Usuários</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/organization/new"
                      className={`flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100 ${isActive('/organization')}`}
                    >
                      <Building2 size={18} />
                      <span>Órgão</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/departments"
                      className={`flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100 ${isActive('/departments')}`}
                    >
                      <Building2 size={18} />
                      <span>Departamentos</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/positions/new"
                      className={`flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100 ${isActive('/positions')}`}
                    >
                      <Briefcase size={18} />
                      <span>Cargos</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                to="/settings"
                className={`flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100 ${isActive('/settings')}`}
              >
                <Settings size={20} />
                <span>Configurações</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell size={24} />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => navigate('/login')} 
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <LogOut size={24} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;