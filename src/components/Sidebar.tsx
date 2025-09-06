import React from 'react';
import { Button } from './ui/button';
import { 
  LayoutGrid, 
  Search, 
  Package, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronLeft,
  Brain
} from 'lucide-react';

type Page = 'dashboard' | 'search' | 'orders' | 'reports' | 'settings';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const navigation = [
  { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutGrid },
  { id: 'search' as const, label: 'Buscar Pontos', icon: Search },
  { id: 'orders' as const, label: 'Meus Pedidos', icon: Package },
  { id: 'reports' as const, label: 'Relatórios', icon: BarChart3 },
  { id: 'settings' as const, label: 'Configurações', icon: Settings },
];

export function Sidebar({ currentPage, onNavigate, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <div className={`fixed left-0 top-0 h-full bg-gray-900 border-r border-gray-800 transition-all duration-300 z-50 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-xl text-white font-semibold">NeuroCompost</h1>
                <p className="text-xs text-gray-400">AI-Powered Recycling</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onNavigate(item.id)}
              className={`w-full justify-start h-12 transition-all duration-200 ${
                collapsed ? 'px-3' : 'px-4'
              } ${
                isActive
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <Button
          variant="ghost"
          className={`w-full justify-start h-12 text-gray-300 hover:text-white hover:bg-gray-800 ${
            collapsed ? 'px-3' : 'px-4'
          }`}
        >
          <LogOut className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
          {!collapsed && <span>Sair</span>}
        </Button>
      </div>

      {/* Collapse button when collapsed */}
      {collapsed && (
        <div className="absolute top-6 -right-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full p-1"
          >
            <ChevronLeft className="h-4 w-4 rotate-180" />
          </Button>
        </div>
      )}
    </div>
  );
}