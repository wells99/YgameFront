export default function GameBoard({ room, currentTurn, myPlayerNumber, hand, onDraw, status }) {
  const hasCard = (name) => hand.includes(name);

  return (
    <div className="w-full max-w-2xl px-4 flex flex-col items-center p-4">
      <div className="flex justify-between w-full mb-6 items-center">
        <div className="text-slate-400 text-sm font-bold">SALA: <span className="text-yellow-500 text-lg">{room}</span></div>
        <div className={`px-4 py-1 rounded-full text-xs font-bold border uppercase ${currentTurn === myPlayerNumber ? 'bg-green-600 border-green-400 animate-pulse' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
          {currentTurn === myPlayerNumber ? "SEU TURNO" : "TURNO DO OPONENTE"}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className={`card-slot ${hasCard("Braço Esquerdo") ? "card-active" : ""}`}>Braço Esq</div>
        <div className={`card-slot border-red-900 font-bold ${hasCard("CABEÇA DO EXODIA") ? "card-active" : "bg-red-950/20"}`}>CABEÇA</div>
        <div className={`card-slot ${hasCard("Braço Direito") ? "card-active" : ""}`}>Braço Dir</div>
        <div className={`card-slot ${hasCard("Perna Esquerda") ? "card-active" : ""}`}>Perna Esq</div>
        <div className="flex items-center justify-center font-black text-yellow-500 tracking-tighter italic font-serif">YOU</div>
        <div className={`card-slot ${hasCard("Perna Direito") ? "card-active" : ""}`}>Perna Dir</div>
      </div>

      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col items-center w-64 shadow-2xl">
        <div className={`w-24 h-36 bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl mb-4 border-2 border-blue-400 shadow-lg flex items-center justify-center ${currentTurn === myPlayerNumber ? 'ring-4 ring-yellow-500' : ''}`}>
          <span className="text-3xl opacity-50">🐉</span>
        </div>
        <button 
          disabled={currentTurn !== myPlayerNumber}
          onClick={onDraw}
          className="w-full py-3 rounded-xl font-black uppercase tracking-widest disabled:opacity-30 disabled:bg-slate-700 bg-yellow-600 hover:bg-yellow-500 shadow-lg transition-all"
        >
          Puxar Carta
        </button>
        <p className="mt-4 text-[10px] text-slate-500 font-mono text-center h-4">{status}</p>
      </div>
    </div>
  );
}