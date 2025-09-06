import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Star, 
  Phone, 
  Clock, 
  MapPin, 
  Navigation, 
  DollarSign, 
  Shield,
  Award,
  Package,
  Truck
} from 'lucide-react';

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
  certification: string[];
  capacity: string;
}

interface MiningWastePointsProps {
  points: RecyclingPoint[];
  selectedMaterials: string[];
}

export function MiningWastePoints({ points, selectedMaterials }: MiningWastePointsProps) {
  const getMaterialIcon = (material: string) => {
    const icons: { [key: string]: string } = {
      'plásticos industriais': '🧪',
      'pneus de mineração': '🛞',
      'correias transportadoras': '🔗',
      'mangueiras industriais': '🚿',
      'cabos': '⚡',
      'componentes eletrônicos': '💾',
      'equipamentos obsoletos': '🔧',
      'baterias industriais': '🔋',
      'tubulações': '🚰',
      'filtros': '🔍',
      'resinas': '🧫',
      'estruturas metálicas': '🏗️'
    };
    return icons[material.toLowerCase()] || '♻️';
  };

  const isSelectedMaterial = (material: string) => {
    return selectedMaterials.some(selected => 
      selected.toLowerCase() === material.toLowerCase() ||
      material.toLowerCase().includes(selected.toLowerCase()) ||
      selected.toLowerCase().includes(material.toLowerCase())
    );
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/${encodedAddress}`, '_blank');
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.7) return 'text-green-600';
    if (rating >= 4.3) return 'text-blue-600';
    return 'text-yellow-600';
  };

  if (points.length === 0) {
    return (
      <Card className="p-8 bg-white shadow-lg text-center border-0">
        <div className="text-gray-400 mb-6">
          <Package className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold mb-3">Nenhum ponto especializado encontrado</h3>
        <p className="text-gray-600 mb-6">
          Não encontramos pontos de reciclagem especializados para os resíduos selecionados na sua região.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Sugestão:</strong> Tente expandir sua busca para regiões próximas ou entre em contato 
            conosco para identificar novos parceiros na sua área.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Pontos Especializados</h3>
          <p className="text-sm text-gray-600">
            Ordenados por avaliação e especialização
          </p>
        </div>
        <Badge className="bg-green-100 text-green-700 px-3 py-1">
          {points.length} encontrados
        </Badge>
      </div>
      
      {points.map((point, index) => (
        <Card key={point.id} className="p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:border-green-200">
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    #{index + 1}
                  </span>
                  <h4 className="text-lg font-semibold text-gray-900">{point.name}</h4>
                  <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    Certificado
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{point.address}</span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Navigation className="h-3 w-3" />
                    <span>{point.distance}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Truck className="h-3 w-3" />
                    <span>Capacidade: {point.capacity}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className={`font-semibold ${getRatingColor(point.rating)}`}>
                    {point.rating}
                  </span>
                </div>
                {point.rating >= 4.7 && (
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">Top Rated</span>
                  </div>
                )}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Certificações Ambientais:</p>
              <div className="flex flex-wrap gap-2">
                {point.certification.map((cert) => (
                  <Badge
                    key={cert}
                    className="text-xs bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Shield className="h-3 w-3 mr-1" />
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Resíduos Aceitos:</p>
              <div className="flex flex-wrap gap-2">
                {point.acceptedMaterials.map((material) => (
                  <Badge
                    key={material}
                    variant={isSelectedMaterial(material) ? "default" : "secondary"}
                    className={`text-xs ${
                      isSelectedMaterial(material) 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                <div>
                  <span className="font-medium text-gray-700">Preço:</span>
                  <span className="ml-2 text-green-600 font-medium">{point.price}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <div>
                  <span className="font-medium text-gray-700">Horário:</span>
                  <span className="ml-2">{point.hours}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <Button
                onClick={() => handleCall(point.phone)}
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none border-gray-300 hover:border-green-500 hover:text-green-600"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contatar
              </Button>
              <Button
                onClick={() => handleDirections(point.address)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
                size="sm"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Ver Localização
              </Button>
            </div>

            {/* Match indicator */}
            {selectedMaterials.every(material => 
              point.acceptedMaterials.some(accepted => 
                accepted.toLowerCase().includes(material.toLowerCase()) ||
                material.toLowerCase().includes(accepted.toLowerCase())
              )
            ) && (
              <div className="flex items-center space-x-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">
                  ✅ Aceita todos os seus resíduos selecionados
                </span>
              </div>
            )}

            {/* Special services indicator */}
            {point.rating >= 4.8 && (
              <div className="flex items-center space-x-2 text-blue-600 text-sm bg-blue-50 p-3 rounded-lg border border-blue-200">
                <Award className="h-4 w-4" />
                <span className="font-medium">
                  🏆 Ponto premium com serviços especializados para mineradoras
                </span>
              </div>
            )}
          </div>
        </Card>
      ))}

      {/* Additional info */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
        <div className="flex items-start space-x-4">
          <div className="text-green-600 mt-1 flex-shrink-0">
            <Shield className="h-6 w-6" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-green-900 mb-3">Compromisso com a Qualidade:</p>
            <ul className="space-y-2 text-green-800">
              <li>• Todos os pontos possuem licenças ambientais válidas (LO, LP, LI)</li>
              <li>• Certificações ISO 14001 para gestão ambiental</li>
              <li>• Rastreabilidade completa do processo de reciclagem</li>
              <li>• Relatórios de destinação final conforme legislação</li>
              <li>• Suporte técnico especializado para resíduos da mineração</li>
              <li>• Transporte licenciado com manifesto de transporte de resíduos (MTR)</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}