// src/pages/Home.jsx
import React from 'react';
import { Heart, Users, Droplet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Heart3D from '../components/Heart3D';
import Button from '../components/Button';
import BloodDonationAnimation from '../components/BloodDonationAnimation';
import DonationGoal from '../components/DonationGoal';

const Home = () => {
  const navigate = useNavigate();

  const stats = [
    { 
      icon: Heart, 
      title: 'Uma doação salva', 
      subtitle: 'até 4 vidas', 
      gradient: 'from-rose-500 to-red-600'
    },
    { 
      icon: Users, 
      title: 'Apenas 1.6%', 
      subtitle: 'da população doa', 
      gradient: 'from-red-600 to-rose-700'
    },
    { 
      icon: Droplet, 
      title: 'A cada 2 segundos', 
      subtitle: 'alguém precisa de sangue', 
      gradient: 'from-rose-600 to-red-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50">
      {/* Hero Section - Layout Split */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-600 via-red-700 to-rose-800 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LADO ESQUERDO: Conteúdo */}
            <div className="text-center lg:text-left animate-fade-in">
              {/* Coração 3D */}
              <div className="mb-8 flex justify-center lg:justify-start">
                <Heart3D />
              </div>
              
              {/* Título */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Doe Vida, Salve Vidas
              </h1>
              
              {/* Subtítulo - ESPAÇAMENTO CORRIGIDO */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex justify-center lg:justify-start">
                  <div className="w-80 h-10 bg-white/20 rounded-full blur-xl animate-pulse-slow"></div>
                </div>
                
                {/* Texto CORRIGIDO - "de Rodrigo" separado */}
                <p className="relative text-xl lg:text-2xl font-light animate-fade-in-delay">
                  <span className="inline-block">Em memória de <strong>Rodrigo</strong> e <strong>Natalha</strong>
                  </span>
                  <span className="inline-block ml-2">❤️</span>
                </p>
              </div>
              
              {/* Descrição - SEM ESPAÇAMENTO EXTRA */}
              <p className="text-lg lg:text-xl leading-relaxed mb-8 opacity-90">
                Transformando a saudade em esperança através da doação de sangue. 
                Cada gesto salva vidas e mantém viva a memória de quem amamos.
              </p>
              
              {/* Botão */}
              <div className="flex justify-center lg:justify-start">
                <Button 
                  variant="secondary"
                  size="large"
                  onClick={() => navigate('/hemocentros')}
                >
                  Encontre um Hemocentro
                </Button>
              </div>
            </div>

            {/* LADO DIREITO: Animação da Bolsa */}
            <div className="flex justify-center items-center animate-fade-in-delay-2">
              <BloodDonationAnimation />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 lg:px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 text-center transform hover:scale-105 transition-all hover:shadow-2xl animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={`bg-gradient-to-br ${stat.gradient} w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">{stat.title}</h3>
              <p className="text-gray-600 text-base lg:text-lg">{stat.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Meta de Doações */}
      <div className="container mx-auto px-4 lg:px-6 py-16 lg:py-20">
        <div className="max-w-2xl mx-auto">
          <DonationGoal />
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 lg:px-6 pb-16 lg:pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12">
            Nossa Missão
          </h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-10 text-base lg:text-lg text-gray-700 leading-relaxed transform hover:scale-102 transition-all">
            <p className="mb-6">
              Em memória de <span className="font-semibold text-rose-600">Rodrigo e Natalha</span>, 
              criamos este espaço para conscientizar sobre a importância vital da doação de sangue.
            </p>
            
            <p className="mb-6">
              Cada doação é uma ponte entre a perda e a esperança, transformando momentos de dor 
              em oportunidades de salvar vidas. Queremos que o legado deles continue vivo através 
              de cada gesto de amor e solidariedade.
            </p>
            
            <p className="font-semibold text-center text-xl text-rose-600 mt-8">
              Seu sangue pode ser o milagre que alguém está esperando.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions com ícones 3D */}
      <div className="container mx-auto px-4 lg:px-6 pb-16 lg:pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div 
            onClick={() => {
              navigate('/cuidados');
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            }}
            className="relative bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl p-6 lg:p-8 text-white cursor-pointer transform hover:scale-105 hover:rotate-1 transition-all shadow-xl hover:shadow-2xl animate-slide-up overflow-hidden group"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center mb-4">
              <div className="relative w-16 h-16 mr-4">
                <div className="absolute inset-0 bg-white/20 rounded-xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-white/30 rounded-xl flex items-center justify-center text-4xl shadow-lg">
                  💉
                </div>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold">Prepare-se para Doar</h3>
            </div>
            <p className="text-base lg:text-lg opacity-90 ml-20">
              Saiba todos os cuidados antes e depois da doação
            </p>
          </div>
          
          <div 
            onClick={() => {
              navigate('/historias');
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            }}
            className="relative bg-gradient-to-br from-red-600 to-rose-700 rounded-2xl p-6 lg:p-8 text-white cursor-pointer transform hover:scale-105 hover:rotate-1 transition-all shadow-xl hover:shadow-2xl animate-slide-up overflow-hidden group"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center mb-4">
              <div className="relative w-16 h-16 mr-4">
                <div className="absolute inset-0 bg-white/20 rounded-xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-white/30 rounded-xl flex items-center justify-center text-4xl shadow-lg">
                  📖
                </div>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold">Histórias Reais</h3>
            </div>
            <p className="text-base lg:text-lg opacity-90 ml-20">
              Conheça pessoas que tiveram suas vidas salvas
            </p>
          </div>
          
          <div 
            onClick={() => {
              navigate('/hemocentros');
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            }}
            className="relative bg-gradient-to-br from-rose-600 to-red-700 rounded-2xl p-6 lg:p-8 text-white cursor-pointer transform hover:scale-105 hover:rotate-1 transition-all shadow-xl hover:shadow-2xl animate-slide-up overflow-hidden group"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center mb-4">
              <div className="relative w-16 h-16 mr-4">
                <div className="absolute inset-0 bg-white/20 rounded-xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-white/30 rounded-xl flex items-center justify-center text-4xl shadow-lg">
                  🩸
                </div>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold">Doe Agora</h3>
            </div>
            <p className="text-base lg:text-lg opacity-90 ml-20">
              Encontre o hemocentro mais próximo de você
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;