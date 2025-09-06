import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import {
  Recycle,
  DollarSign,
  Leaf,
  TrendingUp,
  Package,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';

interface ClientData {
  companyName: string;
  userAvatar: string;
  userName: string;
  userRole: string;
}

interface MainDashboardProps {
  clientData: ClientData;
}

export function MainDashboard({ clientData }: MainDashboardProps) {
  const [selectedChart, setSelectedChart] = useState<string | null>(null);

  // Mock data específica do cliente
  const clientMetrics = [
    {
      title: 'Total Reciclado',
      value: '2,847',
      unit: 'toneladas',
      change: '+18.2%',
      changeType: 'positive',
      icon: Recycle,
      period: 'este mês'
    },
    {
      title: 'Economia Gerada',
      value: 'R$ 524K',
      unit: 'em receita',
      change: '+24.7%',
      changeType: 'positive',
      icon: DollarSign,
      period: 'este mês'
    },
    {
      title: 'CO₂ Evitado',
      value: '1,238',
      unit: 'ton CO₂',
      change: '+31.5%',
      changeType: 'positive',
      icon: Leaf,
      period: 'este mês'
    },
    {
      title: 'Coletas Realizadas',
      value: '47',
      unit: 'coletas',
      change: '-5.2%',
      changeType: 'negative',
      icon: Package,
      period: 'este mês'
    }
  ];

  const wasteByTypeData = [
    { type: 'Plásticos Industriais', volume: 1250, color: '#10B981' },
    { type: 'Pneus Mineração', volume: 890, color: '#F59E0B' },
    { type: 'Equipamentos', volume: 650, color: '#3B82F6' },
    { type: 'Borrachas', volume: 520, color: '#8B5CF6' },
    { type: 'Cabos', volume: 380, color: '#EF4444' }
  ];

  const monthlyTrendsData = [
    { month: 'Jan', reciclado: 2150, economia: 450000 },
    { month: 'Fev', reciclado: 2380, economia: 520000 },
    { month: 'Mar', reciclado: 2690, economia: 580000 },
    { month: 'Abr', reciclado: 2950, economia: 640000 },
    { month: 'Mai', reciclado: 3250, economia: 720000 },
    { month: 'Jun', reciclado: 2847, economia: 524000 }
  ];

  const wasteCompositionData = [
    { name: 'Plásticos', value: 35, color: '#10B981' },
    { name: 'Pneus', value: 28, color: '#F59E0B' },
    { name: 'Equipamentos', value: 20, color: '#3B82F6' },
    { name: 'Borrachas', value: 12, color: '#8B5CF6' },
    { name: 'Outros', value: 5, color: '#6B7280' }
  ];

  const recentCollections = [
    {
      id: 'COL-2024-1847',
      date: '2024-01-08',
      type: 'Plásticos Industriais',
      quantity: '12.5 ton',
      status: 'concluida',
      location: 'Setor A - Mina Principal',
      value: 'R$ 42.500'
    },
    {
      id: 'COL-2024-1848',
      date: '2024-01-09',
      type: 'Pneus de Mineração',
      quantity: '8.2 ton',
      status: 'agendada',
      location: 'Pátio de Máquinas',
      value: 'R$ 34.500'
    },
    {
      id: 'COL-2024-1849',
      date: '2024-01-10',
      type: 'Equipamentos Obsoletos',
      quantity: '15.8 ton',
      status: 'em_andamento',
      location: 'Oficina Central',
      value: 'R$ 67.200'
    },
    {
      id: 'COL-2024-1850',
      date: '2024-01-12',
      type: 'Correias Transportadoras',
      quantity: '22.1 ton',
      status: 'agendada',
      location: 'Linha de Produção 3',
      value: 'R$ 89.400'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'concluida':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'em_andamento':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'agendada':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'concluida':
        return 'Concluída';
      case 'em_andamento':
        return 'Em Andamento';
      case 'agendada':
        return 'Agendada';
      default:
        return status;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'concluida':
        return 'bg-emerald-900 text-emerald-300 border-emerald-700';
      case 'em_andamento':
        return 'bg-orange-900 text-orange-300 border-orange-700';
      case 'agendada':
        return 'bg-blue-900 text-blue-300 border-blue-700';
      default:
        return 'bg-gray-900 text-gray-300 border-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-xl p-6 border border-emerald-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">
              Bem-vindo, {clientData.userName}
            </h1>
            <p className="text-emerald-200">
              Dashboard de sustentabilidade da {clientData.companyName}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-emerald-800 rounded-lg p-4 border border-emerald-600">
              <div className="flex items-center space-x-2 text-emerald-200">
                <Target className="h-5 w-5" />
                <span className="text-sm">Meta Janeiro: 89% concluída</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {clientMetrics.map((metric, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700 p-6 hover:bg-gray-750 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-900 p-3 rounded-lg">
                <metric.icon className="h-6 w-6 text-emerald-400" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                metric.changeType === 'positive' ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {metric.changeType === 'positive' ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                <span>{metric.change}</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-white">{metric.value}</p>
              <p className="text-gray-400 text-sm">{metric.unit}</p>
              <p className="text-gray-500 text-xs">{metric.period}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Volume by Type */}
        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Volume por Tipo de Resíduo
              </h3>
              <p className="text-gray-400 text-sm">Últimos 30 dias (toneladas)</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedChart(selectedChart === 'volume' ? null : 'volume')}
              className="text-gray-400 hover:text-white"
            >
              <TrendingUp className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wasteByTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="type" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={12}
                  stroke="#9CA3AF"
                />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                  formatter={(value) => [`${value} ton`, 'Volume']}
                />
                <Bar dataKey="volume" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Waste Composition */}
        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Composição dos Resíduos
              </h3>
              <p className="text-gray-400 text-sm">Distribuição percentual</p>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteCompositionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                  fontSize={12}
                  fill="#8884d8"
                >
                  {wasteCompositionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                  formatter={(value) => [`${value}%`, 'Participação']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Monthly Trends */}
        <Card className="bg-gray-800 border-gray-700 p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Evolução da Reciclagem e Economia
              </h3>
              <p className="text-gray-400 text-sm">Tendência mensal (6 meses)</p>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis yAxisId="left" stroke="#9CA3AF" />
                <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                  formatter={(value, name) => [
                    name === 'reciclado' ? `${value} ton` : `R$ ${(value/1000).toFixed(0)}K`,
                    name === 'reciclado' ? 'Volume Reciclado' : 'Economia Gerada'
                  ]}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="reciclado" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="economia" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Collections */}
      <Card className="bg-gray-800 border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Coletas Recentes e Agendadas
            </h3>
            <p className="text-gray-400 text-sm">Últimas transações da sua operação</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Nova Coleta
          </Button>
        </div>
        
        <div className="space-y-4">
          {recentCollections.map((collection) => (
            <div 
              key={collection.id}
              className="flex items-center justify-between p-4 bg-gray-750 rounded-lg border border-gray-600 hover:border-gray-500 transition-all"
            >
              <div className="flex items-center space-x-4">
                {getStatusIcon(collection.status)}
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-white font-medium">{collection.id}</p>
                    <Badge className={`text-xs ${getStatusBadgeColor(collection.status)}`}>
                      {getStatusLabel(collection.status)}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm">{collection.type} • {collection.quantity}</p>
                  <p className="text-gray-500 text-xs">{collection.location}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-emerald-400 font-semibold">{collection.value}</p>
                <p className="text-gray-400 text-sm">{collection.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-blue-900 to-blue-800 border-blue-700 p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-800 p-3 rounded-lg">
            <div className="text-blue-200 text-xl">🤖</div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              NeuroCompost AI - Insights Personalizados
            </h3>
            <div className="space-y-2 text-sm text-blue-100">
              <p>• <strong>Otimização:</strong> Reagrupando coletas de plásticos industriais, você pode economizar 15% nos custos de transporte</p>
              <p>• <strong>Previsão:</strong> Baseado no histórico, espera-se um aumento de 22% no volume de pneus para reciclagem no próximo trimestre</p>
              <p>• <strong>Oportunidade:</strong> Novo ponto de coleta especializado em equipamentos obsoletos a 12km da sua operação</p>
              <p>• <strong>Meta:</strong> Você está no caminho certo para superar sua meta mensal de sustentabilidade em 7%</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}