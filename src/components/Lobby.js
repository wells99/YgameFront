export default function Lobby({ room, setRoom, onJoin }) {
  return (
    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-md">
      <h1 className="text-2xl font-black text-center mb-6 text-yellow-500 uppercase italic">Ygame Online</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Código da Sala</label>
          <input 
            type="text" 
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Ex: 123" 
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500"
          />
        </div>
        <button 
          onClick={onJoin}
          className="w-full bg-yellow-600 hover:bg-yellow-500 font-bold py-3 rounded-lg transition-all transform active:scale-95 shadow-lg shadow-yellow-900/20"
        >
          ENTRAR NA PARTIDA
        </button>

        {/* Descrição resumida das regras */}
        <div className="pt-4 border-t border-slate-800 mt-2">
          <div className="text-white text-[11px] text-left space-y-1 font-medium leading-tight opacity-60 uppercase tracking-wider">
            <p>• Entre na mesma sala de um amigo</p>
            <p>• Puxe cartas em cada turno</p>
            <p>• Colete as 5 partes do Exodia</p>
            <p>• A cabeça invoca a vitória imediata</p>
          </div>
        </div>
      </div>
    </div>
  );
}