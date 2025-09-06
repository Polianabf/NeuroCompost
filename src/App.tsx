import React, { useState } from 'react';
import { MainDashboard } from './components/MainDashboard';
import { SearchPointsPage } from './components/SearchPointsPage';
import { MyOrdersPage } from './components/MyOrdersPage';
import { ReportsPage } from './components/ReportsPage';
import { SettingsPage } from './components/SettingsPage';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';

type Page = 'dashboard' | 'search' | 'orders' | 'reports' | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock client data
  const clientData = {
    companyName: 'Mineração Alpha Ltda.',
    userAvatar: 'MA',
    userName: 'João Silva',
    userRole: 'Gerente de Sustentabilidade'
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <MainDashboard clientData={clientData} />;
      case 'search':
        return <SearchPointsPage />;
      case 'orders':
        return <MyOrdersPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <MainDashboard clientData={clientData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        {/* Top Bar */}
        <TopBar 
          clientData={clientData}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        {/* Page Content */}
        <main className="p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}