import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Target, 
  Eye, 
  Heart,
  Users,
  Award,
  Globe,
  Linkedin,
  Twitter,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    subject: 'geral'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast("Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.");
      setFormData({ name: '', email: '', company: '', message: '', subject: 'geral' });
      setIsSubmitting(false);
    }, 2000);
  };

  const team = [
    {
      name: 'Maria Silva',
      role: 'CEO & Fundadora',
      bio: 'Engenheira Ambiental com 15 anos de experiência em sustentabilidade na mineração',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e5?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'João Santos',
      role: 'CTO',
      bio: 'Especialista em tecnologia e dados, ex-Google, focado em soluções ambientais',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'Ana Costa',
      role: 'Diretora de Operações',
      bio: 'Especialista em logística e supply chain sustentável para a indústria pesada',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Foco em Resultados',
      description: 'Comprometidos em gerar impacto mensurável na redução de resíduos da mineração'
    },
    {
      icon: Heart,
      title: 'Sustentabilidade',
      description: 'Cada ação que tomamos tem o meio ambiente como prioridade fundamental'
    },
    {
      icon: Users,
      title: 'Colaboração',
      description: 'Construímos pontes entre mineradoras, recicladores e a sociedade'
    },
    {
      icon: Award,
      title: 'Excelência',
      description: 'Padrões rigorosos de qualidade em todos os nossos processos e parcerias'
    }
  ];

  const achievements = [
    { number: '42,580', label: 'Toneladas Recicladas', period: '2024' },
    { number: '487', label: 'Empresas Parceiras', period: 'atualmente' },
    { number: '234', label: 'Pontos de Coleta', period: 'no Brasil' },
    { number: '89%', label: 'Taxa de Reciclagem', period: 'média' }
  ];

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Nossa Missão é Revolucionar a 
            <span className="text-green-600"> Reciclagem Industrial</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Somos pioneiros em conectar a indústria de mineração a soluções sustentáveis, 
            transformando resíduos não minerais em oportunidades de crescimento econômico e ambiental.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Target className="h-8 w-8 text-green-600" />
                    <h2 className="text-3xl font-bold text-gray-900">Nossa Missão</h2>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Facilitar a transição da indústria de mineração para a economia circular, 
                    conectando empresas a soluções especializadas de reciclagem e criando 
                    valor sustentável a partir de resíduos não minerais.
                  </p>
                </div>

                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Eye className="h-8 w-8 text-blue-600" />
                    <h2 className="text-3xl font-bold text-gray-900">Nossa Visão</h2>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Ser a plataforma líder na América Latina para reciclagem de resíduos 
                    industriais da mineração, contribuindo para um futuro onde toda operação 
                    mineradora seja sustentável e economicamente circular.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                  alt="Equipe MineRecycle"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating stats */}
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-lg border">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">3+</div>
                  <div className="text-sm text-gray-600">Anos de Impacto</div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">23</div>
                  <div className="text-sm text-gray-600">Estados Atendidos</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossos Valores</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Os princípios que guiam cada decisão e ação da MineRecycle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-all duration-300 border-0 bg-white">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full w-fit mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-16 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nosso Impacto em Números</h2>
            <p className="text-xl text-green-100">
              Resultados concretos da nossa dedicação à sustentabilidade
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2">
                  {achievement.number}
                </div>
                <div className="text-lg font-medium mb-1">{achievement.label}</div>
                <div className="text-sm text-green-200">{achievement.period}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Equipe de Liderança</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Profissionais experientes unidos pela paixão por sustentabilidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 border-0 bg-white">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover border-4 border-green-100"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-full">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{member.name}</h3>
                <p className="text-green-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Entre em Contato</h2>
            <p className="text-lg text-gray-600 mb-8">
              Tem interesse em fazer parte da revolução da reciclagem industrial? 
              Nossa equipe está pronta para ajudar sua empresa a implementar soluções sustentáveis.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">contato@minerecycle.com.br</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Telefone</p>
                  <p className="text-gray-600">(11) 3000-5000</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Endereço</p>
                  <p className="text-gray-600">
                    Av. Paulista, 1234 - Conjunto 56<br />
                    São Paulo, SP - 01310-100
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <p className="font-semibold text-gray-900 mb-4">Siga-nos nas redes sociais</p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="p-2">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="sm" className="p-2">
                  <Twitter className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 bg-white shadow-lg border-0">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Envie uma Mensagem</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Nome da sua empresa"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="subject">Assunto</Label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="geral">Informações Gerais</option>
                  <option value="parceria">Interesse em Parceria</option>
                  <option value="suporte">Suporte Técnico</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div>
                <Label htmlFor="message">Mensagem *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Conte-nos como podemos ajudar sua empresa..."
                  rows={5}
                  required
                  className="mt-1"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Enviando...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Enviar Mensagem</span>
                  </div>
                )}
              </Button>
            </form>
          </Card>
        </section>
      </div>
    </main>
  );
}