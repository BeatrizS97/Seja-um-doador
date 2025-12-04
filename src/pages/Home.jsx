// src/pages/Home.jsx

import React from 'react';
import { Heart, Users, Droplet, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Heart3D from '../components/Heart3D';
import Button from '../components/Button';
import BloodDonationAnimation from '../components/BloodDonationAnimation';

const Home = () => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: Heart,
      title: 'Uma doação salva',
      subtitle: 'até 4 vidas',
      color: 'rose-600'
    },
    {
      icon: Users,
      title: 'Apenas 1.6%',
      subtitle: 'da população doa',
      color: 'red-600'
    },
    {
      icon: Droplet,
      title: 'A cada 2 segundos',
      subtitle: 'alguém precisa de sangue',
      color: 'rose-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50">
      {/* Hero Section - Layout Split */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-600 via-red-600 to-rose-800 text-white py-12 lg:py-16">
        <div className="absolute inset-0 bg-black opacity-20"></div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* LADO ESQUERDO: Conteúdo - AFASTADO 20% MAIS DA MARGEM */}
            <div className="text-center lg:text-left animate-fade-in px-4 sm:px-6 md:px-8 lg:pl-24">
              {/* Coração 3D - AUMENTADO PARA w-40 h-40 (160px) */}
              <div className="mb-6 flex justify-center lg:justify-start">
                <div className="w-40 h-40">
                  <Heart3D />
                </div>
              </div>

              {/* Título - Tamanhos de fonte aumentados */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Doe Vida, Salve Vidas
              </h1>

              {/* Subtítulo - Tamanhos de fonte aumentados */}
              <p className="text-lg sm:text-xl font-light mb-4 animate-fade-in-delay">
                Em memória de Rodrigo e Natalha <span className="inline-block ml-1">❤️</span>
              </p>

              {/* Descrição - Tamanhos de fonte aumentados */}
              <p className="text-base sm:text-lg leading-relaxed mb-6 opacity-90 max-w-md mx-auto lg:mx-0">
                Transformando saudade em esperança através da doação de sangue. Cada gesto salva vidas e mantém viva a memória de quem amamos.
              </p>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="secondary"
                  size="large"
                  onClick={() => navigate('/hemocentros')}
                >
                  Encontre um Hemocentro
                </Button>
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => navigate('/doacao')}
                >
                  Metas
                </Button>
              </div>
            </div>

            {/* LADO DIREITO: Animação da Bolsa */}
            <div className="flex justify-center items-center animate-fade-in-delay-2 px-4 sm:px-6 md:px-8 lg:pr-16">
              <div className="w-full max-w-xl h-[400px] sm:h-[350px] md:h-[400px]">
                <BloodDonationAnimation />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - COM ÍCONES CORRIGIDOS */}
      <div className="relative z-20 -mt-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-all hover:shadow-xl animate-slide-up max-w-[320px] w-full mx-auto"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Ícone corrigido para garantir visibilidade */}
                <div className={`bg-${stat.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {/* Forçar cor branca com text-white */}
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                {/* Tamanhos de fonte aumentados para os stats */}
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.title}</h3>
                <p className="text-gray-600 text-lg">{stat.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Donation Goal Section - COMPACTO E HARMONIOSO */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 lg:py-14">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Grid de 2 colunas em telas grandes */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* Coluna Esquerda - Informações */}
              <div className="lg:col-span-3 p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-4">
                  {/* Elemento Decorativo: Gotas de Sangue Animadas - Formato Orgânico */}
                  <div className="relative w-14 h-14 flex-shrink-0">
                    {/* Gota principal - formato de gota real MAIS GORDINHA */}
                    <div className="absolute inset-0 animate-pulse" style={{ animationDuration: '2s' }}>
                      <svg viewBox="0 0 56 56" className="w-full h-full drop-shadow-lg">
                        <defs>
                          <linearGradient id="dropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fb7185" />
                            <stop offset="50%" stopColor="#f43f5e" />
                            <stop offset="100%" stopColor="#dc2626" />
                          </linearGradient>
                        </defs>
                        {/* Formato de gota de sangue - mais larga e gordinha */}
                        <path
                          d="M28 8 C28 8, 14 20, 14 32 C14 41, 20 49, 28 49 C36 49, 42 41, 42 32 C42 20, 28 8, 28 8 Z"
                          fill="url(#dropGradient)"
                        />
                        {/* Brilho interno */}
                        <ellipse cx="24" cy="26" rx="6" ry="8" fill="white" opacity="0.3" />
                        <ellipse cx="22" cy="24" rx="3" ry="4" fill="white" opacity="0.5" />
                      </svg>
                    </div>

                    {/* Gota pequena superior direita */}
                    <div className="absolute -top-1 -right-1 w-5 h-5 animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.3s' }}>
                      <svg viewBox="0 0 20 20" className="w-full h-full drop-shadow-md">
                        <path
                          d="M10 2 C10 2, 5 7, 5 11 C5 14, 7 16, 10 16 C13 16, 15 14, 15 11 C15 7, 10 2, 10 2 Z"
                          fill="#dc2626"
                        />
                        <ellipse cx="8" cy="9" rx="2" ry="2.5" fill="white" opacity="0.4" />
                      </svg>
                    </div>

                    {/* Gota pequena inferior esquerda */}
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.6s' }}>
                      <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-md">
                        <path
                          d="M8 1 C8 1, 4 5, 4 8 C4 10.5, 5.5 12, 8 12 C10.5 12, 12 10.5, 12 8 C12 5, 8 1, 8 1 Z"
                          fill="#f43f5e"
                        />
                        <ellipse cx="6.5" cy="6.5" rx="1.5" ry="2" fill="white" opacity="0.4" />
                      </svg>
                    </div>
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                    Nossa Meta de Doações
                  </h2>
                </div>

                <p className="text-base lg:text-lg text-gray-700 mb-6 leading-relaxed">
                  Estamos trabalhando para aumentar a conscientização sobre a importância da doação de sangue.
                  Juntos, podemos salvar mais vidas e honrar a memória de Rodrigo e Natalha.
                </p>

                <Button
                  variant="primary"
                  size="large"
                  onClick={() => navigate('/doacao')}
                  className="relative overflow-hidden group/btn transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500"
                >
                  {/* Efeito de brilho ao passar o mouse */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>

                  {/* Partículas decorativas */}
                  <span className="absolute top-1 left-4 w-1 h-1 bg-white/40 rounded-full animate-ping"></span>
                  <span className="absolute bottom-1 right-6 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></span>

                  {/* Texto do botão */}
                  <span className="relative flex items-center gap-2 font-semibold">
                    Veja Nossas Metas Detalhadas
                    <svg
                      className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Button>
              </div>

              {/* Coluna Direita - Card da Meta */}
              <div className="lg:col-span-2 bg-gradient-to-br from-rose-600 via-red-600 to-rose-700 p-8 flex flex-col items-center justify-center text-white relative overflow-hidden group">
                {/* Efeito de brilho principal */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>

                {/* Partículas decorativas animadas */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute top-12 right-8 w-1.5 h-1.5 bg-white/40 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                <div className="absolute bottom-8 left-12 w-2.5 h-2.5 bg-white/25 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
                <div className="absolute bottom-16 right-6 w-1 h-1 bg-white/35 rounded-full animate-ping" style={{ animationDuration: '3.5s', animationDelay: '1.5s' }}></div>

                <div className="relative z-10 text-center">
                  {/* Coração com efeito de batimento mais suave */}
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-8 h-8 text-white animate-pulse" style={{ animationDuration: '1.5s' }} />
                  </div>

                  <p className="text-lg font-semibold mb-2 opacity-90 group-hover:opacity-100 transition-opacity">
                    Nossa meta é alcançar
                  </p>

                  {/* Número com efeito de fade-in ao hover */}
                  <p className="text-4xl lg:text-5xl font-extrabold mb-2 transform group-hover:scale-105 transition-transform duration-300">
                    10.000
                  </p>

                  <p className="text-xl font-bold mb-4">
                    doações este ano!
                  </p>

                  <div className="mt-6 pt-6 border-t border-white/30">
                    <p className="text-sm font-medium">
                      Cada doação faz a diferença ✨
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

{/* Nossa Missão Section - REFINADO E IMPACTANTE */}
<div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-10 lg:pb-14">
  <div className="max-w-4xl mx-auto">
    {/* Header com animações elegantes */}
    <div className="text-center mb-8 animate-fade-in">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-300 animate-pulse"></div>
        <div className="relative">
          <Heart className="w-5 h-5 text-rose-500 animate-pulse" style={{ animationDuration: '2s' }} />
          <div className="absolute inset-0 animate-ping">
            <Heart className="w-5 h-5 text-rose-300 opacity-75" />
          </div>
        </div>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-rose-300 animate-pulse"></div>
      </div>
      
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
        Nossa Missão
      </h2>
      
      <p className="text-sm text-gray-600">
        Transformando vidas através da solidariedade
      </p>
    </div>

    {/* Card Principal - Design refinado com animações */}
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-rose-100 hover:shadow-2xl transition-all duration-500 animate-slide-up group/card">
      {/* Efeito de brilho sutil no topo */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
      
      <div className="p-8 lg:p-10">
        
        {/* Citação em destaque com animação */}
        <div className="mb-8 relative animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="absolute -left-2 -top-3 text-6xl text-rose-200/40 font-serif leading-none animate-pulse" style={{ animationDuration: '3s' }}>"</div>
          
          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed pl-10 pr-6">
            Em memória de <span className="font-semibold text-rose-600 relative inline-block group/name">
              Rodrigo
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-300 scale-x-0 group-hover/name:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span> e <span className="font-semibold text-rose-600 relative inline-block group/name">
              Natalha
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-300 scale-x-0 group-hover/name:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>,
            criamos este espaço para conscientizar sobre a importância vital da doação de sangue.
          </p>
          
          <div className="absolute -right-2 -bottom-3 text-6xl text-rose-200/40 font-serif leading-none rotate-180 animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }}>"</div>
        </div>

        {/* Grid de valores - 2 colunas com animações */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {/* Card 1 */}
          <div className="bg-gradient-to-br from-rose-50 to-white rounded-xl p-6 border border-rose-100 hover:border-rose-300 transform hover:scale-105 hover:-rotate-1 transition-all duration-300 hover:shadow-lg group/value cursor-pointer animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/value:rotate-12 group-hover/value:scale-110 transition-all duration-300 shadow-md group-hover/value:shadow-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-base mb-2 group-hover/value:text-rose-600 transition-colors">Amor & Solidariedade</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Transformando dor em esperança através da doação
                </p>
              </div>
            </div>
            {/* Linha decorativa animada */}
            <div className="mt-4 h-0.5 bg-gradient-to-r from-rose-200 to-transparent scale-x-0 group-hover/value:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-br from-rose-50 to-white rounded-xl p-6 border border-rose-100 hover:border-rose-300 transform hover:scale-105 hover:rotate-1 transition-all duration-300 hover:shadow-lg group/value cursor-pointer animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/value:rotate-12 group-hover/value:scale-110 transition-all duration-300 shadow-md group-hover/value:shadow-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-base mb-2 group-hover/value:text-rose-600 transition-colors">Legado Vivo</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Mantendo viva a memória através da solidariedade
                </p>
              </div>
            </div>
            {/* Linha decorativa animada */}
            <div className="mt-4 h-0.5 bg-gradient-to-r from-rose-200 to-transparent scale-x-0 group-hover/value:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        </div>

        {/* Chamada Final - Compacta e impactante com animações */}
        <div className="relative animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {/* Glow effect animado */}
          <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 via-red-500 to-rose-400 rounded-xl blur opacity-30 animate-pulse" style={{ animationDuration: '3s' }}></div>
          
          <div className="relative bg-gradient-to-r from-rose-600 via-red-600 to-rose-600 rounded-xl p-8 text-center overflow-hidden group/cta">
            {/* Efeito de brilho deslizante */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000"></div>
            
            {/* Partículas flutuantes decorativas */}
            <div className="absolute top-4 left-8 w-1.5 h-1.5 bg-white/40 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="absolute top-8 right-12 w-1 h-1 bg-white/30 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-6 left-16 w-1.5 h-1.5 bg-white/35 rounded-full animate-ping" style={{ animationDuration: '3.5s', animationDelay: '1s' }}></div>
            <div className="absolute bottom-8 right-8 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}></div>
            
            {/* Gotas decorativas */}
            <div className="absolute top-4 left-1/4 opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>
              <Droplet className="w-4 h-4 text-white" />
            </div>
            <div className="absolute bottom-4 right-1/4 opacity-20 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
              <Droplet className="w-3 h-3 text-white" />
            </div>
            
            <div className="relative z-10">
              {/* Ícone central pulsante */}
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full mb-4 group-hover/cta:scale-110 group-hover/cta:rotate-12 transition-all duration-300 shadow-lg">
                <Droplet className="w-7 h-7 text-white animate-pulse" style={{ animationDuration: '2s' }} />
              </div>
              
              <p className="text-xl font-bold text-white leading-relaxed mb-3 drop-shadow-lg">
                Seu sangue pode ser o milagre que alguém está esperando
              </p>
              
              {/* Linha decorativa animada */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="h-0.5 w-8 bg-white/50 rounded-full group-hover/cta:w-12 transition-all duration-500"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                <div className="h-0.5 w-8 bg-white/50 rounded-full group-hover/cta:w-12 transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>

      {/* Quick Actions com ícones 3D */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-10 lg:pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            onClick={() => {
              navigate('/cuidados');
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            }}
            className="relative bg-gradient-to-br from-rose-500 to-red-600 rounded-xl p-6 text-white cursor-pointer transform hover:scale-105 hover:rotate-1 transition-all shadow-lg hover:shadow-xl animate-slide-up overflow-hidden group"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex items-center mb-3">
              <div className="relative w-12 h-12 mr-3">
                <div className="absolute inset-0 bg-white/20 rounded-lg transform rotate-6"></div>
                <div className="absolute inset-0 bg-white/30 rounded-lg flex items-center justify-center text-xl shadow-lg">
                  💉
                </div>
              </div>
              {/* Tamanho de fonte aumentado */}
              <h3 className="text-xl font-bold">Prepare-se para Doar</h3>
            </div>
            <p className="text-sm opacity-90 ml-12">
              Saiba todos os cuidados antes e depois da doação
            </p>
          </div>

          <div
            onClick={() => {
              navigate('/historias');
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            }}
            className="relative bg-gradient-to-br from-red-600 to-rose-700 rounded-xl p-6 text-white cursor-pointer transform hover:scale-105 hover:rotate-1 transition-all shadow-lg hover:shadow-xl animate-slide-up overflow-hidden group"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex items-center mb-3">
              <div className="relative w-12 h-12 mr-3">
                <div className="absolute inset-0 bg-white/20 rounded-lg transform rotate-6"></div>
                <div className="absolute inset-0 bg-white/30 rounded-lg flex items-center justify-center text-xl shadow-lg">
                  📖
                </div>
              </div>
              {/* Tamanho de fonte aumentado */}
              <h3 className="text-xl font-bold">Histórias Reais</h3>
            </div>
            <p className="text-sm opacity-90 ml-12">
              Conheça pessoas que tiveram suas vidas salvas
            </p>
          </div>

          <div
            onClick={() => {
              navigate('/hemocentros');
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            }}
            className="relative bg-gradient-to-br from-rose-600 to-red-700 rounded-xl p-6 text-white cursor-pointer transform hover:scale-105 hover:rotate-1 transition-all shadow-lg hover:shadow-xl animate-slide-up overflow-hidden group"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex items-center mb-3">
              <div className="relative w-12 h-12 mr-3">
                <div className="absolute inset-0 bg-white/20 rounded-lg transform rotate-6"></div>
                <div className="absolute inset-0 bg-white/30 rounded-lg flex items-center justify-center text-xl shadow-lg">
                  🩸
                </div>
              </div>
              {/* Tamanho de fonte aumentado */}
              <h3 className="text-xl font-bold">Doe Agora</h3>
            </div>
            <p className="text-sm opacity-90 ml-12">
              Encontre o hemocentro mais próximo de você
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;