import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Star, 
  Phone, 
  Clock, 
  Navigation,
  Filter,
  Map,
  List,
  Shield,
  Truck,
  Calendar,
  AlertTriangle,
  Package,
  Send,
  Route,
  Info,
  CheckCircle
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface WasteFormData {
  materialType: string;
  hazardClassification: string;
  quantity: string;
  unit: string;
  location: string;
  description: string;
}

export function SearchPointsPage() {
  const [step, setStep] = useState<'form' | 'results'>('form');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<WasteFormData>({
    materialType: '',
    hazardClassification: '',
    quantity: '',
    unit: 'kg',
    location: '',
    description: ''
  });

  const materialTypes = [
    { value: 'plasticos', label: 'Plásticos Industriais', icon: '🔧' },
    { value: 'pneus', label: 'Pneus de Mineração', icon: '🛞' },
    { value: 'equipamentos', label: 'Equipamentos Obsoletos', icon: '⚙️' },
    { value: 'correias', label: 'Correias Transportadoras', icon: '🔗' },
    { value: 'cabos', label: 'Cabos Elétricos', icon: '⚡' },
    { value: 'eletronicos', label: 'Componentes Eletrônicos', icon: '💻' },
    { value: 'baterias', label: 'Baterias Industriais', icon: '🔋' },
    { value: 'filtros', label: 'Filtros Industriais', icon: '🌀' }
  ];

  const hazardClassifications = [
    { value: 'nao_perigoso', label: 'Não Perigoso', color: 'emerald' },
    { value: 'quimico', label: 'Químico', color: 'orange' },
    { value: 'toxico', label: 'Tóxico', color: 'red' },
    { value: 'radioativo', label: 'Radioativo', color: 'yellow' },
    { value: 'corrosivo', label: 'Corrosivo', color: 'purple' },
    { value: 'inflamavel', label: 'Inflamável', color: 'red' }
  ];

  const units = [
    { value: 'kg', label: 'Quilogramas (kg)' },
    { value: 'ton', label: 'Toneladas (ton)' },
    { value: 'un', label: 'Unidades' },
    { value: 'm3', label: 'Metros Cúbicos (m³)' }
  ];

  const recyclingPoints = [
    {
      id: '1',
      name: 'EcoTech Industrial Solutions',
      address: 'Rodovia BR-040, Km 25 - Distrito Industrial, MG',
      distance: '15.2 km',
      rating: 4.9,
      acceptedWastes: ['Plásticos Industriais', 'Equipamentos Obsoletos', 'Componentes Eletrônicos'],
      price: 'R$ 4.20/kg',
      phone: '(31) 3344-5566',
      hours: '24h - Operação contínua',
      certifications: ['ISO 14001', 'IBAMA', 'CETESB'],
      capacity: '500 ton/mês',
      coordinates: { x: 65, y: 30 }
    },
    {
      id: '2',
      name: 'GreenCycle Mining Waste',
      address: 'Setor Industrial Norte, Lote 45 - Contagem, MG',
      distance: '22.8 km',
      rating: 4.7,
      acceptedWastes: ['Pneus de Mineração', 'Correias Transportadoras', 'Cabos Elétricos'],
      price: 'R$ 3.80/kg',
      phone: '(31) 2233-4455',
      hours: 'Seg-Sex: 6h-22h, Sáb: 6h-18h',
      certifications: ['ISO 9001', 'ISO 14001', 'ANTT'],
      capacity: '300 ton/mês',
      coordinates: { x: 75, y: 45 }
    },
    {
      id: '3',
      name: 'RecyclePro Advanced Materials',
      address: 'Complexo Logístico, Setor B - Betim, MG',
      distance: '18.7 km',
      rating: 4.8,
      acceptedWastes: ['Baterias Industriais', 'Componentes Eletrônicos', 'Filtros Industriais'],
      price: 'Avaliação especializada',
      phone: '(31) 3355-6677',
      hours: 'Seg-Sex: 8h-18h',
      certifications: ['ISO 14001', 'RoHS', 'WEEE'],
      capacity: '200 ton/mês',
      coordinates: { x: 45, y: 60 }
    },
    {
      id: '4',
      name: 'MineRecycle Premium',
      address: 'Via Expressa, Km 12 - Nova Lima, MG',
      distance: '31.5 km',
      rating: 4.6,
      acceptedWastes: ['Plásticos Industriais', 'Pneus de Mineração', 'Equipamentos Obsoletos'],
      price: 'R$ 3.50/kg',
      phone: '(31) 4455-7788',
      hours: 'Seg-Dom: 24h',
      certifications: ['ISO 14001', 'ABRELPE'],
      capacity: '800 ton/mês',
      coordinates: { x: 85, y: 25 }
    }
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setStep('results');
  };

  const handleFormChange = (field: keyof WasteFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      materialType: '',
      hazardClassification: '',
      quantity: '',
      unit: 'kg',
      location: '',
      description: ''
    });
    setStep('form');
  };

  // Filter points based on form data
  const filteredPoints = recyclingPoints.filter(point => {
    if (step === 'form') return [];
    
    const materialTypeLabel = materialTypes.find(m => m.value === formData.materialType)?.label;
    if (materialTypeLabel && !point.acceptedWastes.includes(materialTypeLabel)) return false;
    
    return true;
  });

  const handleSchedulePickup = (pointId: string) => {
    // Simulate scheduling
    alert(`Agendamento iniciado para o ponto ${pointId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-xl blur-3xl opacity-30"></div>
        <div className="relative bg-gradient-to-r from-emerald-900/50 to-blue-900/50 rounded-xl p-6 border border-emerald-500/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white mb-2">
                {step === 'form' ? 'Análise de Resíduos NeuroCompost' : 'Pontos de Reciclagem Compatíveis'}
              </h1>
              <p className="text-emerald-200">
                {step === 'form' 
                  ? 'Preencha os dados do seu resíduo para encontrar pontos especializados'
                  : 'Pontos encontrados com base na sua análise de resíduos'
                }
              </p>
            </div>
            {step === 'results' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-emerald-600 p-3 rounded-full"
              >
                <CheckCircle className="h-6 w-6 text-white" />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {step === 'form' ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            {/* Waste Analysis Form */}
            <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700/50 shadow-2xl">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-3 rounded-lg shadow-lg">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Formulário de Análise de Resíduos</h3>
                    <p className="text-gray-400">Forneça detalhes sobre o material para encontrar pontos compatíveis</p>
                  </div>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Material Type */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-3"
                    >
                      <Label className="text-white font-medium flex items-center space-x-2">
                        <span>Tipo de Material *</span>
                        <AlertTriangle className="h-4 w-4 text-orange-400" />
                      </Label>
                      <Select value={formData.materialType} onValueChange={(value) => handleFormChange('materialType', value)}>
                        <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white h-12 transition-all hover:bg-gray-600/50 focus:ring-2 focus:ring-emerald-500/50">
                          <SelectValue placeholder="Selecione o tipo de material" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          {materialTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value} className="text-white hover:bg-gray-600">
                              <div className="flex items-center space-x-2">
                                <span>{type.icon}</span>
                                <span>{type.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Hazard Classification */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-3"
                    >
                      <Label className="text-white font-medium flex items-center space-x-2">
                        <span>Classificação de Periculosidade *</span>
                        <Shield className="h-4 w-4 text-blue-400" />
                      </Label>
                      <Select value={formData.hazardClassification} onValueChange={(value) => handleFormChange('hazardClassification', value)}>
                        <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white h-12 transition-all hover:bg-gray-600/50 focus:ring-2 focus:ring-emerald-500/50">
                          <SelectValue placeholder="Selecione a classificação" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          {hazardClassifications.map((hazard) => (
                            <SelectItem key={hazard.value} value={hazard.value} className="text-white hover:bg-gray-600">
                              <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full bg-${hazard.color}-500`}></div>
                                <span>{hazard.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Quantity */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-3"
                    >
                      <Label className="text-white font-medium">Quantidade *</Label>
                      <div className="flex space-x-3">
                        <Input
                          type="number"
                          placeholder="0"
                          value={formData.quantity}
                          onChange={(e) => handleFormChange('quantity', e.target.value)}
                          className="flex-1 bg-gray-700/50 border-gray-600 text-white h-12 transition-all hover:bg-gray-600/50 focus:ring-2 focus:ring-emerald-500/50"
                        />
                        <Select value={formData.unit} onValueChange={(value) => handleFormChange('unit', value)}>
                          <SelectTrigger className="w-40 bg-gray-700/50 border-gray-600 text-white h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            {units.map((unit) => (
                              <SelectItem key={unit.value} value={unit.value} className="text-white">
                                {unit.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>

                    {/* Location */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-3"
                    >
                      <Label className="text-white font-medium flex items-center space-x-2">
                        <span>Localização *</span>
                        <MapPin className="h-4 w-4 text-green-400" />
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Ex: Setor A - Mina Principal"
                          value={formData.location}
                          onChange={(e) => handleFormChange('location', e.target.value)}
                          className="pl-10 bg-gray-700/50 border-gray-600 text-white h-12 transition-all hover:bg-gray-600/50 focus:ring-2 focus:ring-emerald-500/50"
                        />
                      </div>
                    </motion.div>

                    {/* Description */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="lg:col-span-2 space-y-3"
                    >
                      <Label className="text-white font-medium">Descrição Adicional</Label>
                      <textarea
                        placeholder="Descreva características específicas, condições de armazenamento, ou outras informações relevantes..."
                        value={formData.description}
                        onChange={(e) => handleFormChange('description', e.target.value)}
                        rows={4}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 transition-all hover:bg-gray-600/50 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 resize-none"
                      />
                    </motion.div>
                  </div>

                  {/* Submit Button */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-center pt-6"
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.materialType || !formData.hazardClassification || !formData.quantity || !formData.location}
                      className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mr-2"
                        >
                          🔄
                        </motion.div>
                      ) : (
                        <Send className="h-5 w-5 mr-2" />
                      )}
                      {isSubmitting ? 'Analisando Resíduo...' : 'Buscar Pontos Compatíveis'}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            {/* Results Header */}
            <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700/50 shadow-xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-emerald-600 p-2 rounded-lg">
                    <Info className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Análise Concluída</h3>
                    <p className="text-gray-400 text-sm">
                      Material: {materialTypes.find(m => m.value === formData.materialType)?.label} • 
                      {formData.quantity} {formData.unit} • 
                      {hazardClassifications.find(h => h.value === formData.hazardClassification)?.label}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetForm}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Nova Busca
                  </Button>
                  {/* View Mode Toggle */}
                  <div className="flex rounded-lg bg-gray-700 p-1">
                    <Button
                      variant={viewMode === 'map' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('map')}
                      className={`transition-all ${viewMode === 'map' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-600'}`}
                    >
                      <Map className="h-4 w-4 mr-2" />
                      Mapa
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={`transition-all ${viewMode === 'list' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-600'}`}
                    >
                      <List className="h-4 w-4 mr-2" />
                      Lista
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Results */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map/List View */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {viewMode === 'map' ? (
                    <motion.div
                      key="map"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700/50 shadow-2xl p-6 h-96">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">
                            Mapa Interativo NeuroCompost
                          </h3>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Badge className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white border-none shadow-lg">
                              {filteredPoints.length} pontos compatíveis
                            </Badge>
                          </motion.div>
                        </div>
                        
                        {/* Enhanced 3D-style Map */}
                        <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 rounded-xl h-80 overflow-hidden border border-gray-600/50 shadow-inner">
                          {/* Animated grid pattern */}
                          <div className="absolute inset-0 opacity-10">
                            {[...Array(12)].map((_, i) => (
                              <motion.div 
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.3 }}
                                transition={{ delay: i * 0.1 }}
                                className="absolute bg-emerald-400" 
                                style={{
                                  left: `${i * 8.33}%`,
                                  top: 0,
                                  width: '1px',
                                  height: '100%'
                                }} 
                              />
                            ))}
                            {[...Array(8)].map((_, i) => (
                              <motion.div 
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.3 }}
                                transition={{ delay: i * 0.1 + 0.5 }}
                                className="absolute bg-emerald-400" 
                                style={{
                                  top: `${i * 12.5}%`,
                                  left: 0,
                                  height: '1px',
                                  width: '100%'
                                }} 
                              />
                            ))}
                          </div>

                          {/* Gradient overlay for depth */}
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>

                          {/* Your Location */}
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          >
                            <div className="relative">
                              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-3 rounded-full border-2 border-white shadow-2xl">
                                <div className="text-white text-lg">🏭</div>
                              </div>
                              {/* Pulsing animation */}
                              <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap shadow-lg">
                                <div className="font-medium">{formData.location}</div>
                              </div>
                            </div>
                          </motion.div>

                          {/* Recycling Points with animations */}
                          {filteredPoints.map((point, index) => (
                            <motion.div
                              key={point.id}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 1 + index * 0.2, type: "spring", stiffness: 120 }}
                              className="absolute cursor-pointer group"
                              style={{
                                left: `${point.coordinates.x}%`,
                                top: `${point.coordinates.y}%`,
                                transform: 'translate(-50%, -50%)'
                              }}
                              onClick={() => setSelectedPoint(selectedPoint === point.id ? null : point.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className={`relative p-3 rounded-full border-2 border-white shadow-2xl transition-all duration-300 ${
                                selectedPoint === point.id 
                                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 scale-110 shadow-emerald-500/50' 
                                  : 'bg-gradient-to-r from-emerald-500 to-emerald-400 group-hover:shadow-emerald-400/50'
                              }`}>
                                <div className="text-white text-lg">♻️</div>
                                {/* Glowing effect */}
                                {selectedPoint === point.id && (
                                  <div className="absolute inset-0 bg-emerald-500 rounded-full animate-pulse opacity-50"></div>
                                )}
                              </div>
                              
                              <div className="absolute -top-2 -right-2 bg-white text-emerald-600 text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-emerald-500 font-bold shadow-lg">
                                {index + 1}
                              </div>
                              
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                whileHover={{ opacity: 1, y: 0 }}
                                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap pointer-events-none shadow-xl border border-gray-700"
                              >
                                <div className="font-medium">{point.name}</div>
                                <div className="text-emerald-300">{point.distance} • ⭐ {point.rating}</div>
                              </motion.div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Enhanced Selected Point Info */}
                        <AnimatePresence>
                          {selectedPoint && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 20 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 p-4 bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-sm rounded-xl border border-gray-600/50 shadow-xl"
                            >
                              {(() => {
                                const point = filteredPoints.find(p => p.id === selectedPoint);
                                return point ? (
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-semibold text-white text-lg">{point.name}</h4>
                                      <div className="flex items-center space-x-1">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="text-sm text-white font-medium">{point.rating}</span>
                                      </div>
                                    </div>
                                    <p className="text-gray-300 text-sm flex items-center">
                                      <MapPin className="h-4 w-4 mr-2 text-emerald-400" />
                                      {point.address}
                                    </p>
                                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                                      <span className="flex items-center">
                                        <Navigation className="h-4 w-4 mr-1 text-blue-400" />
                                        {point.distance}
                                      </span>
                                      <span className="flex items-center">
                                        💰 {point.price}
                                      </span>
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                      <Button
                                        onClick={() => handleSchedulePickup(point.id)}
                                        className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                                      >
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Agendar Coleta
                                      </Button>
                                      <Button
                                        variant="outline"
                                        className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all duration-300"
                                      >
                                        <Route className="h-4 w-4 mr-2" />
                                        Ver Rota
                                      </Button>
                                    </div>
                                  </div>
                                ) : null;
                              })()}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="list"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {filteredPoints.map((point, index) => (
                        <motion.div
                          key={point.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          className="transform transition-all duration-300"
                        >
                          <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700/50 shadow-xl hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-300 p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="text-lg font-semibold text-white">{point.name}</h4>
                                  <Badge className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white border-none shadow-lg">
                                    <Shield className="h-3 w-3 mr-1" />
                                    Certificado
                                  </Badge>
                                </div>
                                <div className="flex items-center space-x-1 text-gray-300 text-sm mb-2">
                                  <MapPin className="h-4 w-4 text-emerald-400" />
                                  <span>{point.address}</span>
                                </div>
                                <div className="flex items-center space-x-6 text-sm text-gray-400">
                                  <span className="flex items-center">
                                    <Navigation className="h-4 w-4 mr-1 text-blue-400" />
                                    {point.distance}
                                  </span>
                                  <span className="flex items-center">
                                    📦 {point.capacity}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center space-x-1 mb-2">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="text-white font-semibold">{point.rating}</span>
                                </div>
                                <p className="text-emerald-400 font-semibold text-lg">{point.price}</p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <p className="text-sm font-medium text-gray-200 mb-3">Resíduos Aceitos:</p>
                                <div className="flex flex-wrap gap-2">
                                  {point.acceptedWastes.map((waste) => (
                                    <Badge 
                                      key={waste} 
                                      className="bg-blue-900/50 text-blue-300 text-xs border border-blue-700/50 hover:bg-blue-800/50 transition-colors cursor-default"
                                    >
                                      {waste}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center space-x-2 text-gray-300">
                                  <Clock className="h-4 w-4 text-orange-400" />
                                  <span>{point.hours}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-300">
                                  <Phone className="h-4 w-4 text-green-400" />
                                  <span>{point.phone}</span>
                                </div>
                              </div>

                              <div className="flex gap-3 pt-4 border-t border-gray-600/50">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 border-emerald-600/50 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                                >
                                  <Navigation className="h-4 w-4 mr-2" />
                                  Ver Rota
                                </Button>
                                <Button
                                  onClick={() => handleSchedulePickup(point.id)}
                                  className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                                  size="sm"
                                >
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Agendar Coleta
                                </Button>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Enhanced Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700/50 shadow-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <div className="bg-emerald-600 p-2 rounded-lg mr-3">
                        <Info className="h-4 w-4 text-white" />
                      </div>
                      Resumo da Análise
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-750 rounded-lg">
                        <span className="text-gray-300">Pontos compatíveis</span>
                        <Badge className="bg-emerald-600 text-white">{filteredPoints.length}</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-750 rounded-lg">
                        <span className="text-gray-300">Distância média</span>
                        <span className="text-white font-semibold">22.1 km</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-750 rounded-lg">
                        <span className="text-gray-300">Melhor avaliação</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white font-semibold">4.9</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-750 rounded-lg">
                        <span className="text-gray-300">Economia estimada</span>
                        <span className="text-emerald-400 font-semibold">R$ 8.5K</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700/50 shadow-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <div className="bg-blue-600 p-2 rounded-lg mr-3">
                        <Truck className="h-4 w-4 text-white" />
                      </div>
                      Ações Rápidas
                    </h3>
                    <div className="space-y-3">
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar Múltiplas Coletas
                      </Button>
                      <Button variant="outline" className="w-full border-emerald-600/50 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95">
                        <Route className="h-4 w-4 mr-2" />
                        Calcular Rotas Otimizadas
                      </Button>
                      <Button variant="outline" className="w-full border-blue-600/50 text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtros Avançados
                      </Button>
                    </div>
                  </Card>
                </motion.div>

                {/* AI Guidelines */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="bg-gradient-to-br from-blue-900/80 to-purple-900/80 backdrop-blur-sm border-blue-500/30 shadow-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <div className="text-2xl mr-3">🤖</div>
                      NeuroCompost AI
                    </h3>
                    <div className="space-y-3 text-sm text-blue-100">
                      <div className="flex items-start space-x-2">
                        <div className="text-emerald-400 mt-0.5">💡</div>
                        <p><strong>Otimização:</strong> Agrupe coletas próximas para reduzir custos em 15%</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="text-blue-400 mt-0.5">🔍</div>
                        <p><strong>Qualidade:</strong> Pontos certificados ISO garantem 98% de conformidade</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="text-purple-400 mt-0.5">📱</div>
                        <p><strong>Rastreamento:</strong> Monitor em tempo real disponível 24/7</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="text-yellow-400 mt-0.5">💰</div>
                        <p><strong>ROI:</strong> Economia média de R$ 12K por tonelada processada</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}