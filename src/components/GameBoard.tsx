'use client';
import { useEffect, useState } from 'react';

interface GameBoardProps {
  room: string;
  currentTurn: number | null;
  myPlayerNumber: number | null;
  hand: string[];
  onDraw: () => void;
  status: string;
}

export default function GameBoard({ room, currentTurn, myPlayerNumber, hand, onDraw, status }: GameBoardProps) {
  const [lastDrawnCard, setLastDrawnCard] = useState<string | null>(null);
  const [triggerAnim, setTriggerAnim] = useState(false);

  // Mapeamento de nomes para arquivos na pasta public
  const cardMap: Record<string, string> = {
    "CABEÇA DO EXODIA": "/card-3",
    "Perna Esquerda": "/card-1",
    "Braço Esquerdo": "/card-2",
    "Braço Direito": "/card-4",
    "Perna Direito": "/card-5",
    "Mago Negro": "/MAGONEGRO",
    "Dragão Branco de Olhos Azuis": "/DRAGAO-BRANCO",
    "Dragão Negro de Olhos Vermelhos": "/DRAGAO-NEGRO",
    "Maga Negra": "/MAGA-NEGRA",
    "Obelisco, o Atormentador": "/Obelisco",
    "Slifer, o Dragão do Céu": "/Slifer",
    "O Dragão Alado de Rá": "/RA",
    "Força Espelho": "/ForCa-Espelho",
    "Herói Elementar Neos": "/Neos",
    "Cyber Dragão": "/CYBER-DRAGON",
    "Kuriboh": "/Kuriboh"
  };

  // Detecta quando uma nova carta é puxada para disparar a animação
  useEffect(() => {
    if (status.startsWith("Puxou: ")) {
      const cardName = status.replace("Puxou: ", "");
      setLastDrawnCard(cardName);
      setTriggerAnim(true);
      const timer = setTimeout(() => setTriggerAnim(false), 500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const isMyTurn = currentTurn === myPlayerNumber;

  return (
    <div className="relative w-full h-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black flex flex-col items-center justify-between p-4 overflow-hidden">
      
      {/* OPONENTE (TOPO) */}
      <div className="flex flex-col items-center opacity-60">
        <div className="bg-red-900/20 border border-red-500 px-4 py-1 rounded-t-lg text-xs font-bold text-red-400">
          JOGADOR {myPlayerNumber === 0 ? "2" : "1"} (OPONENTE)
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <img key={i} src="/back.jpg" className="w-12 h-18 rounded-sm shadow-md brightness-75" alt="card-back" />
          ))}
        </div>
      </div>

      {/* CAMPO CENTRAL (STATUS) */}
      <div className="flex flex-col items-center">
        <div className={`mb-4 px-6 py-2 rounded-full border-2 transition-all duration-500 ${isMyTurn ? 'bg-green-600/20 border-green-500 text-green-400 animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-slate-800/50 border-slate-700 text-slate-500'}`}>
          <span className="text-sm font-black uppercase tracking-widest">
            {currentTurn === null ? "Aguardando Conexão..." : (isMyTurn ? "SEU TURNO" : "TURNO DO ADVERSÁRIO")}
          </span>
        </div>
        <div className="text-slate-500 text-[10px] font-mono uppercase tracking-tighter">SALA: {room}</div>
      </div>

      {/* DECK E MÃO (BASE) */}
      <div className="w-full max-w-4xl flex items-end justify-center gap-8 relative pb-4">
        
        {/* MÃO DO JOGADOR */}
        <div className="flex items-end -space-x-4 bg-black/40 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
          {/* Peças fixas à esquerda */}
          <img src="/card-1" className="w-24 h-36 rounded-md shadow-2xl transition-transform hover:-translate-y-4" alt="Perna Esq" />
          <img src="/card-2" className="w-24 h-36 rounded-md shadow-2xl transition-transform hover:-translate-y-4" alt="Braço Esq" />
          
          {/* CARTA DINÂMICA (CENTRO) */}
          <div className="relative z-10 mx-4">
            <div className={`w-28 h-40 bg-slate-800 rounded-md border-2 border-yellow-500/50 overflow-hidden shadow-[0_0_25px_rgba(234,179,8,0.2)] ${triggerAnim ? 'animate-draw' : ''}`}>
               {lastDrawnCard ? (
                 <img src={cardMap[lastDrawnCard] || "/back.jpg"} className="w-full h-full object-cover" alt="Drawn Card" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-slate-600 text-[8px] text-center p-2">PUXE UMA CARTA</div>
               )}
            </div>
            {lastDrawnCard && <div className="absolute -top-6 left-0 w-full text-center text-[8px] font-bold text-yellow-500 bg-black/80 rounded py-0.5 uppercase tracking-widest">{lastDrawnCard}</div>}
          </div>

          {/* Peças fixas à direita */}
          <img src="/card-4" className="w-24 h-36 rounded-md shadow-2xl transition-transform hover:-translate-y-4" alt="Braço Dir" />
          <img src="/card-5" className="w-24 h-36 rounded-md shadow-2xl transition-transform hover:-translate-y-4" alt="Perna Dir" />
        </div>

        {/* DECK (DIREITA) */}
        <div className="flex flex-col items-center gap-2">
            <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">DECK</div>
            <button 
                onClick={onDraw}
                disabled={!isMyTurn}
                className={`group relative w-20 h-30 transition-all ${isMyTurn ? 'hover:scale-110 active:scale-95' : 'grayscale opacity-50 cursor-not-allowed'}`}
            >
                {/* Visual de "Pilha" de cartas */}
                <div className="absolute top-1 left-1 w-full h-full bg-blue-900 rounded-md border border-blue-400/30 shadow-md translate-x-1 translate-y-1"></div>
                <img src="/back.jpg" className={`relative w-full h-full rounded-md border-2 shadow-2xl transition-all ${isMyTurn ? 'border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 'border-slate-700'}`} alt="Deck" />
                
                {isMyTurn && (
                    <div className="absolute -inset-1 rounded-md bg-yellow-400/20 animate-pulse blur-sm"></div>
                )}
            </button>
            <div className="bg-slate-900 border border-slate-700 px-3 py-0.5 rounded text-[10px] font-bold text-slate-400 italic">JOGADOR {myPlayerNumber === 0 ? "1" : "2"}</div>
        </div>

      </div>
    </div>
  );
}