import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, Phone, Clock, MapPin, Navigation, DollarSign } from 'lucide-react';

interface RecyclingPoint {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  acceptedMaterials: string[];
  price: string;
  phone: string;
  hours: string;
  coordinates: { lat: number; lng: number };
}

interface RecyclingPointsProps {
  points: RecyclingPoint[];
  selectedMaterials: string[];
}

export function RecyclingPoints({ points, selectedMaterials }: RecyclingPointsProps) {
  const getMaterialIcon = (material: string) => {
    const icons: { [key: string]: string } = {
      'papel': '📄',
      'papelão': '📦',
      'plástico': '🥤',
      'vidro': '🍾',
      'metal': '🥫',
      'eletrônicos': '📱',
      'baterias': '🔋',
      'óleo de cozinha': '🛢️',
      'óleo automotivo': '🚗',
      'cristal': '🔮'
    };
    return icons[material.toLowerCase()] || '♻️';
  };

  const isSelectedMaterial = (material: string) => {
    return selectedMaterials.some(selected => 
      selected.toLowerCase() === material.toLowerCase()
    );
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleDirections = (address: string) => {
    // In a real app, this would open Google Maps with directions
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/${encodedAddress}`, '_blank');
  };

  if (points.length === 0) {
    return (
      <Card className="p-8 bg-white shadow-lg text-center">
        <div className="text-gray-400 mb-4">
          <MapPin className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-xl mb-2">Nenhum ponto encontrado</h3>
        <p className="text-gray-600">
          Não encontramos pontos de reciclagem para os materiais selecionados na sua região.
          Tente expandir sua busca ou verificar outros tipos de materiais.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl">Pontos Recomendados</h3>
        <p className="text-sm text-gray-600">
          Ordenados por melhor avaliação
        </p>
      </div>
      
      {points.map((point, index) => (
        <Card key={point.id} className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="bg-green-500 text-white text-sm px-2 py-1 rounded-full">
                    #{index + 1}
                  </span>
                  <h4 className="text-lg font-semibold">{point.name}</h4>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{point.address}</span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{point.rating}</span>
                </div>
                <span className="text-sm text-green-600 font-medium">{point.distance}</span>
              </div>
            </div>

            {/* Materials */}
            <div>
              <p className="text-sm font-medium mb-2">Materiais aceitos:</p>
              <div className="flex flex-wrap gap-2">
                {point.acceptedMaterials.map((material) => (
                  <Badge
                    key={material}
                    variant={isSelectedMaterial(material) ? "default" : "secondary"}
                    className={`text-xs ${
                      isSelectedMaterial(material) 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : ''
                    }`}
                  >
                    <span className="mr-1">{getMaterialIcon(material)}</span>
                    {material}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span><strong>Preço:</strong> {point.price}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span><strong>Horário:</strong> {point.hours}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t">
              <Button
                onClick={() => handleCall(point.phone)}
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
              >
                <Phone className="h-4 w-4 mr-2" />
                Ligar
              </Button>
              <Button
                onClick={() => handleDirections(point.address)}
                className="flex-1 bg-blue-500 hover:bg-blue-600"
                size="sm"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Como Chegar
              </Button>
            </div>

            {/* Match indicator */}
            {selectedMaterials.every(material => 
              point.acceptedMaterials.some(accepted => 
                accepted.toLowerCase() === material.toLowerCase()
              )
            ) && (
              <div className="flex items-center space-x-2 text-green-600 text-sm bg-green-50 p-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">
                  ✅ Aceita todos os seus materiais
                </span>
              </div>
            )}
          </div>
        </Card>
      ))}

      {/* Additional info */}
      <Card className="p-4 bg-blue-50 border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="text-blue-600 mt-1">
            💡
          </div>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Dicas importantes:</p>
            <ul className="space-y-1 text-sm">
              <li>• Sempre ligue antes para confirmar horários e disponibilidade</li>
              <li>• Verifique se há requisitos específicos para o material</li>
              <li>• Alguns locais podem ter quantidade mínima para aceitar</li>
              <li>• Preços podem variar conforme a demanda do mercado</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}