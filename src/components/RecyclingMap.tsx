import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Star, Navigation } from 'lucide-react';

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

interface RecyclingMapProps {
  points: RecyclingPoint[];
  userLocation: string;
}

export function RecyclingMap({ points, userLocation }: RecyclingMapProps) {
  const [selectedPoint, setSelectedPoint] = useState<RecyclingPoint | null>(null);

  // Mock map center (São Paulo)
  const mapCenter = { lat: -23.5505, lng: -46.6333 };

  return (
    <Card className="p-6 bg-white shadow-lg h-fit">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl">Mapa dos Pontos</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Navigation className="h-4 w-4" />
          <span>📍 {userLocation}</span>
        </div>
      </div>

      {/* Mock Map Container */}
      <div className="relative bg-gray-100 rounded-lg h-96 mb-4 overflow-hidden">
        {/* Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
          {/* Street lines (mock) */}
          <div className="absolute top-10 left-0 w-full h-0.5 bg-gray-300 opacity-50"></div>
          <div className="absolute top-20 left-0 w-full h-0.5 bg-gray-300 opacity-50"></div>
          <div className="absolute top-32 left-0 w-full h-0.5 bg-gray-300 opacity-50"></div>
          <div className="absolute left-10 top-0 h-full w-0.5 bg-gray-300 opacity-50"></div>
          <div className="absolute left-24 top-0 h-full w-0.5 bg-gray-300 opacity-50"></div>
          <div className="absolute left-40 top-0 h-full w-0.5 bg-gray-300 opacity-50"></div>
        </div>

        {/* User Location Pin */}
        <div className="absolute top-32 left-32 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-blue-500 p-2 rounded-full shadow-lg border-2 border-white">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs border shadow-sm whitespace-nowrap">
            Você está aqui
          </div>
        </div>

        {/* Recycling Points */}
        {points.map((point, index) => {
          const positions = [
            { top: '25%', left: '60%' },
            { top: '45%', left: '70%' },
            { top: '65%', left: '45%' },
            { top: '35%', left: '80%' },
            { top: '75%', left: '65%' },
          ];
          
          const position = positions[index] || { top: '50%', left: '50%' };
          
          return (
            <div
              key={point.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ top: position.top, left: position.left }}
              onClick={() => setSelectedPoint(selectedPoint?.id === point.id ? null : point)}
            >
              <div className={`p-2 rounded-full shadow-lg border-2 border-white transition-all duration-200 ${
                selectedPoint?.id === point.id ? 'bg-green-600 scale-110' : 'bg-green-500 group-hover:bg-green-600 group-hover:scale-105'
              }`}>
                <MapPin className="h-4 w-4 text-white" />
              </div>
              
              {/* Point number */}
              <div className="absolute -top-1 -right-1 bg-white text-green-600 text-xs w-5 h-5 rounded-full flex items-center justify-center border border-green-500 font-semibold">
                {index + 1}
              </div>
              
              {/* Hover tooltip */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {point.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Point Details */}
      {selectedPoint && (
        <div className="border-t pt-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-lg">{selectedPoint.name}</h4>
                <p className="text-sm text-gray-600">{selectedPoint.address}</p>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{selectedPoint.rating}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {selectedPoint.acceptedMaterials.map((material) => (
                <Badge key={material} variant="secondary" className="text-xs">
                  {material}
                </Badge>
              ))}
            </div>
            
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Distância:</span> {selectedPoint.distance}</p>
              <p><span className="font-medium">Preço:</span> {selectedPoint.price}</p>
              <p><span className="font-medium">Horário:</span> {selectedPoint.hours}</p>
            </div>
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="border-t pt-4 mt-4">
        <h4 className="text-sm font-medium mb-2">Legenda</h4>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Sua localização</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Pontos de reciclagem</span>
          </div>
        </div>
      </div>
      
      {/* Google Maps Integration Note */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>Nota:</strong> Este é um mapa simulado. Na versão completa, seria integrado 
          com o Google Maps para navegação em tempo real e localização precisa.
        </p>
      </div>
    </Card>
  );
}