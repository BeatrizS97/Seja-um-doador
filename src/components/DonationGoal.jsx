import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Heart, Users, TrendingUp, Sparkles, Clock, Calendar, Timer, Info, RotateCcw, BarChart3, CheckCircle, Droplet } from 'lucide-react';

// Componente de gráfico mensal que mostra evolução de doações ao longo do ano
const MonthlyChart = React.memo(({ monthlyData, showChart, setShowChart, donations }) => {
  // Calcula altura e cor de cada barra baseado na quantidade de doações
  const { barHeights, barColors } = useMemo(() => {
    // Define altura das barras em percentual
    const heights = monthlyData.map(item => {
      const percentage = (item.donations / 5) * 100;
      return item.donations > 0 ? percentage : 5;
    });
    // Define cor de cada barra conforme quantidade de doações
    const colors = monthlyData.map(item => {
      if (item.donations === 0) return 'from-gray-300 to-gray-200';
      if (item.donations <= 2) return 'from-red-300 to-red-400';
      if (item.donations <= 4) return 'from-red-500 to-red-600';
      return 'from-red-600 to-red-700';
    });
    return { barHeights: heights, barColors: colors };
  }, [JSON.stringify(monthlyData)]);

  return (
    <div className="mb-4 bg-white rounded-lg p-3 shadow-md border border-gray-100">
      <button
        // Botão para expandir/recolher o gráfico
        onClick={() => setShowChart(!showChart)}
        className="w-full flex items-center justify-between text-left hover:bg-red-50 transition-colors rounded-md p-2.5 group"
        aria-label={showChart ? 'Ocultar gráfico de evolução mensal' : 'Exibir gráfico de evolução mensal'}
      >
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-red-600 to-red-700 p-1.5 rounded-md shadow-sm group-hover:shadow-md transition-all">
            <BarChart3 className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-xs">Evolução Mensal {new Date().getFullYear() + 1}</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {showChart ? 'Clique para ocultar' : 'Acompanhe seu progresso'}
            </p>
          </div>
        </div>
        <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${showChart ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showChart && (
        <div className="mt-3 animate-fade-in">
          <div className="bg-gray-50 rounded-md p-3 border border-gray-100">
            <div className="grid grid-cols-12 gap-1 items-end h-24 mb-3">
              {monthlyData.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center justify-end h-full group cursor-pointer">
                  <div className="h-4 flex items-end justify-center mb-1">
                    {item.donations > 0 && (
                      <span className="text-[0.6rem] font-bold text-white bg-red-600 rounded-full px-1 py-0.5 shadow-sm">
                        {item.donations}
                      </span>
                    )}
                  </div>
                  
                  <div 
                    role="progressbar"
                    aria-valuenow={item.donations}
                    aria-valuemin="0"
                    aria-valuemax="5"
                    aria-label={`Doações em ${item.month}: ${item.donations}`}
                    className={`w-full bg-gradient-to-t ${barColors[idx]} rounded-t-sm transition-all duration-500 hover:brightness-90 hover:shadow-sm hover:scale-y-110 border-b border-red-300`}
                    style={{ 
                      height: `${barHeights[idx]}%`,
                      opacity: item.donations > 0 ? 1 : 0.4,
                      minHeight: '8px'
                    }}
                  >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                      <div className="bg-gray-900 text-white text-[0.6rem] py-0.5 px-1.5 rounded-sm shadow-md">
                        {item.donations} {item.donations === 1 ? 'doação' : 'doações'}
                      </div>
                    </div>
                  </div>
                  
                  <span className="text-[0.6rem] font-semibold text-gray-700 mt-1.5">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-2">
              <div className="flex items-center justify-center gap-1">
                <Droplet className="w-3 h-3 text-red-600" />
                <p className="text-[0.6rem] text-gray-700 font-medium">
                  Total em {new Date().getFullYear() + 1}:
                  <strong className="text-red-700 ml-1">{donations}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

// Componente principal que gerencia o rastreamento de doações e meta anual
const DonationGoal = () => {
  // Estados para controlar doações, datas e interface
  const [donations, setDonations] = useState(0);
  const [lastDonation, setLastDonation] = useState(null);
  const [canDonate, setCanDonate] = useState(true);
  const [daysUntilNext, setDaysUntilNext] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [justDonated, setJustDonated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [progressAnimation, setProgressAnimation] = useState(false);
  const [monthlyData, setMonthlyData] = useState([]);
  const [showChart, setShowChart] = useState(false);
  
  // Modo teste para desenvolvimento - permite meta menor
  // const TEST_MODE = true;
  const TEST_MODE = true;
  
  // Configurações e cálculos da meta
  const goal = TEST_MODE ? 1 : 500;
  const currentYear = new Date().getFullYear();
  const targetYear = currentYear + 1;
  const livesSaved = donations * 4; // Cada doação salva até 4 vidas
  const percentage = Math.min((donations / goal) * 100, 100); // Percentual da meta
  const COOLDOWN_DAYS = 60; // Dias de espera entre doações

  // Carrega dados salvos no localStorage ao inicializar
  useEffect(() => {
    // Recupera dados persistidos
    const savedDonations = localStorage.getItem('totalDonations');
    const savedLastDate = localStorage.getItem('lastDonationDate');
    const savedMonthly = localStorage.getItem('monthlyDonations');
    
    if (savedDonations) {
      setDonations(parseInt(savedDonations));
    }
    
    if (savedLastDate) {
      const lastDate = new Date(savedLastDate);
      setLastDonation(lastDate);
      checkCanDonate(lastDate); // Verifica se pode doar novamente
    }

    if (savedMonthly) {
      const parsed = JSON.parse(savedMonthly);
      // Se dados mensais estão incompletos, reinicializa
      if (parsed.length !== 12) {
        initializeMonthlyData();
      } else {
        setMonthlyData(parsed);
      }
    } else {
      initializeMonthlyData();
    }
  }, []);

  // Inicializa array com 12 meses e zero doações
  const initializeMonthlyData = () => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const data = months.map((month, i) => ({
      month,
      donations: 0,
      fullDate: new Date(targetYear, i, 1).toISOString()
    }));
    
    setMonthlyData(data);
    localStorage.setItem('monthlyDonations', JSON.stringify(data));
  };

  // Atualiza contador do mês atual quando uma doação é registrada
  const updateMonthlyData = () => {
    const now = new Date();
    // Obtém mês atual em português
    const currentMonth = now.toLocaleString('pt-BR', { month: 'short' });
    // Remove pontos e capitaliza primeira letra
    const monthKey = currentMonth.replace('.', '').charAt(0).toUpperCase() + currentMonth.replace('.', '').slice(1);
    
    // Incrementa contagem do mês atual
    const updatedData = monthlyData.map(item => {
      if (item.month === monthKey) {
        return { ...item, donations: item.donations + 1 };
      }
      return item;
    });
    
    setMonthlyData(updatedData);
    localStorage.setItem('monthlyDonations', JSON.stringify(updatedData));
  };

  // Verifica se já passou o período de cooldown (60 dias)
  const checkCanDonate = (lastDate) => {
    if (!lastDate) {
      setCanDonate(true);
      setDaysUntilNext(0);
      return;
    }

    const now = new Date();
    // Calcula diferença em dias entre última doação e hoje
    const diffTime = Math.abs(now - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays >= COOLDOWN_DAYS) {
      // Período de espera passou
      setCanDonate(true);
      setDaysUntilNext(0);
    } else {
      // Ainda precisa aguardar
      setCanDonate(false);
      setDaysUntilNext(COOLDOWN_DAYS - diffDays);
    }
  };

  // Gera partículas de confete para celebração da meta
  const generateConfetti = () => {
    // Paleta de cores para o confete
    const colors = ['#dc2626', '#991b1b', '#fee2e2', '#fecaca', '#fca5a5'];
    // Cria 100 partículas com propriedades aleatórias
    const pieces = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.2,
      duration: 4 + Math.random() * 2,
      rotation: Math.random() * 720,
      size: 4 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      swing: Math.random() * 40 - 20,
    }));
    setConfetti(pieces);
  };

  // Exibe notificação temporária na tela
  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    // Remove notificação após 4 segundos
    setTimeout(() => setShowToast(false), 4000);
  };

  // Registra uma nova doação e atualiza todos os dados
  const handleDonate = () => {
    // Valida se pode e se não atingiu meta
    if (!canDonate || donations >= goal) return;
    
    const now = new Date();
    const newTotal = donations + 1;
    
    // Atualiza contador
    setDonations(newTotal);
    setLastDonation(now);
    setCanDonate(false);
    
    // Persiste dados no localStorage
    localStorage.setItem('totalDonations', newTotal.toString());
    localStorage.setItem('lastDonationDate', now.toISOString());
    
    // Atualiza dados mensais e verifica cooldown
    updateMonthlyData();
    checkCanDonate(now);
    
    // Animações visuais
    setJustDonated(true);
    setTimeout(() => setJustDonated(false), 500);

    setProgressAnimation(true);
    setTimeout(() => setProgressAnimation(false), 1000);
    
    // Notificação
    showToastNotification('Doação registrada! Você salvou até 4 vidas!');
    
    // Mostra gráfico na primeira doação
    if (newTotal === 1) {
      setShowChart(true);
      setTimeout(() => {
        const chartEl = document.querySelector('[data-chart-container]');
        if (chartEl) chartEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
    
    // Celebração ao atingir meta
    if (newTotal === goal) {
      setShowCelebration(true);
      generateConfetti();
      showToastNotification(`META ALCANÇADA! ${livesSaved + 4} vidas salvas!`);
      // Remove celebração após 10 segundos
      setTimeout(() => {
        setShowCelebration(false);
        setConfetti([]);
      }, 10000);
    }
  };

  // Reseta o contador e todos os dados (para desenvolvimento/testes)
  const resetGoal = () => {
    if (window.confirm('Resetar todas as doações? Esta ação não pode ser desfeita.')) {
      // Limpa todos os estados
      setDonations(0);
      setLastDonation(null);
      setCanDonate(true);
      setDaysUntilNext(0);
      setShowCelebration(false);
      setConfetti([]);
      // Limpa localStorage
      localStorage.setItem('totalDonations', '0');
      localStorage.removeItem('lastDonationDate');
      // Reinicializa dados mensais
      initializeMonthlyData();
      showToastNotification('Contador resetado com sucesso');
    }
  };

  // Memoiza função para evitar re-renders desnecessários
  const memoizedSetShowChart = useCallback((value) => setShowChart(value), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-2 lg:p-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-white rounded-lg shadow-md p-4 lg:p-5 overflow-hidden border border-gray-100">
          
          {showToast && (
            <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-[100] animate-fade-in">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2.5 rounded-md shadow-md flex items-center gap-2 min-w-[240px] border border-green-400">
                <div className="bg-white/20 rounded-md p-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-xs">{toastMessage}</p>
                </div>
                <button 
                  onClick={() => setShowToast(false)}
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {showCelebration && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
              {confetti.map((piece) => (
                <div
                  key={piece.id}
                  className="absolute rounded-sm"
                  style={{
                    left: `${piece.left}%`,
                    top: '-5%',
                    width: `${piece.size}px`,
                    height: `${piece.size}px`,
                    backgroundColor: piece.color,
                    animation: `confetti ${piece.duration}s ease-out forwards`,
                    animationDelay: `${piece.delay}s`,
                    transform: `rotate(${piece.rotation}deg)`,
                    '--swing': `${piece.swing}px`
                  }}
                />
              ))}
            </div>
          )}

          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-gradient-to-br from-red-600 to-red-700 p-2 rounded-lg animate-pulse-slow shadow-md">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1.5">
              Meta de Doações {targetYear}
            </h1>
            <p className="text-gray-600 text-sm font-medium">
              Juntos pela vida: <strong className="text-red-700">{goal.toLocaleString()}</strong> doações
            </p>
            
            {TEST_MODE && (
              <div className="mt-2.5 inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-[0.6rem] font-semibold border border-blue-200">
                <Info className="w-3 h-3" />
                Modo Teste
              </div>
            )}
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-end mb-3">
              <div>
                <p className="text-gray-500 text-xs font-medium mb-0.5">Doações Realizadas</p>
                <p className="text-2xl lg:text-3xl font-bold text-red-700">{donations}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs font-medium mb-0.5">Objetivo</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-400">{goal}</p>
              </div>
            </div>
            
            <div className="relative h-7 bg-gray-100 rounded-full overflow-hidden shadow-sm border border-gray-200">
              <div
                className={`absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 via-red-500 to-red-700 rounded-full flex items-center justify-end pr-3 shadow-md ${
                  progressAnimation ? 'animate-progress-grow' : 'transition-all duration-1000 ease-out'
                }`}
                style={{ width: `${percentage}%` }}
              >
                {percentage > 20 && (
                  <span className="text-white font-bold text-xs drop-shadow-sm">
                    {percentage.toFixed(0)}%
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-md p-3 text-center shadow-sm hover:shadow-md transition-all border border-red-200">
              <Heart className="w-6 h-6 text-red-700 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900">{livesSaved}</p>
              <p className="text-[0.6rem] text-gray-700 font-semibold mt-0.5">Vidas Salvas</p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-md p-3 text-center shadow-sm hover:shadow-md transition-all border border-gray-200">
              <Users className="w-6 h-6 text-gray-700 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900">{goal - donations}</p>
              <p className="text-[0.6rem] text-gray-700 font-semibold mt-0.5">Restantes</p>
            </div>
          </div>

          {donations > 0 && (
            <div data-chart-container>
              <MonthlyChart 
                monthlyData={monthlyData} 
                showChart={showChart} 
                setShowChart={memoizedSetShowChart} 
                donations={donations} 
              />
            </div>
          )}

          {!canDonate && !showCelebration && (
            <div className="mb-5 bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-700 rounded-md p-3.5 shadow-sm">
              <div className="flex items-start gap-2">
                <div className="bg-red-700 rounded-md p-1.5 flex-shrink-0">
                  <Timer className="w-4 h-4 text-white" />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm mb-2.5">
                    Período de Recuperação
                  </h4>
                  
                  <div className="bg-white rounded-md p-2 mb-2.5 shadow-xs border border-red-200">
                    <p className="text-gray-600 text-xs mb-1.5">
                      Última doação registrada
                    </p>
                    <p className="text-red-700 font-bold text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {lastDonation?.toLocaleDateString('pt-BR', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>

                  <div className="bg-white rounded-md p-3 mb-2.5 shadow-xs border border-red-200">
                    <p className="text-gray-700 text-xs mb-1.5">
                      Próxima doação disponível em
                    </p>
                    <p className="text-red-700 font-bold text-xl">
                      {daysUntilNext} {daysUntilNext === 1 ? 'dia' : 'dias'}
                    </p>
                  </div>

                  <div className="border-t border-red-200 pt-2.5">
                    <div className="flex items-start gap-1 text-gray-700 text-[0.6rem]">
                      <Info className="w-3 h-3 text-red-700 flex-shrink-0 mt-0.5" />
                      <p>
                        <strong>Recomendação médica:</strong> Homens devem aguardar 60 dias e mulheres 90 dias entre doações.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!showCelebration ? (
            <>
              <button
                onClick={handleDonate}
                disabled={!canDonate || donations >= goal}
                className={`w-full py-3 rounded-md font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md mb-3 ${
                  !canDonate
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300'
                    : donations >= goal
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300'
                    : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] hover:from-red-700 hover:to-red-800'
                } ${justDonated ? 'animate-pulse' : ''}`}
              >
                {!canDonate ? (
                  <>
                    <Clock className="w-4 h-4" />
                    Aguarde {daysUntilNext} {daysUntilNext === 1 ? 'dia' : 'dias'}
                  </>
                ) : donations >= goal ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Meta Alcançada
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 fill-current" />
                    Registrar Doação
                  </>
                )}
              </button>

              {lastDonation && canDonate && (
                <p className="text-center text-xs text-gray-600 flex items-center justify-center gap-1 font-medium">
                  <Calendar className="w-3 h-3" />
                  Última doação: {lastDonation.toLocaleDateString('pt-BR')}
                </p>
              )}
            </>
          ) : (
            <div className="text-center py-7 bg-gradient-to-br from-amber-50 to-amber-100 rounded-md shadow-sm border border-amber-200 mb-3">
              <div className="bg-gradient-to-br from-amber-400 to-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce shadow-md">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-red-700 mb-2">
                Meta Alcançada!
              </h3>
              <p className="text-lg font-bold text-gray-900 mb-2">
                {livesSaved} vidas salvas
              </p>
              <p className="text-sm text-gray-700 flex items-center justify-center gap-1">
                <Heart className="w-4 h-4 text-red-700 fill-current" />
                Obrigado por salvar vidas
              </p>
            </div>
          )}

          {(donations > 0 || TEST_MODE) && (
            <button
              onClick={resetGoal}
              className="w-full py-2 text-xs text-gray-600 hover:text-gray-800 transition-all hover:bg-gray-100 rounded-md flex items-center justify-center gap-1 border border-gray-300 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              {TEST_MODE ? 'Resetar (Teste)' : 'Resetar Contador'}
            </button>
          )}

          <div className="text-center text-xs text-gray-600 mt-4 flex items-center justify-center gap-1 bg-gray-50 rounded-md p-2 border border-gray-200 font-medium">
            <Info className="w-3.5 h-3.5 text-red-700" />
            Cada doação registrada salva até 4 vidas
          </div>
        </div>
      </div>

      <style>{`
        // Animação de confete caindo e girando
        @keyframes confetti {
          0% {
            transform: translateY(-5%) translateX(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) translateX(var(--swing)) rotate(360deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(calc(var(--swing) * 1.5)) rotate(720deg);
            opacity: 0;
          }
        }

        // Pulsação lenta do ícone de coração no topo
        @keyframes pulse-slow {
          0%, 100% { 
            transform: scale(1); 
            opacity: 1;
          }
          50% { 
            transform: scale(1.05); 
            opacity: 0.85;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        // Animação de crescimento da barra de progresso
        @keyframes progress-grow {
          0% {
            transform: scaleX(0.95);
            filter: brightness(1);
          }
          50% {
            transform: scaleX(1.05);
            filter: brightness(1.15);
          }
          100% {
            transform: scaleX(1);
            filter: brightness(1);
          }
        }

        .animate-progress-grow {
          animation: progress-grow 0.6s ease-out;
          transform-origin: left center;
          transition: width 1s ease-out;
        }

        // Animação de fade in para gráfico
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DonationGoal;