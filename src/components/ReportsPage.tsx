import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Download, 
  Calendar, 
  BarChart3, 
  FileText, 
  TrendingUp,
  Leaf,
  DollarSign,
  Package
} from 'lucide-react';

export function ReportsPage() {
  const reports = [
    {
      id: 1,
      title: 'Relatório Mensal de Sustentabilidade',
      description: 'Análise completa do impacto ambiental e financeiro',
      period: 'Dezembro 2024',
      type: 'sustainability',
      size: '2.4 MB',
      lastGenerated: '2024-01-05'
    },
    {
      id: 2,
      title: 'Relatório de Coletas Realizadas',
      description: 'Detalhamento de todas as coletas do período',
      period: 'Q4 2024',
      type: 'collections',
      size: '1.8 MB',
      lastGenerated: '2024-01-03'
    },
    {
      id: 3,
      title: 'Análise de Economia de Custos',
      description: 'Comparativo de custos com e sem reciclagem',
      period: 'Anual 2024',
      type: 'financial',
      size: '3.2 MB',
      lastGenerated: '2024-01-01'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white mb-2">
          Relatórios e Análises
        </h1>
        <p className="text-gray-400">
          Baixe relatórios detalhados sobre suas atividades de reciclagem
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-900 p-3 rounded-lg">
              <Leaf className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">CO₂ Evitado</p>
              <p className="text-2xl font-bold text-white">1,238 ton</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-green-900 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Economia Total</p>
              <p className="text-2xl font-bold text-white">R$ 524K</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-900 p-3 rounded-lg">
              <Package className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Material Reciclado</p>
              <p className="text-2xl font-bold text-white">2,847 ton</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-900 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Eficiência</p>
              <p className="text-2xl font-bold text-white">89.2%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Reports List */}
      <Card className="bg-gray-800 border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">
            Relatórios Disponíveis
          </h3>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Calendar className="h-4 w-4 mr-2" />
            Gerar Novo Relatório
          </Button>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-gray-750 rounded-lg border border-gray-600 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-gray-300" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{report.title}</h4>
                    <p className="text-gray-400 text-sm mb-2">{report.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Período: {report.period}</span>
                      <span>Tamanho: {report.size}</span>
                      <span>Gerado em: {report.lastGenerated}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-emerald-900 text-emerald-300">
                    Disponível
                  </Badge>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Generate Custom Report */}
      <Card className="bg-gray-800 border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Gerar Relatório Personalizado
        </h3>
        <p className="text-gray-400 mb-6">
          Configure os parâmetros para gerar um relatório específico para suas necessidades
        </p>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <BarChart3 className="h-4 w-4 mr-2" />
          Configurar Relatório
        </Button>
      </Card>
    </div>
  );
}