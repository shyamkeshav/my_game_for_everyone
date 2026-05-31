import React, { useState } from 'react';
import { RefreshCw, Trophy, User, Zap } from 'lucide-react';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ x: 0, o: 0, ties: 0 });

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  const calculateWinner = (squares) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: combo };
      }
    }
    return null;
  };

  const winInfo = calculateWinner(board);
  const winner = winInfo?.winner;
  const winningLine = winInfo?.line || [];
  const isTie = !winner && board.every((square) => square !== null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    
    const nextWinInfo = calculateWinner(newBoard);
    if (nextWinInfo) {
      setScores(prev => ({ ...prev, [nextWinInfo.winner.toLowerCase()]: prev[nextWinInfo.winner.toLowerCase()] + 1 }));
    } else if (!nextWinInfo && newBoard.every((sq) => sq !== null)) {
      setScores(prev => ({ ...prev, ties: prev.ties + 1 }));
    }

    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-height-screen p-4 select-none">
      {/* Header Container */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-5xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500 flex items-center justify-center gap-2">
          <Zap className="text-cyan-400 fill-cyan-400 animate-pulse" size={36} />
          X-O-X ARENA
        </h1>
        <p className="text-slate-400 mt-2 text-sm uppercase tracking-widest font-medium">Cyberpunk Edition</p>
      </div>

      {/* Scoreboard Metadata Layout */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-6 text-center">
        <div className="bg-slate-800/60 border border-cyan-500/30 rounded-xl p-3 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-1 text-cyan-400 font-semibold text-xs uppercase">
            <User size={14} /> Player X
          </div>
          <p className="text-2xl font-black text-white mt-1">{scores.x}</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-3 backdrop-blur-sm">
          <div className="text-slate-400 font-semibold text-xs uppercase">Ties</div>
          <p className="text-2xl font-black text-white mt-1">{scores.ties}</p>
        </div>
        <div className="bg-slate-800/60 border border-rose-500/30 rounded-xl p-3 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-1 text-rose-400 font-semibold text-xs uppercase">
            <User size={14} /> Player O
          </div>
          <p className="text-2xl font-black text-white mt-1">{scores.o}</p>
        </div>
      </div>

      {/* Status Bar */}
      <div className="mb-6 h-8 text-center">
        {winner ? (
          <div className="flex items-center gap-2 text-xl font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-6 py-1 rounded-full animate-bounce">
            <Trophy size={18} /> Winner: {winner}
          </div>
        ) : isTie ? (
          <div className="text-xl font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-6 py-1 rounded-full">
            It's a Stalemate!
          </div>
        ) : (
          <div className="text-lg font-medium text-slate-300">
            Next Turn:{' '}
            <span className={`font-black ${isXNext ? 'text-cyan-400' : 'text-rose-400'}`}>
              {isXNext ? 'X' : 'O'}
            </span>
          </div>
        )}
      </div>

      {/* Active Interactive Game Grid */}
      <div className="grid grid-cols-3 gap-3 p-3 bg-slate-900/80 border border-slate-700/50 rounded-2xl shadow-2xl shadow-indigo-950/50 w-full max-w-md aspect-square">
        {board.map((square, index) => {
          const isWinningSquare = winningLine.includes(index);
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`
                relative text-5xl font-black rounded-xl transition-all duration-200 ease-out outline-none
                ${!square && !winner ? 'hover:bg-slate-800/50 hover:scale-[1.02] cursor-pointer' : 'cursor-default'}
                ${isWinningSquare 
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 scale-[0.98]' 
                  : 'bg-slate-800/30 border border-slate-700/40 text-slate-200'}
              `}
            >
              <span className={`
                transition-all duration-300 transform inline-block
                ${square ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
                ${square === 'X' && !isWinningSquare ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]' : ''}
                ${square === 'O' && !isWinningSquare ? 'text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.4)]' : ''}
              `}>
                {square}
              </span>
            </button>
          );
        })}
      </div>

      {/* Controller Buttons */}
      <button
        onClick={resetGame}
        className="mt-8 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-95 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-150 tracking-wide cursor-pointer"
      >
        <RefreshCw size={18} />
        Reset Arena
      </button>
    </div>
  );
}

export default App;