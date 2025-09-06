import React, { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  Bell, 
  Menu,
  ChevronDown,
  Settings,
  User,
  LogOut
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface ClientData {
  companyName: string;
  userAvatar: string;
  userName: string;
  userRole: string;
}

interface TopBarProps {
  clientData: ClientData;
  onToggleSidebar: () => void;
}

export function TopBar({ clientData, onToggleSidebar }: TopBarProps) {
  const [notifications] = useState([
    { id: 1, message: 'Nova coleta agendada para amanhã', type: 'info', time: '5min' },
    { id: 2, message: 'Relatório mensal disponível', type: 'success', time: '1h' },
    { id: 3, message: 'Ponto de coleta indisponível', type: 'warning', time: '2h' },
  ]);

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 px-6 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center space-x-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="text-gray-400 hover:text-white hover:bg-gray-800 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div>
          <h2 className="text-white text-lg font-medium">{clientData.companyName}</h2>
          <p className="text-gray-400 text-sm">Dashboard de Gestão de Resíduos</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative text-gray-400 hover:text-white hover:bg-gray-800">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1 min-w-5 h-5 rounded-full">
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-gray-800 border-gray-700">
            <DropdownMenuLabel className="text-white">Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex items-start space-x-3 p-3 text-gray-300 hover:bg-gray-700">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  notification.type === 'info' ? 'bg-blue-500' :
                  notification.type === 'success' ? 'bg-emerald-500' :
                  'bg-orange-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time} atrás</p>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="text-center text-emerald-400 hover:bg-gray-700">
              Ver todas as notificações
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 p-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-emerald-600 text-white text-sm">
                  {clientData.userAvatar}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{clientData.userName}</p>
                <p className="text-xs text-gray-400">{clientData.userRole}</p>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700">
            <DropdownMenuLabel className="text-white">
              <div>
                <p className="font-medium">{clientData.userName}</p>
                <p className="text-sm text-gray-400">{clientData.userRole}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="text-red-400 hover:bg-gray-700">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}