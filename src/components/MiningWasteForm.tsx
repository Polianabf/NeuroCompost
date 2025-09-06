import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MapPin, Package, Scale, Search, Factory, AlertTriangle } from 'lucide-react';

interface WasteData {
  materials: string[];
  location: string;
  quantity: string;
  wasteType: string;
}

interface MiningWasteFormProps {
  onSubmit: (data: WasteData) => void;
  loading: boolean;
}

const materialOptions = [
  { id: 'plásticos industriais', label: 'Plásticos Industriais', icon: '🧪', category: 'Polímeros' },
  { id: 'pneus de mineração', label: 'Pneus de Mineração', icon: '🛞', category: 'Borrachas' },
  { id: 'correias transportadoras', label: 'Correias Transportadoras', icon: '🔗', category: 'Borrachas' },
  { id: 'mangueiras industriais', label: 'Mangueiras Industriais', icon: '🚿', category: 'Borrachas' },
  { id: 'cabos', label: 'Cabos Elétricos', icon: '⚡', category: 'Eletrônicos' },
  { id: 'componentes eletrônicos', label: 'Componentes Eletrônicos', icon: '💾', category: 'Eletrônicos' },
  { id: 'equipamentos obsoletos', label: 'Equipamentos Obsoletos', icon: '🔧', category: 'Equipamentos' },
  { id: 'baterias industriais', label: 'Baterias Industriais', icon: '🔋', category: 'Químicos' },
  { id: 'tubulações', label: 'Tubulações Plásticas', icon: '🚰', category: 'Polímeros' },
  { id: 'filtros', label: 'Filtros Industriais', icon: '🔍', category: 'Diversos' },
  { id: 'resinas', label: 'Resinas e Polímeros', icon: '🧫', category: 'Químicos' },
  { id: 'estruturas metálicas', label: 'Estruturas Metálicas', icon: '🏗️', category: 'Diversos' },
];

const wasteTypes = [
  { value: 'classe-1', label: 'Classe I - Perigosos', description: 'Resíduos com propriedades perigosas' },
  { value: 'classe-2a', label: 'Classe II-A - Não Inertes', description: 'Resíduos não perigosos e não inertes' },
  { value: 'classe-2b', label: 'Classe II-B - Inertes', description: 'Resíduos não perigosos e inertes' },
  { value: 'especial', label: 'Resíduo Especial', description: 'Requer tratamento especializado' }
];

export function MiningWasteForm({ onSubmit, loading }: MiningWasteFormProps) {
  const [materials, setMaterials] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [wasteType, setWasteType] = useState('');

  const handleMaterialChange = (materialId: string, checked: boolean) => {
    if (checked) {
      setMaterials([...materials, materialId]);
    } else {
      setMaterials(materials.filter(m => m !== materialId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (materials.length === 0 || !location.trim() || !wasteType) {
      return;
    }
    
    onSubmit({
      materials,
      location: location.trim(),
      quantity: quantity.trim(),
      wasteType
    });
  };

  const groupedMaterials = materialOptions.reduce((acc, material) => {
    if (!acc[material.category]) {
      acc[material.category] = [];
    }
    acc[material.category].push(material);
    return acc;
  }, {} as Record<string, typeof materialOptions>);

  return (
    <Card className="p-8 bg-white shadow-lg border-0">
      <div className="mb-8 text-center">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full w-fit mx-auto mb-4">
          <Factory className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Formulário de Busca de Reciclagem
        </h2>
        <p className="text-gray-600">
          Informe os detalhes dos resíduos não minerais da sua operação
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Waste Classification */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <Label className="text-lg">Classificação do Resíduo *</Label>
          </div>
          <Select value={wasteType} onValueChange={setWasteType} required>
            <SelectTrigger className="p-4 text-base">
              <SelectValue placeholder="Selecione a classificação conforme ABNT NBR 10004" />
            </SelectTrigger>
            <SelectContent>
              {wasteTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div>
                    <div className="font-medium">{type.label}</div>
                    <div className="text-sm text-gray-500">{type.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!wasteType && (
            <p className="text-sm text-red-500">Selecione a classificação do resíduo</p>
          )}
        </div>

        {/* Materials Selection */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-green-600" />
            <Label className="text-lg">Tipos de Resíduos Não Minerais *</Label>
          </div>
          
          {Object.entries(groupedMaterials).map(([category, categoryMaterials]) => (
            <div key={category} className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                {category}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categoryMaterials.map((material) => (
                  <div key={material.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-all">
                    <Checkbox
                      id={material.id}
                      checked={materials.includes(material.id)}
                      onCheckedChange={(checked) => handleMaterialChange(material.id, checked as boolean)}
                    />
                    <label
                      htmlFor={material.id}
                      className="flex items-center space-x-2 cursor-pointer flex-1"
                    >
                      <span className="text-lg">{material.icon}</span>
                      <span className="text-sm font-medium">{material.label}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {materials.length === 0 && (
            <p className="text-sm text-red-500">Selecione pelo menos um tipo de resíduo</p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <Label htmlFor="location" className="text-lg">Localização da Operação *</Label>
          </div>
          <Input
            id="location"
            placeholder="Digite o endereço da mina, cidade ou região"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-base p-4"
            required
          />
          <p className="text-sm text-gray-500">
            Ex: Mina Carajás, PA ou Quadrilátero Ferrífero, MG ou 35400-000
          </p>
        </div>

        {/* Quantity */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Scale className="h-5 w-5 text-purple-600" />
            <Label htmlFor="quantity" className="text-lg">Volume Estimado (opcional)</Label>
          </div>
          <Input
            id="quantity"
            placeholder="Ex: 50 toneladas/mês, 200kg, 15 unidades"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="text-base p-4"
          />
          <p className="text-sm text-gray-500">
            Informe o volume para encontrar pontos com capacidade adequada
          </p>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-3">Informações Importantes:</h4>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Todos os pontos da nossa rede possuem licenças ambientais válidas</li>
            <li>• Classificação conforme ABNT NBR 10004 é obrigatória para destinação adequada</li>
            <li>• Resíduos Classe I requerem manifesto de transporte de resíduos (MTR)</li>
            <li>• Nossa plataforma conecta apenas a pontos certificados e auditados</li>
          </ul>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={materials.length === 0 || !location.trim() || !wasteType || loading}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Buscando pontos especializados...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Encontrar Pontos de Reciclagem Especializados</span>
            </div>
          )}
        </Button>
      </form>
    </Card>
  );
}