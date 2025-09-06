import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Recycle, 
  Search, 
  BarChart3, 
  Leaf, 
  Target, 
  Users, 
  ArrowRight,
  CheckCircle,
  TrendingUp,
  MapPin
} from 'lucide-react';

type Page = 'home' | 'search' | 'stats' | 'about';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const features = [
    {
      icon: Search,
      title: 'Busca Inteligente',
      description: 'Encontre pontos de reciclagem específicos para resíduos não minerais de operações de mineração'
    },
    {
      icon: BarChart3,
      title: 'Análise de Dados',
      description: 'Acompanhe estatísticas de reciclagem e impacto ambiental com IA'
    },
    {
      icon: MapPin,
      title: 'Localização Precisa',
      description: 'Integração com Google Maps para navegação até os pontos de coleta'
    },
    {
      icon: TrendingUp,
      title: 'Economia Circular',
      description: 'Transforme resíduos em recursos através da economia circular'
    }
  ];

  const benefits = [
    'Redução de até 80% no descarte inadequado de resíduos',
    'Economia de custos operacionais com reciclagem',
    'Conformidade com regulamentações ambientais',
    'Melhoria na reputação corporativa sustentável',
    'Geração de receita através da venda de materiais',
    'Redução da pegada de carbono das operações'
  ];

  const stats = [
    { number: '1.2M', label: 'Toneladas Recicladas', period: 'este ano' },
    { number: '450+', label: 'Empresas Parceiras', period: 'atualmente' },
    { number: '89%', label: 'Redução CO₂', period: 'comprovada' },
    { number: '24/7', label: 'Suporte', period: 'disponível' }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-blue-600 to-gray-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1601965494578-53762c893c45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbmclMjByZWN5Y2xpbmclMjBzdXN0YWluYWJpbGl0eXxlbnwxfHx8fDE3NTcxMDMzODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Mineração sustentável"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-4xl">
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              Transformando 
              <span className="text-green-300"> Resíduos </span>
              em 
              <span className="text-blue-300"> Recursos</span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-12 text-gray-100 max-w-3xl leading-relaxed">
              A primeira plataforma dedicada à reciclagem de resíduos não minerais da indústria de mineração. 
              Conectamos empresas a soluções sustentáveis através da economia circular.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                size="lg"
                onClick={() => onNavigate('search')}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg"
              >
                <Search className="h-5 w-5 mr-2" />
                Encontrar Pontos de Reciclagem
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('stats')}
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Ver Estatísticas
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-900 font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.period}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Como Revolucionamos a Reciclagem Industrial
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma utiliza tecnologia avançada para conectar mineradoras a pontos 
              de reciclagem especializados, criando uma cadeia sustentável de valor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-all duration-300 border-0 bg-white">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full w-fit mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Benefícios Comprovados para sua Operação
              </h2>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-lg text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button
                  size="lg"
                  onClick={() => onNavigate('about')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4"
                >
                  Saiba Mais Sobre Nós
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1607369165516-0e831913b397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjaXJjdWxhciUyMGVjb25vbXklMjBlbnZpcm9ubWVudHxlbnwxfHx8fDE3NTcxMDMzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Economia circular"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating cards */}
              <div className="absolute -top-6 -right-6 bg-green-500 text-white p-4 rounded-xl shadow-lg">
                <Leaf className="h-8 w-8 mb-2" />
                <div className="font-semibold">100% Sustentável</div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-blue-500 text-white p-4 rounded-xl shadow-lg">
                <Target className="h-8 w-8 mb-2" />
                <div className="font-semibold">Meta Zero Waste</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para Transformar sua Operação?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Junte-se a centenas de empresas que já escolheram um futuro mais sustentável. 
            Comece hoje mesmo a reciclar seus resíduos não minerais.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              onClick={() => onNavigate('search')}
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg"
            >
              <Search className="h-5 w-5 mr-2" />
              Começar Agora
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('about')}
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg"
            >
              <Users className="h-5 w-5 mr-2" />
              Fale Conosco
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg">
                  <Recycle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">MineRecycle</h3>
                  <p className="text-sm text-gray-400">Economia Circular na Mineração</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Conectando a indústria de mineração a soluções sustentáveis de reciclagem, 
                transformando resíduos em recursos valiosos para um futuro mais verde.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-white cursor-pointer">Como Funciona</li>
                <li className="hover:text-white cursor-pointer">Tipos de Resíduos</li>
                <li className="hover:text-white cursor-pointer">Pontos de Coleta</li>
                <li className="hover:text-white cursor-pointer">Relatórios</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-white cursor-pointer">Sobre Nós</li>
                <li className="hover:text-white cursor-pointer">Parcerias</li>
                <li className="hover:text-white cursor-pointer">Sustentabilidade</li>
                <li className="hover:text-white cursor-pointer">Contato</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 MineRecycle. Todos os direitos reservados. 
              <span className="mx-2">•</span>
              Construindo um futuro sustentável.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}