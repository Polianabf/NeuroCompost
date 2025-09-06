import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { MapPin, Package, Scale, Search } from 'lucide-react';

interface RecyclingData {
  materials: string[];
  location: string;
  quantity: string;
}

interface RecyclingFormProps {
  onSubmit: (data: RecyclingData) => void;
  loading: boolean;
}

const materialOptions = [
  { id: 'papel', label: 'Papel', icon: '📄' },
  { id: 'papelão', label: 'Papelão', icon: '📦' },
  { id: 'plástico', label: 'Plástico', icon: '🥤' },
  { id: 'vidro', label: 'Vidro', icon: '🍾' },
  { id: 'metal', label: 'Metal', icon: '🥫' },
  { id: 'eletrônicos', label: 'Eletrônicos', icon: '📱' },
  { id: 'baterias', label: 'Baterias', icon: '🔋' },
  { id: 'óleo de cozinha', label: 'Óleo de Cozinha', icon: '🛢️' },
  { id: 'óleo automotivo', label: 'Óleo Automotivo', icon: '🚗' },
  { id: 'pneus', label: 'Pneus', icon: '🛞' },
];

export function RecyclingForm({ onSubmit, loading }: RecyclingFormProps) {
  const [materials, setMaterials] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleMaterialChange = (materialId: string, checked: boolean) => {
    if (checked) {
      setMaterials([...materials, materialId]);
    } else {
      setMaterials(materials.filter(m => m !== materialId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (materials.length === 0 || !location.trim()) {
      return;
    }
    
    onSubmit({
      materials,
      location: location.trim(),
      quantity: quantity.trim()
    });
  };

  return (
    <Card className="p-8 bg-white shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Materials Selection */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-green-600" />
            <Label className="text-lg">Que materiais você deseja reciclar?</Label>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {materialOptions.map((material) => (
              <div key={material.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
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
                  <span className="text-sm">{material.label}</span>
                </label>
              </div>
            ))}
          </div>
          {materials.length === 0 && (
            <p className="text-sm text-red-500">Selecione pelo menos um material</p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-green-600" />
            <Label htmlFor="location" className="text-lg">Sua localização</Label>
          </div>
          <Input
            id="location"
            placeholder="Digite seu endereço, CEP ou cidade"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-base p-4"
            required
          />
          <p className="text-sm text-gray-500">
            Ex: São Paulo, SP ou 01310-100 ou Rua Augusta, 123
          </p>
        </div>

        {/* Quantity (Optional) */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Scale className="h-5 w-5 text-green-600" />
            <Label htmlFor="quantity" className="text-lg">Quantidade aproximada (opcional)</Label>
          </div>
          <Input
            id="quantity"
            placeholder="Ex: 10kg, 5 sacos, 1 caixa grande"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="text-base p-4"
          />
          <p className="text-sm text-gray-500">
            Isso nos ajuda a encontrar pontos que aceitem sua quantidade
          </p>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={materials.length === 0 || !location.trim() || loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Buscando pontos de reciclagem...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Encontrar Pontos de Reciclagem</span>
            </div>
          )}
        </Button>
      </form>
    </Card>
  );
}