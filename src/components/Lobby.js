export default function Lobby({ room, setRoom, onJoin }) {
  return (
    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-md">
      <h1 className="text-2xl font-black text-center mb-6 text-yellow-500 uppercase italic">Exodia Online</h1>
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
          className="w-full bg-yellow-600 hover:bg-yellow-500 font-bold py-3 rounded-lg transition-all transform active:scale-95"
        >
          ENTRAR NA PARTIDA
        </button>
      </div>
    </div>
  );
}