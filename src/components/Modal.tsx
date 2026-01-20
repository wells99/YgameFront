interface ModalProps {
  show: boolean;
  title: string;
  sub: string;
}

export default function Modal({ show, title, sub }: ModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border-2 border-yellow-500 p-8 rounded-3xl text-center max-w-xs w-full shadow-[0_0_50px_rgba(234,179,8,0.3)]">
        <h2 className="text-3xl font-black text-yellow-500 mb-2 italic">
          {title}
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          {sub}
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
        >
          SAIR DA SALA
        </button>
      </div>
    </div>
  );
}