import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Search, 
  Filter, 
  Calendar, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Eye,
  X,
  Download,
  Plus,
  MoreHorizontal,
  MapPin,
  DollarSign
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface Collection {
  id: string;
  date: string;
  scheduleDate: string;
  wasteType: string;
  quantity: string;
  location: string;
  recyclingPoint: string;
  status: 'agendada' | 'em_andamento' | 'concluida' | 'cancelada';
  value: string;
  driver?: string;
  vehicle?: string;
  notes?: string;
}

export function MyOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

  const collections: Collection[] = [
    {
      id: 'COL-2024-1850',
      date: '2024-01-05',
      scheduleDate: '2024-01-12',
      wasteType: 'Correias Transportadoras',
      quantity: '22.1 ton',
      location: 'Linha de Produção 3',
      recyclingPoint: 'GreenCycle Mining Waste',
      status: 'agendada',
      value: 'R$ 89.400',
      notes: 'Coleta programada para manhã - equipamento especial necessário'
    },
    {
      id: 'COL-2024-1849',
      date: '2024-01-08',
      scheduleDate: '2024-01-10',
      wasteType: 'Equipamentos Obsoletos',
      quantity: '15.8 ton',
      location: 'Oficina Central',
      recyclingPoint: 'EcoTech Industrial Solutions',
      status: 'em_andamento',
      value: 'R$ 67.200',
      driver: 'Carlos Silva',
      vehicle: 'Caminhão TRK-4521',
      notes: 'Coleta iniciada às 08:30 - previsão de conclusão 14:00'
    },
    {
      id: 'COL-2024-1848',
      date: '2024-01-07',
      scheduleDate: '2024-01-09',
      wasteType: 'Pneus de Mineração',
      quantity: '8.2 ton',
      location: 'Pátio de Máquinas',
      recyclingPoint: 'GreenCycle Mining Waste',
      status: 'concluida',
      value: 'R$ 34.500',
      driver: 'Ana Costa',
      vehicle: 'Caminhão TRK-3412',
      notes: 'Coleta concluída com sucesso - certificado emitido'
    },
    {
      id: 'COL-2024-1847',
      date: '2024-01-06',
      scheduleDate: '2024-01-08',
      wasteType: 'Plásticos Industriais',
      quantity: '12.5 ton',
      location: 'Setor A - Mina Principal',
      recyclingPoint: 'EcoTech Industrial Solutions',
      status: 'concluida',
      value: 'R$ 42.500',
      driver: 'João Santos',
      vehicle: 'Caminhão TRK-2341',
      notes: 'Material classificado e processado conforme normas'
    },
    {
      id: 'COL-2024-1846',
      date: '2024-01-05',
      scheduleDate: '2024-01-07',
      wasteType: 'Cabos Elétricos',
      quantity: '5.3 ton',
      location: 'Subestação Elétrica',
      recyclingPoint: 'RecyclePro Advanced Materials',
      status: 'cancelada',
      value: 'R$ 18.900',
      notes: 'Cancelada - material não conforme com especificações'
    },
    {
      id: 'COL-2024-1845',
      date: '2024-01-04',
      scheduleDate: '2024-01-06',
      wasteType: 'Baterias Industriais',
      quantity: '3.7 ton',
      location: 'Centro de Manutenção',
      recyclingPoint: 'RecyclePro Advanced Materials',
      status: 'concluida',
      value: 'R$ 28.600',
      driver: 'Pedro Lima',
      vehicle: 'Caminhão TRK-5643',
      notes: 'Transporte especializado - todas as normas seguidas'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'concluida':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'em_andamento':
        return <Truck className="h-4 w-4 text-orange-500" />;
      case 'agendada':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'cancelada':
        return <X className="h-4 w-4 text-red-500" />;
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
      case 'cancelada':
        return 'Cancelada';
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
      case 'cancelada':
        return 'bg-red-900 text-red-300 border-red-700';
      default:
        return 'bg-gray-900 text-gray-300 border-gray-700';
    }
  };

  const filteredCollections = collections.filter(collection => {
    const matchesSearch = !searchQuery || 
      collection.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.wasteType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.recyclingPoint.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !statusFilter || statusFilter === 'all' || collection.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleNewCollection = () => {
    // Navigate to search points page or open modal
    alert('Redirecionando para busca de pontos...');
  };

  const handleViewDetails = (collection: Collection) => {
    setSelectedCollection(collection);
  };

  const handleCancelCollection = (collectionId: string) => {
    alert(`Cancelando coleta ${collectionId}...`);
  };

  const stats = {
    total: collections.length,
    concluidas: collections.filter(c => c.status === 'concluida').length,
    agendadas: collections.filter(c => c.status === 'agendada').length,
    valor_total: collections
      .filter(c => c.status === 'concluida')
      .reduce((sum, c) => sum + parseFloat(c.value.replace('R$ ', '').replace('.', '')), 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-2">
            Meus Pedidos e Coletas
          </h1>
          <p className="text-gray-400">
            Gerencie todas as suas solicitações de coleta de resíduos
          </p>
        </div>
        <Button 
          onClick={handleNewCollection}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Coleta
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-900 p-3 rounded-lg">
              <Package className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total de Coletas</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-900 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Concluídas</p>
              <p className="text-2xl font-bold text-white">{stats.concluidas}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-900 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-orange-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Agendadas</p>
              <p className="text-2xl font-bold text-white">{stats.agendadas}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-green-900 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Valor Total</p>
              <p className="text-2xl font-bold text-white">R$ {(stats.valor_total/1000).toFixed(0)}K</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-800 border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por ID, tipo de resíduo ou ponto de reciclagem..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div className="lg:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="agendada" className="text-white">Agendadas</SelectItem>
                <SelectItem value="em_andamento" className="text-white">Em Andamento</SelectItem>
                <SelectItem value="concluida" className="text-white">Concluídas</SelectItem>
                <SelectItem value="cancelada" className="text-white">Canceladas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </Card>

      {/* Collections Table */}
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Lista de Coletas
            </h3>
            <Badge className="bg-emerald-900 text-emerald-300">
              {filteredCollections.length} resultados
            </Badge>
          </div>

          <div className="space-y-4">
            {filteredCollections.map((collection) => (
              <div
                key={collection.id}
                className="bg-gray-750 rounded-lg border border-gray-600 hover:border-gray-500 transition-all p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(collection.status)}
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-white font-medium">{collection.id}</p>
                        <Badge className={`text-xs ${getStatusBadgeColor(collection.status)}`}>
                          {getStatusLabel(collection.status)}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Criado em {collection.date} • Agendado para {collection.scheduleDate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <p className="text-emerald-400 font-semibold">{collection.value}</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-700 border-gray-600">
                        <DropdownMenuItem 
                          onClick={() => handleViewDetails(collection)}
                          className="text-gray-300 hover:bg-gray-600"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        {collection.status === 'agendada' && (
                          <DropdownMenuItem 
                            onClick={() => handleCancelCollection(collection.id)}
                            className="text-red-400 hover:bg-gray-600"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Cancelar
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 mb-1">Tipo de Resíduo</p>
                    <p className="text-white font-medium">{collection.wasteType}</p>
                    <p className="text-gray-500">{collection.quantity}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 mb-1">Localização</p>
                    <p className="text-white font-medium">{collection.location}</p>
                    <p className="text-gray-500">{collection.recyclingPoint}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 mb-1">Status Detalhado</p>
                    {collection.driver && (
                      <p className="text-white font-medium">Motorista: {collection.driver}</p>
                    )}
                    {collection.vehicle && (
                      <p className="text-gray-500">{collection.vehicle}</p>
                    )}
                  </div>
                </div>

                {collection.notes && (
                  <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-600">
                    <p className="text-gray-300 text-sm">{collection.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredCollections.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">
                Nenhuma coleta encontrada
              </h3>
              <p className="text-gray-500 mb-6">
                Tente ajustar os filtros ou criar uma nova solicitação de coleta.
              </p>
              <Button 
                onClick={handleNewCollection}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agendar Nova Coleta
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Detail Modal */}
      {selectedCollection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="bg-gray-800 border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Detalhes da Coleta {selectedCollection.id}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCollection(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Informações Básicas</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <Badge className={`text-xs ${getStatusBadgeColor(selectedCollection.status)}`}>
                          {getStatusLabel(selectedCollection.status)}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Data Criação:</span>
                        <span className="text-white">{selectedCollection.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Data Agendada:</span>
                        <span className="text-white">{selectedCollection.scheduleDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Valor:</span>
                        <span className="text-emerald-400 font-semibold">{selectedCollection.value}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">Detalhes do Material</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tipo:</span>
                        <span className="text-white">{selectedCollection.wasteType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Quantidade:</span>
                        <span className="text-white">{selectedCollection.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Localização:</span>
                        <span className="text-white">{selectedCollection.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Destino:</span>
                        <span className="text-white">{selectedCollection.recyclingPoint}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedCollection.driver && (
                  <div>
                    <h4 className="font-semibold text-white mb-3">Informações de Transporte</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Motorista:</span>
                        <span className="text-white">{selectedCollection.driver}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Veículo:</span>
                        <span className="text-white">{selectedCollection.vehicle}</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedCollection.notes && (
                  <div>
                    <h4 className="font-semibold text-white mb-3">Observações</h4>
                    <div className="bg-gray-750 p-4 rounded-lg border border-gray-600">
                      <p className="text-gray-300">{selectedCollection.notes}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t border-gray-600">
                  {selectedCollection.status === 'agendada' && (
                    <Button
                      onClick={() => handleCancelCollection(selectedCollection.id)}
                      variant="outline"
                      className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      Cancelar Coleta
                    </Button>
                  )}
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white ml-auto">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Relatório
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}