import React from 'react';
import { Home, AlertCircle, Users, MapPin, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import HeartBeat from './HeartBeat';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/cuidados', label: 'Cuidados', icon: AlertCircle },
    { path: '/historias', label: 'Histórias', icon: Users },
    { path: '/hemocentros', label: 'Hemocentros', icon: MapPin },
    { path: '/doacao', label: 'Metas de Doações', icon: Heart }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-rose-600">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo e Nome */}
          <Link to="/" className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
            <HeartBeat size="small" />
            <div className="flex flex-col">
              <span className="text-xl lg:text-2x1 font-bold bg-gradient-to-r from-rose-600 to-red-700 bg-clip-text text-transparent">
                Doe Vida
              </span>
              <span className="text-xs text-gray-600 -mt-0.5">Rodrigo e Natalha vivem em nós</span>
            </div>
          </Link>
          
          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-3 lg:space-x-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1.5 px-4 py-3 rounded-lg font-semibold transition-all text-sm ${
                  location.pathname === path
                    ? 'bg-gradient-to-r from-rose-600 to-red-700 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-rose-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden flex space-x-2">
            {navItems.map(({ path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`p-3 rounded-lg transition-all ${
                  location.pathname === path
                    ? 'bg-gradient-to-r from-rose-600 to-red-700 text-white'
                    : 'text-gray-700 hover:bg-rose-50'
                }`}
              >
                <Icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;