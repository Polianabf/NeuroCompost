import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Save,
  Building,
  Mail,
  Phone
} from 'lucide-react';

export function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    browser: true,
    collections: true,
    reports: true
  });

  const [profile, setProfile] = useState({
    name: 'João Silva',
    email: 'joao.silva@mineracaoalpha.com.br',
    phone: '(31) 99999-8888',
    company: 'Mineração Alpha Ltda.',
    position: 'Gerente de Sustentabilidade'
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white mb-2">
          Configurações
        </h1>
        <p className="text-gray-400">
          Gerencie suas preferências e configurações da conta
        </p>
      </div>

      {/* Profile Settings */}
      <Card className="bg-gray-800 border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <User className="h-5 w-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">Perfil do Usuário</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name" className="text-gray-300">Nome Completo</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({...profile, name: e.target.value})}
              className="bg-gray-700 border-gray-600 text-white mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              className="bg-gray-700 border-gray-600 text-white mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-gray-300">Telefone</Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={(e) => setProfile({...profile, phone: e.target.value})}
              className="bg-gray-700 border-gray-600 text-white mt-1"
            />
          </div>
          <div>
            <Label htmlFor="position" className="text-gray-300">Cargo</Label>
            <Input
              id="position"
              value={profile.position}
              onChange={(e) => setProfile({...profile, position: e.target.value})}
              className="bg-gray-700 border-gray-600 text-white mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="company" className="text-gray-300">Empresa</Label>
            <Input
              id="company"
              value={profile.company}
              onChange={(e) => setProfile({...profile, company: e.target.value})}
              className="bg-gray-700 border-gray-600 text-white mt-1"
            />
          </div>
        </div>

        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white mt-6">
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-gray-800 border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="h-5 w-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">Notificações</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Notificações por Email</p>
              <p className="text-gray-400 text-sm">Receba updates por email</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Notificações SMS</p>
              <p className="text-gray-400 text-sm">Receba alerts importantes por SMS</p>
            </div>
            <Switch
              checked={notifications.sms}
              onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Notificações do Navegador</p>
              <p className="text-gray-400 text-sm">Receba notificações push</p>
            </div>
            <Switch
              checked={notifications.browser}
              onCheckedChange={(checked) => setNotifications({...notifications, browser: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Updates de Coletas</p>
              <p className="text-gray-400 text-sm">Notificações sobre status das coletas</p>
            </div>
            <Switch
              checked={notifications.collections}
              onCheckedChange={(checked) => setNotifications({...notifications, collections: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Relatórios Mensais</p>
              <p className="text-gray-400 text-sm">Receba relatórios automaticamente</p>
            </div>
            <Switch
              checked={notifications.reports}
              onCheckedChange={(checked) => setNotifications({...notifications, reports: checked})}
            />
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="bg-gray-800 border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="h-5 w-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">Segurança</h3>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            Alterar Senha
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            Configurar Autenticação em Duas Etapas
          </Button>
        </div>
      </Card>
    </div>
  );
}