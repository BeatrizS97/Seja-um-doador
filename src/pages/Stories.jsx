// src/pages/Stories.jsx
import React, { useEffect, useRef } from 'react';
import { Droplet, TrendingDown } from 'lucide-react';
import { testimonials, estadosMenosDoacao } from '../data/testimonials';
import { bloodImpact } from '../data/statistics';
import BloodTypesChart from '../components/BloodTypesChart';

const Stories = () => {
  const sectionRefs = useRef([]);

  // Função para observar elementos e aplicar animação ao entrar na viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      {
        threshold: 0.1, // Anima quando 10% do elemento estiver visível
        rootMargin: '0px 0px -50px 0px', // Leve antecipação
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Função auxiliar para adicionar ref ao array
  const setRef = (el, index) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50 py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header com animação */}
        <div
          ref={(el) => setRef(el, 0)}
          className="text-center mb-12 lg:mb-16 opacity-0"
        >
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-4">
            Histórias de Vida
          </h1>
          <p className="text-lg lg:text-xl text-gray-600">
            Cada doação tem o poder de transformar histórias
          </p>
        </div>

        {/* Testimonials com animações - versão compacta */}
        <div
          ref={(el) => setRef(el, 1)}
          className="max-w-6xl mx-auto space-y-4 lg:space-y-6 mb-12 lg:mb-16 opacity-0"
        >
          {testimonials.map((person, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-xl shadow-md p-4 lg:p-6 transform hover:scale-101 transition-all hover:shadow-lg animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="bg-gradient-to-br from-rose-600 to-red-700 rounded-full w-12 h-12 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 animate-pulse-slow">
                  {person.name.charAt(0)}
                </div>
                <div className="sm:ml-4 flex-1">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800">{person.name}</h3>
                  <p className="text-xs lg:text-sm text-gray-600">
                    {person.age} anos • {person.condition} • {person.year}
                  </p>
                </div>
              </div>
              <p className="text-sm lg:text-base leading-relaxed italic border-l-4 border-rose-500 pl-3 lg:pl-4 bg-rose-50 py-3 rounded-r-lg text-gray-700 mt-4">
                "{person.story}"
              </p>
            </div>
          ))}
        </div>

        {/* NOVO: Gráfico de Tipos Sanguíneos */}
        <div
          ref={(el) => setRef(el, 2)}
          className="max-w-6xl mx-auto mb-12 lg:mb-16 opacity-0"
        >
          <BloodTypesChart />
        </div>

        {/* Impacto Visual com animação */}
        <div
          ref={(el) => setRef(el, 3)}
          className="max-w-4xl mx-auto mb-12 lg:mb-16 opacity-0"
        >
          <div className="bg-gradient-to-r from-rose-600 to-red-700 rounded-2xl shadow-2xl p-6 lg:p-8 text-white text-center transform hover:scale-105 transition-all">
            <Droplet className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 animate-pulse-slow" />
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Como o Sangue Salva Vidas
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mt-6">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 transform hover:scale-110 transition-all">
                <div className="text-2xl lg:text-3xl font-bold mb-1">1</div>
                <div className="text-sm lg:text-base">doação</div>
                <div className="text-xl lg:text-2xl font-bold mt-2">= 4</div>
                <div className="text-xs lg:text-sm">vidas salvas</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 transform hover:scale-110 transition-all">
                <div className="text-2xl lg:text-3xl font-bold mb-1">450ml</div>
                <div className="text-sm lg:text-base">de sangue</div>
                <div className="text-xl lg:text-2xl font-bold mt-2">= 100%</div>
                <div className="text-xs lg:text-sm">esperança</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 transform hover:scale-110 transition-all">
                <div className="text-2xl lg:text-3xl font-bold mb-1">60min</div>
                <div className="text-sm lg:text-base">do seu tempo</div>
                <div className="text-xl lg:text-2xl font-bold mt-2">∞</div>
                <div className="text-xs lg:text-sm">gratidão</div>
              </div>
            </div>

            {/* Componentes do Sangue */}
            <div className="mt-8 text-left">
              <h3 className="text-lg lg:text-xl font-bold mb-4 text-center">
                Uma Doação, Múltiplos Usos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {bloodImpact.oneDonation.components.map((component, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur rounded-lg p-3 transform hover:scale-105 transition-all">
                    <h4 className="font-bold text-xs lg:text-sm mb-1">{component.name}</h4>
                    <p className="text-xs opacity-90">{component.use}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Estados com Menos Doação com animação */}
        <div
          ref={(el) => setRef(el, 4)}
          className="max-w-4xl mx-auto mb-12 lg:mb-16 opacity-0"
        >
          <div className="bg-white rounded-xl shadow-xl p-4 lg:p-6 transform hover:scale-102 transition-all">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-rose-600 to-red-700 p-2 rounded-full mb-3 sm:mb-0 animate-pulse-slow">
                <TrendingDown className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 sm:ml-3 text-center sm:text-left">
                Estados que Mais Precisam de Doadores
              </h2>
            </div>
            
            <div className="space-y-4">
              {estadosMenosDoacao.map((estado, idx) => (
                <div key={idx} className="border-b pb-4 last:border-b-0 transform hover:scale-105 transition-all">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                    <div>
                      <span className="text-lg lg:text-xl font-bold text-gray-800">{estado.estado}</span>
                      <span className="text-xs lg:text-sm text-gray-600 ml-2 sm:ml-3">
                        Pop: {estado.populacao}
                      </span>
                    </div>
                    <span className="text-lg lg:text-xl text-rose-600 font-bold">
                      {estado.porcentagem}%
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 lg:h-3 mr-3">
                      <div 
                        className="bg-gradient-to-r from-rose-500 to-red-600 h-2 lg:h-3 rounded-full transition-all duration-1000 animate-slide-right"
                        style={{ 
                          width: `${estado.porcentagem * 20}%`,
                          animationDelay: `${idx * 0.1}s`
                        }}
                      ></div>
                    </div>
                    <span className="text-xs lg:text-sm text-gray-600 font-semibold min-w-[80px] lg:min-w-[100px]">
                      {estado.doadores} doadores
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm lg:text-base text-gray-600 mb-1">
                <span className="font-bold text-rose-600">Meta da OMS:</span> 3% da população como doadores regulares
              </p>
              <p className="text-xs lg:text-sm text-gray-500">
                Estes estados ainda estão abaixo da metade da meta recomendada
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action com animação */}
        <div
          ref={(el) => setRef(el, 5)}
          className="max-w-4xl mx-auto mt-12 opacity-0"
        >
          <div className="bg-gradient-to-r from-rose-600 to-red-700 rounded-xl shadow-2xl p-6 lg:p-8 text-white text-center transform hover:scale-105 hover:rotate-1 transition-all">
            <h3 className="text-xl lg:text-2xl font-bold mb-3">
              Seja Você Também um Doador!
            </h3>
            <p className="text-sm lg:text-base mb-4 opacity-90">
              Sua história pode inspirar outras pessoas a salvar vidas
            </p>
            <button 
              onClick={() => {
                window.location.href = '/hemocentros';
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
              }}
              className="bg-white text-rose-600 px-6 lg:px-8 py-2 lg:py-3 rounded-full text-sm lg:text-base font-semibold hover:bg-rose-50 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
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