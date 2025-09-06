import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
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
  TrendingUp, 
  DollarSign, 
  Recycle, 
  Factory, 
  Leaf, 
  Users,
  BarChart3,
  PieChartIcon,
  TrendingDown,
  Award,
  Target,
  Globe
} from 'lucide-react';

export function StatsPage() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  // Mock data for charts
  const wasteByCategory = [
    { category: 'Plásticos Industriais', volume: 1250, color: '#10B981' },
    { category: 'Pneus de Mineração', volume: 890, color: '#3B82F6' },
    { category: 'Equipamentos', volume: 650, color: '#8B5CF6' },
    { category: 'Borrachas', volume: 520, color: '#F59E0B' },
    { category: 'Componentes Eletrônicos', volume: 380, color: '#EF4444' },
    { category: 'Cabos e Fios', volume: 290, color: '#6B7280' }
  ];

  const monthlyRecycling = [
    { month: 'Jan', volume: 2150, revenue: 450000 },
    { month: 'Fev', volume: 2380, revenue: 520000 },
    { month: 'Mar', volume: 2690, revenue: 580000 },
    { month: 'Abr', volume: 2950, revenue: 640000 },
    { month: 'Mai', volume: 3250, revenue: 720000 },
    { month: 'Jun', volume: 3580, revenue: 780000 },
    { month: 'Jul', volume: 3890, revenue: 850000 },
    { month: 'Ago', volume: 4120, revenue: 920000 },
    { month: 'Set', volume: 3980, revenue: 880000 },
    { month: 'Out', volume: 4380, revenue: 980000 },
    { month: 'Nov', volume: 4650, revenue: 1050000 },
    { month: 'Dez', volume: 4980, volume_projected: true, revenue: 1120000 }
  ];

  const revenueByCategory = [
    { name: 'Plásticos Industriais', value: 35, revenue: 3850000 },
    { name: 'Pneus de Mineração', value: 28, revenue: 3080000 },
    { name: 'Equipamentos', value: 20, revenue: 2200000 },
    { name: 'Componentes Eletrônicos', value: 10, revenue: 1100000 },
    { name: 'Outros', value: 7, revenue: 770000 }
  ];

  const co2Savings = [
    { month: 'Jan', co2_saved: 450 },
    { month: 'Fev', co2_saved: 520 },
    { month: 'Mar', co2_saved: 580 },
    { month: 'Abr', co2_saved: 640 },
    { month: 'Mai', co2_saved: 720 },
    { month: 'Jun', co2_saved: 780 },
    { month: 'Jul', co2_saved: 850 },
    { month: 'Ago', co2_saved: 920 },
    { month: 'Set', co2_saved: 880 },
    { month: 'Out', co2_saved: 980 },
    { month: 'Nov', co2_saved: 1050 },
    { month: 'Dez', co2_saved: 1120 }
  ];

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

  const metrics = [
    {
      title: 'Total Reciclado',
      value: '42,580',
      unit: 'toneladas',
      change: '+23.5%',
      changeType: 'positive',
      icon: Recycle,
      color: 'green'
    },
    {
      title: 'Receita Gerada',
      value: 'R$ 11.2M',
      unit: 'este ano',
      change: '+31.2%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Empresas Ativas',
      value: '487',
      unit: 'mineradoras',
      change: '+18.7%',
      changeType: 'positive',
      icon: Factory,
      color: 'purple'
    },
    {
      title: 'CO₂ Evitado',
      value: '8,940',
      unit: 'toneladas CO₂',
      change: '+42.1%',
      changeType: 'positive',
      icon: Leaf,
      color: 'green'
    },
    {
      title: 'Pontos de Coleta',
      value: '234',
      unit: 'ativos',
      change: '+12.3%',
      changeType: 'positive',
      icon: Target,
      color: 'orange'
    },
    {
      title: 'Taxa de Reciclagem',
      value: '89.2%',
      unit: 'dos resíduos',
      change: '+5.8%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'green'
    }
  ];

  const handleMetricClick = (title: string) => {
    setSelectedMetric(selectedMetric === title ? null : title);
  };

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dashboard de Sustentabilidade
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acompanhe em tempo real o impacto da reciclagem de resíduos não minerais 
            na indústria de mineração brasileira
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <Card 
              key={index} 
              className={`p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-0 ${
                selectedMetric === metric.title ? 'ring-2 ring-green-500' : ''
              }`}
              onClick={() => handleMetricClick(metric.title)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg bg-${metric.color}-100`}>
                      <metric.icon className={`h-6 w-6 text-${metric.color}-600`} />
                    </div>
                    <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                    <p className="text-sm text-gray-500">{metric.unit}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge className={`${
                    metric.changeType === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {metric.changeType === 'positive' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {metric.change}
                  </Badge>
                </div>
              </div>
              
              {selectedMetric === metric.title && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Clique nos gráficos abaixo para ver dados detalhados sobre este indicador.
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Volume by Category */}
          <Card className="p-6 bg-white shadow-lg border-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Volume por Categoria de Resíduo
                </h3>
                <p className="text-sm text-gray-600">Toneladas recicladas (últimos 12 meses)</p>
              </div>
              <BarChart3 className="h-6 w-6 text-gray-400" />
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wasteByCategory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="category" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} ton`, 'Volume']}
                    labelStyle={{ color: '#374151' }}
                  />
                  <Bar dataKey="volume" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Revenue Distribution */}
          <Card className="p-6 bg-white shadow-lg border-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Distribuição de Receita por Material
                </h3>
                <p className="text-sm text-gray-600">Participação percentual na receita total</p>
              </div>
              <PieChartIcon className="h-6 w-6 text-gray-400" />
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                    fontSize={12}
                  >
                    {revenueByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Monthly Trends */}
          <Card className="p-6 bg-white shadow-lg border-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Evolução do Volume de Reciclagem
                </h3>
                <p className="text-sm text-gray-600">Tendência mensal (toneladas)</p>
              </div>
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRecycling}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} ton`, 'Volume Reciclado']}
                    labelStyle={{ color: '#374151' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="volume" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* CO2 Impact */}
          <Card className="p-6 bg-white shadow-lg border-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Impacto de CO₂ Evitado
                </h3>
                <p className="text-sm text-gray-600">Toneladas de CO₂ não emitidas</p>
              </div>
              <Leaf className="h-6 w-6 text-green-500" />
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={co2Savings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} ton CO₂`, 'CO₂ Evitado']}
                    labelStyle={{ color: '#374151' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="co2_saved" 
                    stroke="#059669" 
                    fill="#10B981"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
            <div className="flex items-center justify-between mb-4">
              <Award className="h-8 w-8" />
              <Badge className="bg-white text-green-600">Meta 2024</Badge>
            </div>
            <h3 className="text-xl font-semibold mb-2">Zero Waste Achieved</h3>
            <p className="text-green-100 text-sm">
              87% das empresas parceiras atingiram a meta de zero desperdício em 2024
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <div className="flex items-center justify-between mb-4">
              <Globe className="h-8 w-8" />
              <Badge className="bg-white text-blue-600">Nacional</Badge>
            </div>
            <h3 className="text-xl font-semibold mb-2">Cobertura Nacional</h3>
            <p className="text-blue-100 text-sm">
              Presente em 23 estados brasileiros com 234 pontos de coleta ativos
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8" />
              <Badge className="bg-white text-purple-600">Crescimento</Badge>
            </div>
            <h3 className="text-xl font-semibold mb-2">Rede em Expansão</h3>
            <p className="text-purple-100 text-sm">
              +47 novas empresas parceiras se juntaram à plataforma este mês
            </p>
          </Card>
        </div>

        {/* AI Insights */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 border border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-500 p-3 rounded-lg">
              <div className="text-white text-xl">🤖</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Insights de IA - Análise Preditiva
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• <strong>Tendência:</strong> Crescimento de 35% no volume de reciclagem de plásticos industriais previsto para o próximo trimestre</p>
                <p>• <strong>Oportunidade:</strong> Região Sudeste apresenta potencial para 3 novos pontos de coleta especializados</p>
                <p>• <strong>Eficiência:</strong> Otimização de rotas pode reduzir custos de transporte em até 18%</p>
                <p>• <strong>Sustentabilidade:</strong> Meta de 12.000 toneladas de CO₂ evitado até dezembro de 2024 está 89% cumprida</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}