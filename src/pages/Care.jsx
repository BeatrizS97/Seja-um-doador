// src/pages/Care.jsx
import React from 'react';
import { Calendar, Heart, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { careTips, eligibility, donationFacts } from '../data/statistics';

const Care = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50 py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <h1 className="text-3xl lg:text-5xl font-bold text-center text-gray-800 mb-12 lg:mb-16">
          Cuidados e Orientações
        </h1>
        
        {/* Antes e Depois da Doação */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto mb-16 lg:mb-20">
          {/* Antes da Doação */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-10">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-rose-500 to-red-600 p-3 rounded-full">
                <Calendar className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 ml-4">Antes de Doar</h2>
            </div>
            
            <ul className="space-y-4">
              {careTips.before.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-rose-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-base lg:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Depois da Doação */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-10">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-red-600 to-rose-700 p-3 rounded-full">
                <Heart className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 ml-4">Após Doar</h2>
            </div>
            
            <ul className="space-y-4">
              {careTips.after.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-rose-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-base lg:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quem Pode Doar */}
        <div className="max-w-6xl mx-auto mb-16 lg:mb-20">
          <div className="bg-gradient-to-r from-rose-600 to-red-700 rounded-2xl shadow-xl p-6 lg:p-10 text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center">Quem Pode Doar?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Requisitos */}
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <h3 className="text-xl lg:text-2xl font-semibold mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 mr-2" /> 
                  Requisitos Básicos
                </h3>
                <ul className="space-y-3 text-base lg:text-lg">
                  {eligibility.requirements.map((req, idx) => (
                    <li key={idx}>• {req}</li>
                  ))}
                </ul>
              </div>

              {/* Impedimentos Temporários */}
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <h3 className="text-xl lg:text-2xl font-semibold mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 lg:w-6 lg:h-6 mr-2" /> 
                  Impedimentos Temporários
                </h3>
                <ul className="space-y-3 text-base lg:text-lg">
                  {eligibility.temporaryImpediments.slice(0, 6).map((imp, idx) => (
                    <li key={idx}>• {imp}</li>
                  ))}
                </ul>
              </div>

              {/* Impedimentos Permanentes */}
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <h3 className="text-xl lg:text-2xl font-semibold mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 lg:w-6 lg:h-6 mr-2" /> 
                  Impedimentos Permanentes
                </h3>
                <ul className="space-y-3 text-base lg:text-lg">
                  {eligibility.permanentImpediments.map((imp, idx) => (
                    <li key={idx}>• {imp}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Fatos sobre Doação */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-10">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-br from-rose-500 to-red-600 p-3 rounded-full">
                <Info className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 ml-4">
                Informações Importantes
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {donationFacts.map((fact, idx) => (
                <div 
                  key={idx}
                  className="border-l-4 border-rose-500 pl-4 py-2 bg-rose-50 rounded-r-lg"
                >
                  <p className="text-gray-700 text-base lg:text-lg">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-rose-600 to-red-700 rounded-2xl shadow-2xl p-8 lg:p-12 text-white text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Pronto para Doar?
            </h3>
            <p className="text-lg lg:text-xl mb-6 opacity-90">
              Agora que você já sabe tudo sobre a doação, que tal encontrar o hemocentro mais próximo?
            </p>
            <button 
              onClick={() => window.location.href = '/hemocentros'}
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

export default Care;