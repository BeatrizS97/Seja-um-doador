// src/components/BloodDonationAnimation.jsx

import React, { useState, useEffect } from 'react';

const BloodDonationAnimation = () => {
  const [bloodLevel, setBloodLevel] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setBloodLevel(prev => {
        if (prev <= 20) return 100;
        return prev - 0.3;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const bloodHeight = (bloodLevel / 100) * 90;

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl p-4 mx-auto overflow-hidden">
      {/* SVG - Bolsa e Tubo Flexível */}
      <svg 
        viewBox="0 0 600 500" 
        className="w-full h-full absolute inset-0 z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bloodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7f1d1d" />
            <stop offset="50%" stopColor="#991b1b" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>

          <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.3">
              <animate attributeName="offset" values="0;1;0" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#dc2626" stopOpacity="1">
              <animate attributeName="offset" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.3">
              <animate attributeName="offset" values="1;0;1" dur="2s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>

        {/* Tubo FLEXÍVEL */}
        <g id="flexible-tube">
          <path
            d="M 80,165 C 150,220 350,230 500,240"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          <path
            d="M 80,165 C 150,220 350,230 500,240"
            fill="none"
            stroke="url(#flowGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          <g transform="translate(505, 240) rotate(90)">
            <ellipse cx="0" cy="0" rx="8" ry="6" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1.5" />
            <rect x="-6" y="-7" width="12" height="5" fill="#60a5fa" rx="2" />
            <line x1="0" y1="1" x2="0" y2="12" stroke="#6b7280" strokeWidth="2" />
            <polygon points="-1,12 1,12 0,14" fill="#374151" />
            <path d="M -6,-1 L -12,0 L -6,1" fill="#60a5fa" />
            <path d="M 6,-1 L 12,0 L 6,1" fill="#60a5fa" />
          </g>
        </g>

        {/* Bolsa de Sangue */}
        <g id="blood-bag" transform="translate(-50, 0)">
          <line x1="130" y1="0" x2="130" y2="30" stroke="#6b7280" strokeWidth="3"/>
          <path d="M 120,30 Q 120,20 130,20 Q 140,20 140,30" fill="none" stroke="#6b7280" strokeWidth="3"/>

          <path
            d="M 90,35 L 90,150 Q 90,165 105,165 L 155,165 Q 170,165 170,150 L 170,35 Z"            
            fill="#fee2e2"
            stroke="#dc2626"
            strokeWidth="2"
          />
          
          <g>
            <rect
              x="95"
              y={160 - bloodHeight}
              width="70"
              height={bloodHeight}
              fill="url(#bloodGrad)"
              className="transition-all duration-200"
            />
            <ellipse 
              cx="130" 
              cy={160 - bloodHeight} 
              rx="30" 
              ry="5" 
              fill="#991b1b" 
              opacity="0.6"
            >
              <animate attributeName="ry" values="5;7;5" dur="2s" repeatCount="indefinite" />
            </ellipse>
          </g>
          
          <ellipse cx="115" cy="80" rx="15" ry="25" fill="#fff" opacity="0.2"/>
          
          <rect x="105" y="95" width="50" height="35" fill="#fff" rx="4"/>
          <text x="130" y="107" textAnchor="middle" fontSize="9" fill="#dc2626" fontWeight="bold">TIPO</text>
          <text x="130" y="122" textAnchor="middle" fontSize="14" fill="#dc2626" fontWeight="bold">O+</text>
          
          <text x="130" y="145" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">
            {Math.floor(bloodLevel)}%
          </text>
        </g>
      </svg>

      {/* IMAGEM DO BRAÇO - RESPONSIVA */}
      <div className="absolute bottom-0 right-0 w-[90%] sm:w-[80%] md:w-[70%] h-[280px] sm:h-[300px] md:h-[320px] z-20">
        <img 
          src="/arm-donation.png" 
          alt="Braço doando sangue" 
          className="w-full h-full object-contain opacity-85"
          style={{ 
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))',
            transform: 'translateY(-15px) translateX(-20px) scale(0.95)'
          }}
        />
      </div>

      {/* Texto indicador */}
      <div className="absolute bottom-6 left-0 right-0 text-center z-30">
        <p className="text-sm sm:text-base font-bold text-rose-600 animate-pulse-slow drop-shadow-lg">
          Doando Vida ❤️
        </p>
      </div>
    </div>
  );
};

export default BloodDonationAnimation;