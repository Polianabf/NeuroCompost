import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Star, Navigation, Shield, Award } from 'lucide-react';

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

interface MiningWasteMapProps {
  points: RecyclingPoint[];
  userLocation: string;
}

export function MiningWasteMap({ points, userLocation }: MiningWasteMapProps) {
  const [selectedPoint, setSelectedPoint] = useState<RecyclingPoint | null>(null);

  return (
    <Card className="p-6 bg-white shadow-lg h-fit border-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Mapa de Pontos Especializados</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Navigation className="h-4 w-4" />
          <span>📍 {userLocation}</span>
        </div>
      </div>

      {/* Mock Map Container */}
      <div className="relative bg-gray-100 rounded-lg h-96 mb-4 overflow-hidden border">
        {/* Map Background with Mining Theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-100 to-gray-100">
          {/* Mining roads and infrastructure (mock) */}
          <div className="absolute top-12 left-0 w-full h-1 bg-yellow-400 opacity-40"></div>
          <div className="absolute top-24 left-0 w-full h-0.5 bg-gray-400 opacity-50"></div>
          <div className="absolute top-36 left-0 w-full h-0.5 bg-gray-400 opacity-50"></div>
          <div className="absolute left-12 top-0 h-full w-1 bg-yellow-400 opacity-40"></div>
          <div className="absolute left-28 top-0 h-full w-0.5 bg-gray-400 opacity-50"></div>
          <div className="absolute left-44 top-0 h-full w-0.5 bg-gray-400 opacity-50"></div>
          
          {/* Mining symbols */}
          <div className="absolute top-20 left-20 text-2xl opacity-30">⛏️</div>
          <div className="absolute bottom-20 right-20 text-2xl opacity-30">🏭</div>
        </div>

        {/* User Location Pin (Mining Operation) */}
        <div className="absolute top-32 left-32 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-orange-500 p-3 rounded-full shadow-lg border-3 border-white">
            <div className="text-white text-lg">⛏️</div>
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-3 py-1 rounded text-xs shadow-sm whitespace-nowrap">
            Sua Operação
          </div>
        </div>

        {/* Recycling Points */}
        {points.map((point, index) => {
          const positions = [
            { top: '20%', left: '65%' },
            { top: '40%', left: '75%' },
            { top: '70%', left: '50%' },
            { top: '30%', left: '85%' },
            { top: '80%', left: '70%' },
          ];
          
          const position = positions[index] || { top: '60%', left: '60%' };
          
          return (
            <div
              key={point.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ top: position.top, left: position.left }}
              onClick={() => setSelectedPoint(selectedPoint?.id === point.id ? null : point)}
            >
              <div className={`p-3 rounded-full shadow-lg border-3 border-white transition-all duration-200 ${
                selectedPoint?.id === point.id ? 'bg-green-600 scale-110' : 'bg-green-500 group-hover:bg-green-600 group-hover:scale-105'
              }`}>
                <div className="text-white text-sm">♻️</div>
              </div>
              
              {/* Point number */}
              <div className="absolute -top-2 -right-2 bg-white text-green-600 text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-green-500 font-bold">
                {index + 1}
              </div>
              
              {/* Certification badge */}
              <div className="absolute -bottom-2 -left-2 bg-blue-500 rounded-full p-1">
                <Shield className="h-3 w-3 text-white" />
              </div>
              
              {/* Hover tooltip */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                <div className="font-medium">{point.name}</div>
                <div className="text-gray-300">{point.distance}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Point Details */}
      {selectedPoint && (
        <div className="border-t pt-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="font-semibold text-lg text-gray-900">{selectedPoint.name}</h4>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  Certificado
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">{selectedPoint.address}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>📍 {selectedPoint.distance}</span>
                <span>📦 {selectedPoint.capacity}</span>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium text-sm">{selectedPoint.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-600 font-medium">Top Rated</span>
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Materiais Aceitos:</p>
            <div className="flex flex-wrap gap-2">
              {selectedPoint.acceptedMaterials.slice(0, 3).map((material) => (
                <Badge key={material} variant="secondary" className="text-xs bg-green-100 text-green-700">
                  {material}
                </Badge>
              ))}
              {selectedPoint.acceptedMaterials.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{selectedPoint.acceptedMaterials.length - 3} mais
                </Badge>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Certificações:</p>
            <div className="flex flex-wrap gap-2">
              {selectedPoint.certification.map((cert) => (
                <Badge key={cert} className="text-xs bg-blue-500 hover:bg-blue-600 text-white">
                  <Shield className="h-3 w-3 mr-1" />
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="text-sm space-y-1">
            <p><span className="font-medium text-gray-700">Preço:</span> <span className="text-green-600">{selectedPoint.price}</span></p>
            <p><span className="font-medium text-gray-700">Horário:</span> {selectedPoint.hours}</p>
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="border-t pt-6 mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Legenda</h4>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">⛏️</div>
            <span>Sua operação de mineração</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">♻️</div>
            <span>Pontos de reciclagem certificados</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-blue-500" />
            <span>Certificação ambiental</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-yellow-500" />
            <span>Avaliação superior</span>
          </div>
        </div>
      </div>
      
      {/* Integration Note */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <span className="font-medium">💡 Mapa Interativo:</span> Na versão completa, este mapa seria integrado 
          com Google Maps para navegação em tempo real, cálculo preciso de distâncias e rotas otimizadas para transporte de resíduos industriais.
        </p>
      </div>
    </Card>
  );
}