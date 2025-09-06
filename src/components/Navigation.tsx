import React from 'react';
import { Button } from './ui/button';
import { Recycle, Search, BarChart3, Info, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

type Page = 'home' | 'search' | 'stats' | 'about';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'home' as const, label: 'Início', icon: Recycle },
    { id: 'search' as const, label: 'Buscar Pontos', icon: Search },
    { id: 'stats' as const, label: 'Estatísticas', icon: BarChart3 },
    { id: 'about' as const, label: 'Sobre', icon: Info },
  ];

  const NavItem = ({ item, mobile = false }: { item: typeof navItems[0], mobile?: boolean }) => {
    const Icon = item.icon;
    const isActive = currentPage === item.id;
    
    return (
      <Button
        variant={isActive ? "default" : "ghost"}
        onClick={() => onNavigate(item.id)}
        className={`${mobile ? 'w-full justify-start' : ''} ${
          isActive 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
        }`}
      >
        <Icon className="h-4 w-4 mr-2" />
        {item.label}
      </Button>
    );
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg">
              <Recycle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">MineRecycle</h1>
              <p className="text-xs text-gray-500">Economia Circular na Mineração</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-2 pb-4 border-b">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg">
                      <Recycle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-semibold">MineRecycle</h2>
                      <p className="text-xs text-gray-500">Menu</p>
                    </div>
                  </div>
                  {navItems.map((item) => (
                    <NavItem key={item.id} item={item} mobile />
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}