'use client';
import { useState, useRef } from 'react';
import Lobby from '@/components/Lobby';
import GameBoard from '@/components/GameBoard';
import Modal from '@/components/Modal';

export default function Home() {
  const [room, setRoom] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [myPlayerNumber, setMyPlayerNumber] = useState<number | null>(null);
  const [currentTurn, setCurrentTurn] = useState<number | null>(null);
  const [hand, setHand] = useState<string[]>([]);
  const [status, setStatus] = useState('');
  const [modal, setModal] = useState({ show: false, title: '', sub: '' });

  const socketRef = useRef<WebSocket | null>(null);

  const handleJoin = () => {
    socketRef.current = new WebSocket('wss://ygame.onrender.com');
    socketRef.current.onopen = () => {
      socketRef.current?.send(JSON.stringify({ type: 'JOIN_ROOM', room }));
      setIsJoined(true);
    };
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'INITIAL_HAND') {
        setMyPlayerNumber(data.playerNumber);
        setHand(data.cards);
      }
      if (data.type === 'GAME_START' || data.type === 'NEXT_TURN') setCurrentTurn(data.turno);
      if (data.type === 'DRAWN_CARD') setStatus(`Puxou: ${data.card}`);

      if (data.type === 'WINNER') {
        // 1. Atualiza o status para disparar a animação no GameBoard
        setStatus("Puxou: CABEÇA DO EXODIA");
        // 2. Adiciona a carta à mão
        setHand(prev => [...prev, "CABEÇA DO EXODIA"]);

        // 3. Aguarda 1 segundo (tempo da animação + um fôlego) para mostrar o modal
        setTimeout(() => {
          setModal({ show: true, title: "VITÓRIA!", sub: "O Exodia foi invocado por você!" });
        }, 1000);
      }

      if (data.type === 'GAME_OVER') {
        // No caso de derrota, também é bom um pequeno delay para processar o que houve
        setTimeout(() => {
          setModal({ show: true, title: "DERROTA!", sub: `Você foi obliterado!! ${data.winner} completou o Exodia.` });
        }, 500);
      }

      if (data.type === 'ERROR') {
        alert(data.msg);
        window.location.reload();
      }
    };
  };

  const handleDraw = () => {
    socketRef.current?.send(JSON.stringify({ type: 'DRAW' }));
  };

  return (
    <main className="bg-slate-950 min-h-screen flex items-center justify-center text-white font-sans">
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