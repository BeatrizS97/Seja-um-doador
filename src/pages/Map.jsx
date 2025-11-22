// src/pages/Map.jsx
import React, { useState } from 'react';
import { MapPin, Search, Phone, Navigation, AlertCircle } from 'lucide-react';
import { hemocentros, cidadesParaEstado } from '../data/hemocentros';
import { findNearestHemocentros } from '../utils/searchHelper';
import Button from '../components/Button';

const Map = () => {
  const [city, setCity] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedState, setSelectedState] = useState('all');
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    if (!city) {
      setSearchResults([]);
      setNoResults(false);
      return;
    }
    
    const searchTerm = city.toLowerCase().trim();
    
    // BUSCA INTELIGENTE com distância real
    const nearestResults = findNearestHemocentros(searchTerm, hemocentros);
    
    if (nearestResults && nearestResults.length > 0) {
      setSearchResults(nearestResults);
      setNoResults(false);
      return;
    }

    // Se não encontrou por coordenadas, busca pelo estado
    const estadoDaCidade = cidadesParaEstado[searchTerm];
    
    if (estadoDaCidade && hemocentros[estadoDaCidade]) {
      const results = hemocentros[estadoDaCidade].slice(0, 2).map(center => ({
        ...center,
        state: estadoDaCidade
      }));
      setSearchResults(results);
      setNoResults(false);
    } else {
      setSearchResults([]);
      setNoResults(true);
    }
  };

  const filteredHemocentros = selectedState === 'all' 
    ? hemocentros 
    : { [selectedState]: hemocentros[selectedState] };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50 py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 animate-fade-in">
          <div className="bg-gradient-to-br from-rose-600 to-red-700 w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <MapPin className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-4">
            Hemocentro Perto de Mim
          </h1>
          <p className="text-lg lg:text-xl text-gray-600">
            Encontre o local mais próximo para doar
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 animate-slide-up">
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Digite sua cidade... (ex: Itanhaém, Santos, São Paulo)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 px-4 lg:px-6 py-3 lg:py-4 border-2 border-gray-300 rounded-xl text-base lg:text-lg focus:border-rose-500 focus:outline-none transition-all"
              />
              <Button
                onClick={handleSearch}
                variant="primary"
                size="large"
                icon={Search}
                className="w-full sm:w-auto"
              >
                Buscar
              </Button>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              💡 Nossa busca inteligente calcula a distância real e mostra os 2 hemocentros mais próximos de você!
            </p>
          </div>
        </div>

        {/* No Results Message */}
        {noResults && (
          <div className="max-w-2xl mx-auto mb-12 animate-fade-in">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-yellow-800 mb-2">
                    Nenhum hemocentro encontrado para "{city}"
                  </h3>
                  <p className="text-yellow-700 mb-2">
                    Não encontramos hemocentros nesta localidade. 
                  </p>
                  <p className="text-yellow-600 text-sm">
                    Dica: Tente buscar pela cidade mais próxima ou veja a lista completa abaixo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="max-w-4xl mx-auto mb-16 animate-slide-up">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <Navigation className="w-6 h-6 lg:w-8 lg:h-8 text-rose-600 mr-3" />
              Hemocentros Mais Próximos
            </h2>
            <p className="text-gray-600 mb-6 ml-11">
              Encontramos {searchResults.length} hemocentro(s) perto de você
            </p>
            <div className="space-y-6">
              {searchResults.map((center, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 hover:shadow-2xl transition-all transform hover:scale-102 border-2 border-rose-200"
                >
                  <div className="flex flex-col sm:flex-row items-start">
                    <div className="bg-gradient-to-br from-rose-600 to-red-700 rounded-full w-16 h-16 flex items-center justify-center text-white flex-shrink-0 mb-4 sm:mb-0">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <div className="sm:ml-6 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                          {center.name}
                        </h3>
                        {idx === 0 && (
                          <span className="bg-rose-100 text-rose-700 text-xs font-bold px-3 py-1 rounded-full">
                            MAIS PRÓXIMO
                          </span>
                        )}
                      </div>
                      
                      {/* Distância */}
                      {center.distance && (
                        <div className="mb-3 flex items-center text-rose-600 font-bold">
                          <Navigation className="w-5 h-5 mr-2" />
                          <span className="text-lg">{center.distance} km de distância</span>
                        </div>
                      )}
                      
                      <div className="space-y-2 text-gray-600">
                        <p className="flex items-start">
                          <MapPin className="w-5 h-5 mr-2 text-rose-600 flex-shrink-0 mt-1" />
                          <span>
                            {center.city} - {center.state}
                            {center.district && ` • ${center.district}`}
                          </span>
                        </p>
                        <p className="text-gray-700 ml-7 font-medium">{center.address}</p>
                        <p className="flex items-center ml-7">
                          <Phone className="w-5 h-5 mr-2 text-rose-600" />
                          <a 
                            href={`tel:${center.phone}`}
                            className="text-rose-600 font-semibold text-lg hover:underline"
                          >
                            {center.phone}
                          </a>
                        </p>
                      </div>
                      <div className="mt-4 ml-7">
                        <a
                          href={`https://www.google.com/maps/search/${encodeURIComponent(center.name + ' ' + center.city)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-rose-600 hover:text-rose-700 font-semibold"
                        >
                          <Navigation className="w-4 h-4 mr-1" />
                          Como Chegar (Google Maps)
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* State Filter */}
        <div className="max-w-6xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Ou navegue por Estado:
          </h3>
          <div className="flex flex-wrap gap-2 lg:gap-3 justify-center">
            <button
              onClick={() => setSelectedState('all')}
              className={`px-3 lg:px-4 py-2 rounded-lg font-semibold transition-all text-sm lg:text-base ${
                selectedState === 'all'
                  ? 'bg-rose-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-rose-50'
              }`}
            >
              Todos
            </button>
            {Object.keys(hemocentros).sort().map((state) => (
              <button
                key={state}
                onClick={() => setSelectedState(state)}
                className={`px-3 lg:px-4 py-2 rounded-lg font-semibold transition-all text-sm lg:text-base ${
                  selectedState === state
                    ? 'bg-rose-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-rose-50'
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </div>

        {/* All Hemocentros List */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-8 text-center">
            {selectedState === 'all' 
              ? 'Todos os Hemocentros do Brasil' 
              : `Hemocentros - ${selectedState}`}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {Object.entries(filteredHemocentros).sort().map(([state, centers]) => (
              <div key={state} className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 transform hover:scale-102 transition-all">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6 border-b-4 border-rose-500 pb-3">
                  {state}
                </h3>
                <div className="space-y-6">
                  {centers.map((center, idx) => (
                    <div 
                      key={idx} 
                      className="border-l-4 border-rose-500 pl-4 py-2 hover:bg-rose-50 transition-all rounded-r-lg"
                    >
                      <h4 className="font-bold text-base lg:text-lg text-gray-800 mb-1">
                        {center.name}
                      </h4>
                      <p className="text-sm lg:text-base text-gray-600 mb-1">
                        {center.city}
                        {center.district && ` • ${center.district}`}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">{center.address}</p>
                      <a 
                        href={`tel:${center.phone}`}
                        className="text-rose-600 font-semibold hover:underline flex items-center text-sm lg:text-base"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        {center.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="max-w-4xl mx-auto mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gradient-to-r from-rose-600 to-red-700 rounded-2xl shadow-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-center">
              Antes de Ir ao Hemocentro
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <h4 className="font-bold text-lg lg:text-xl mb-3">📋 Leve com você:</h4>
                <ul className="space-y-2 text-sm lg:text-base">
                  <li>• Documento oficial com foto</li>
                  <li>• Esteja bem alimentado</li>
                  <li>• Tenha dormido bem</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <h4 className="font-bold text-lg lg:text-xl mb-3">⏰ Horários:</h4>
                <ul className="space-y-2 text-sm lg:text-base">
                  <li>• Ligue antes para confirmar</li>
                  <li>• Alguns funcionam aos sábados</li>
                  <li>• Chegue com antecedência</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;