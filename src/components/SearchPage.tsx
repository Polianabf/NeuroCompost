import React, { useState } from 'react';
import { MiningWasteForm } from './MiningWasteForm';
import { MiningWasteMap } from './MiningWasteMap';
import { MiningWastePoints } from './MiningWastePoints';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface WasteData {
  materials: string[];
  location: string;
  quantity: string;
  wasteType: string;
}

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

export function SearchPage() {
  const [formData, setFormData] = useState<WasteData | null>(null);
  const [recyclingPoints, setRecyclingPoints] = useState<RecyclingPoint[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock data for mining waste recycling points
  const mockRecyclingPoints: RecyclingPoint[] = [
    {
      id: '1',
      name: 'EcoMining Solutions',
      address: 'Distrito Industrial, Km 15 - Região Metropolitana, MG',
      distance: '12.5 km',
      rating: 4.9,
      acceptedMaterials: ['plásticos industriais', 'pneus de mineração', 'borrachas', 'cabos'],
      price: 'R$ 3,50/kg para plásticos industriais',
      phone: '(31) 3333-4567',
      hours: '24h - Operação contínua',
      coordinates: { lat: -19.9167, lng: -43.9345 },
      certification: ['ISO 14001', 'ABNT NBR 15112', 'IBAMA'],
      capacity: '500 ton/mês'
    },
    {
      id: '2',
      name: 'RecycleMax Industrial',
      address: 'Rod. BR-040, Km 45 - Betim, MG',
      distance: '18.3 km',
      rating: 4.7,
      acceptedMaterials: ['equipamentos obsoletos', 'estruturas metálicas', 'componentes eletrônicos'],
      price: 'Avaliação técnica no local',
      phone: '(31) 2222-8901',
      hours: 'Seg-Sex: 6h-22h, Sáb: 6h-18h',
      coordinates: { lat: -19.9679, lng: -44.1989 },
      certification: ['ISO 9001', 'ISO 14001', 'CETESB'],
      capacity: '300 ton/mês'
    },
    {
      id: '3',
      name: 'Green Industrial Waste',
      address: 'Complexo Portuário, Setor 7 - Vitória, ES',
      distance: '234 km',
      rating: 4.8,
      acceptedMaterials: ['pneus de mineração', 'correias transportadoras', 'mangueiras industriais'],
      price: 'R$ 4,20/kg para pneus de mineração',
      phone: '(27) 3344-5566',
      hours: 'Seg-Dom: 24h - Plantão disponível',
      coordinates: { lat: -20.3155, lng: -40.3128 },
      certification: ['ISO 14001', 'ANTT', 'IBAMA'],
      capacity: '800 ton/mês'
    },
    {
      id: '4',
      name: 'TechRecycle Mining',
      address: 'Parque Tecnológico, Quadra 12 - Contagem, MG',
      distance: '25.7 km',
      rating: 4.6,
      acceptedMaterials: ['componentes eletrônicos', 'baterias industriais', 'equipamentos de automação'],
      price: 'Coprocessamento especializado',
      phone: '(31) 4444-7788',
      hours: 'Seg-Sex: 7h-19h',
      coordinates: { lat: -19.9317, lng: -44.0544 },
      certification: ['ISO 27001', 'RoHS', 'WEEE'],
      capacity: '150 ton/mês'
    },
    {
      id: '5',
      name: 'Circular Mining Solutions',
      address: 'Via Expressa, Km 8 - Nova Lima, MG',
      distance: '31.2 km',
      rating: 4.5,
      acceptedMaterials: ['plásticos industriais', 'polímeros', 'resinas', 'tubulações'],
      price: 'R$ 2,80/kg para polímeros',
      phone: '(31) 5555-9900',
      hours: 'Seg-Sex: 8h-18h, Sáb: 8h-14h',
      coordinates: { lat: -19.9857, lng: -43.8502 },
      certification: ['ISO 14001', 'ABRELPE', 'SINIR'],
      capacity: '400 ton/mês'
    }
  ];

  const handleFormSubmit = (data: WasteData) => {
    setLoading(true);
    setFormData(data);

    // Simulate API call delay
    setTimeout(() => {
      // Filter recycling points based on selected materials
      const filteredPoints = mockRecyclingPoints.filter(point =>
        data.materials.some(material =>
          point.acceptedMaterials.some(accepted => 
            accepted.toLowerCase().includes(material.toLowerCase()) ||
            material.toLowerCase().includes(accepted.toLowerCase())
          )
        )
      );

      // Sort by rating and distance
      const sortedPoints = filteredPoints.sort((a, b) => {
        const ratingDiff = b.rating - a.rating;
        if (ratingDiff !== 0) return ratingDiff;
        return parseFloat(a.distance) - parseFloat(b.distance);
      });
      
      setRecyclingPoints(sortedPoints);
      setLoading(false);
    }, 2000);
  };

  const resetSearch = () => {
    setFormData(null);
    setRecyclingPoints([]);
  };

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!formData ? (
          <div>
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Encontre Pontos de Reciclagem Especializados
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Localize os melhores pontos de reciclagem para resíduos não minerais 
                da sua operação de mineração. Nossa rede especializada garante o 
                processamento adequado e certificado dos seus materiais.
              </p>
            </div>

            {/* Form */}
            <div className="max-w-3xl mx-auto">
              <MiningWasteForm onSubmit={handleFormSubmit} loading={loading} />
            </div>

            {/* Info Cards */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-6">
                  <div className="text-2xl">🏭</div>
                </div>
                <h3 className="text-lg font-semibold mb-3">Especializados em Mineração</h3>
                <p className="text-gray-600">
                  Pontos de reciclagem com expertise específica em resíduos da indústria de mineração
                </p>
              </div>
              
              <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-6">
                  <div className="text-2xl">📋</div>
                </div>
                <h3 className="text-lg font-semibold mb-3">Certificações Completas</h3>
                <p className="text-gray-600">
                  Todos os pontos possuem certificações ambientais e seguem normas rigorosas
                </p>
              </div>
              
              <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="bg-purple-100 p-4 rounded-full w-fit mx-auto mb-6">
                  <div className="text-2xl">💰</div>
                </div>
                <h3 className="text-lg font-semibold mb-3">Melhor Valor</h3>
                <p className="text-gray-600">
                  Compare preços e encontre as melhores oportunidades de monetização dos resíduos
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={resetSearch}
                  className="p-2 hover:bg-gray-100"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Pontos de Reciclagem Encontrados
                  </h1>
                  <p className="text-gray-600">
                    {recyclingPoints.length} locais especializados encontrados para: {formData.materials.join(', ')}
                  </p>
                </div>
              </div>
              
              <Button
                onClick={resetSearch}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Nova Busca
              </Button>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Map */}
              <div className="order-2 lg:order-1">
                <MiningWasteMap points={recyclingPoints} userLocation={formData.location} />
              </div>

              {/* Points List */}
              <div className="order-1 lg:order-2">
                <MiningWastePoints 
                  points={recyclingPoints} 
                  selectedMaterials={formData.materials}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}