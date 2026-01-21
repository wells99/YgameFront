'use client';

interface ExodiaAnimationProps {
  show: boolean;
  onClose: () => void;
}

export default function ExodiaAnimation({ show, onClose }: ExodiaAnimationProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      {/* Botão de Fechar */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 text-white border border-white/30 px-4 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-widest"
      >
        Pular Animação ✕
      </button>

      {/* Vídeo do Ataque */}
      <video 
        autoPlay 
        className="w-full h-full object-contain"
        onEnded={onClose} // Fecha automaticamente quando o vídeo acabar
      >
        <source src="/video.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>
    </div>
  );
}