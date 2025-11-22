// src/pages/Stories.jsx
import React from 'react';
import { Droplet, TrendingDown } from 'lucide-react';
import { testimonials, estadosMenosDoacao } from '../data/testimonials';
import { bloodImpact } from '../data/statistics';
import BloodTypesChart from '../components/BloodTypesChart';

const Stories = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50 py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header com animação */}
        <div className="text-center mb-12 lg:mb-16 animate-fade-in">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-4">
            Histórias de Vida
          </h1>
          <p className="text-lg lg:text-xl text-gray-600">
            Cada doação tem o poder de transformar histórias
          </p>
        </div>

        {/* Testimonials com animações */}
        <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8 mb-16 lg:mb-20">
          {testimonials.map((person, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl shadow-xl p-6 lg:p-10 transform hover:scale-102 transition-all hover:shadow-2xl animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex flex-col sm:flex-row items-start mb-6">
                <div className="bg-gradient-to-br from-rose-600 to-red-700 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 mb-4 sm:mb-0 animate-pulse-slow">
                  {person.name.charAt(0)}
                </div>
                <div className="sm:ml-6">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800">{person.name}</h3>
                  <p className="text-sm lg:text-base text-gray-600">
                    {person.age} anos • {person.condition} • {person.year}
                  </p>
                </div>
              </div>
              <p className="text-base lg:text-lg leading-relaxed italic border-l-4 border-rose-500 pl-4 lg:pl-6 bg-rose-50 py-4 rounded-r-lg text-gray-700">
                "{person.story}"
              </p>
            </div>
          ))}
        </div>

        {/* NOVO: Gráfico de Tipos Sanguíneos */}
        <div className="max-w-6xl mx-auto mb-16 lg:mb-20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <BloodTypesChart />
        </div>

        {/* Impacto Visual com animação */}
        <div className="max-w-4xl mx-auto mb-16 lg:mb-20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gradient-to-r from-rose-600 to-red-700 rounded-2xl shadow-2xl p-8 lg:p-12 text-white text-center transform hover:scale-105 transition-all">
            <Droplet className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-6 animate-pulse-slow" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Como o Sangue Salva Vidas
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mt-10">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 transform hover:scale-110 transition-all">
                <div className="text-4xl lg:text-5xl font-bold mb-2">1</div>
                <div className="text-lg lg:text-xl">doação</div>
                <div className="text-2xl lg:text-3xl font-bold mt-4">= 4</div>
                <div className="text-base lg:text-lg">vidas salvas</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 transform hover:scale-110 transition-all">
                <div className="text-4xl lg:text-5xl font-bold mb-2">450ml</div>
                <div className="text-lg lg:text-xl">de sangue</div>
                <div className="text-2xl lg:text-3xl font-bold mt-4">= 100%</div>
                <div className="text-base lg:text-lg">esperança</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 transform hover:scale-110 transition-all">
                <div className="text-4xl lg:text-5xl font-bold mb-2">60min</div>
                <div className="text-lg lg:text-xl">do seu tempo</div>
                <div className="text-2xl lg:text-3xl font-bold mt-4">∞</div>
                <div className="text-base lg:text-lg">gratidão</div>
              </div>
            </div>

            {/* Componentes do Sangue */}
            <div className="mt-12 text-left">
              <h3 className="text-xl lg:text-2xl font-bold mb-6 text-center">
                Uma Doação, Múltiplos Usos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bloodImpact.oneDonation.components.map((component, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur rounded-lg p-4 transform hover:scale-105 transition-all">
                    <h4 className="font-bold text-base lg:text-lg mb-2">{component.name}</h4>
                    <p className="text-sm opacity-90">{component.use}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Estados com Menos Doação com animação */}
        <div className="max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-10 transform hover:scale-102 transition-all">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-8">
              <div className="bg-gradient-to-br from-rose-600 to-red-700 p-3 rounded-full mb-4 sm:mb-0 animate-pulse-slow">
                <TrendingDown className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 sm:ml-4 text-center sm:text-left">
                Estados que Mais Precisam de Doadores
              </h2>
            </div>
            
            <div className="space-y-6">
              {estadosMenosDoacao.map((estado, idx) => (
                <div key={idx} className="border-b pb-6 last:border-b-0 transform hover:scale-105 transition-all">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                    <div>
                      <span className="text-xl lg:text-2xl font-bold text-gray-800">{estado.estado}</span>
                      <span className="text-sm lg:text-base text-gray-600 ml-2 sm:ml-4">
                        Pop: {estado.populacao}
                      </span>
                    </div>
                    <span className="text-xl lg:text-2xl text-rose-600 font-bold">
                      {estado.porcentagem}%
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-3 lg:h-4 mr-4">
                      <div 
                        className="bg-gradient-to-r from-rose-500 to-red-600 h-3 lg:h-4 rounded-full transition-all duration-1000 animate-slide-right"
                        style={{ 
                          width: `${estado.porcentagem * 20}%`,
                          animationDelay: `${idx * 0.1}s`
                        }}
                      ></div>
                    </div>
                    <span className="text-sm lg:text-base text-gray-600 font-semibold min-w-[100px] lg:min-w-[120px]">
                      {estado.doadores} doadores
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-base lg:text-lg text-gray-600 mb-2">
                <span className="font-bold text-rose-600">Meta da OMS:</span> 3% da população como doadores regulares
              </p>
              <p className="text-sm lg:text-base text-gray-500">
                Estes estados ainda estão abaixo da metade da meta recomendada
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action com animação */}
        <div className="max-w-4xl mx-auto mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-to-r from-rose-600 to-red-700 rounded-2xl shadow-2xl p-8 lg:p-12 text-white text-center transform hover:scale-105 hover:rotate-1 transition-all">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Seja Você Também um Doador!
            </h3>
            <p className="text-lg lg:text-xl mb-6 opacity-90">
              Sua história pode inspirar outras pessoas a salvar vidas
            </p>
            <button 
              onClick={() => {
                window.location.href = '/hemocentros';
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
              }}
              className="bg-white text-rose-600 px-8 lg:px-10 py-3 lg:py-4 rounded-full text-base lg:text-lg font-semibold hover:bg-rose-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Encontrar Hemocentro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;