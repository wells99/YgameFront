'use client';
import { useState, useRef } from 'react';
import Lobby from '@/components/Lobby';
import GameBoard from '@/components/GameBoard';
import Modal from '@/components/Modal';
import ExodiaAnimation from '@/components/ExodiaAnimation';

export default function Home() {
  const [room, setRoom] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [myPlayerNumber, setMyPlayerNumber] = useState<number | null>(null);
  const [currentTurn, setCurrentTurn] = useState<number | null>(null);
  const [hand, setHand] = useState<string[]>([]);
  const [status, setStatus] = useState('');
  const [modal, setModal] = useState({ show: false, title: '', sub: '' });
  const [showAnimation, setShowAnimation] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);

  // Função modificada para suportar Reconexão/Retry
  const handleJoin = () => {
    const connect = () => {
      // Se já houver uma conexão tentando abrir, não criamos outra
      if (socketRef.current?.readyState === WebSocket.CONNECTING) return;

      const ws = new WebSocket('wss://ygame.onrender.com');

      ws.onopen = () => {
        console.log("Conectado ao servidor!");
        ws.send(JSON.stringify({ type: 'JOIN_ROOM', room }));
        setIsJoined(true);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'INITIAL_HAND') {
            setMyPlayerNumber(data.playerNumber);
            setHand(data.cards);
          }
          if (data.type === 'GAME_START' || data.type === 'NEXT_TURN') setCurrentTurn(data.turno);
          if (data.type === 'DRAWN_CARD') setStatus(`Puxou: ${data.card}`);

          if (data.type === 'WINNER') {
            setStatus("Puxou: CABEÇA DO EXODIA");
            setHand(prev => [...prev, "CABEÇA DO EXODIA"]);

            setTimeout(() => {
              setShowAnimation(true);
              setModal({ show: true, title: "VITÓRIA!", sub: "O Exodia foi invocado por você!" });
            }, 1000);
          }

          if (data.type === 'GAME_OVER') {
            setTimeout(() => {
              setShowAnimation(true);
              setModal({ show: true, title: "DERROTA!", sub: `Você foi obliterado!! ${data.winner} completou o Exodia.` });
            }, 500);
          }

          if (data.type === 'ERROR') {
            alert(data.msg);
            // Se a sala estiver cheia, não tentamos reconectar
            ws.close(1000); 
            window.location.reload();
          }
        } catch (e) {
          console.error("Erro ao processar mensagem:", e);
        }
      };

      /**
       * Lógica de Retry:
       * Se a conexão fechar por erro (servidor em cold start ou queda de rede),
       * tentamos reconectar após 3 segundos.
       */
      ws.onclose = (event) => {
        if (event.code !== 1000) { // 1000 significa fechamento normal
          console.log("Conexão perdida. Tentando reconectar em 3s...");
          setTimeout(() => connect(), 3000);
        }
      };

      ws.onerror = () => {
        ws.close(); // Força o disparo do onclose para executar o retry
      };

      socketRef.current = ws;
    };

    connect();
  };

  const handleDraw = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: 'DRAW' }));
    } else {
      console.warn("Socket não está aberto para enviar comandos.");
    }
  };

  return (
    <main className="bg-slate-950 min-h-screen flex items-center justify-center text-white font-sans">
      <ExodiaAnimation 
        show={showAnimation} 
        onClose={() => setShowAnimation(false)} 
      />

      {!isJoined ? (
        <Lobby room={room} setRoom={setRoom} onJoin={handleJoin} />
      ) : (
        <GameBoard
          room={room}
          currentTurn={currentTurn}
          myPlayerNumber={myPlayerNumber}
          hand={hand}
          onDraw={handleDraw}
          status={status}
        />
      )}

      <Modal
        show={modal.show}
        title={modal.title}
        sub={modal.sub}
      />
    </main>
  );
}