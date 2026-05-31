import React, { useState } from 'react';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
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
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    // Deep dark purple-blue background to make neon pop
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#110B29] p-4 select-none font-sans">
      
      {/* Dynamic Header State */}
      <div className="mb-8 h-10 text-center flex items-center justify-center">
        {winner ? (
          <div className="text-3xl font-black text-white drop-shadow-[0_0_10px_#10B981] tracking-wider uppercase animate-pulse">
            Winner: Player {winner}
          </div>
        ) : isTie ? (
          <div className="text-3xl font-black text-white drop-shadow-[0_0_10px_#F59E0B] tracking-wider uppercase">
            Draw Match
          </div>
        ) : (
          <div className="text-xl font-bold text-slate-400 tracking-wide uppercase">
            Turn:{' '}
            <span className={`font-black ${isXNext ? 'text-[#FF2A6D] drop-shadow-[0_0_8px_#FF2A6D]' : 'text-[#05D9E8] drop-shadow-[0_0_8px_#05D9E8]'}`}>
              {isXNext ? 'X' : 'O'}
            </span>
          </div>
        )}
      </div>

      {/* The 3x3 Grid Matching the Image Design exactly */}
      {/* We use a solid dark background with a gap, and a white border around the wrapper to simulate those clean white dividers */}
      <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded-lg shadow-[0_0_30px_rgba(5,217,232,0.15)] w-full max-w-[340px] aspect-square">
        {board.map((square, index) => {
          const isWinningSquare = winningLine.includes(index);
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`
                relative bg-[#161031] text-6xl font-black transition-all duration-150 outline-none flex items-center justify-center rounded-sm
                ${!square && !winner ? 'hover:bg-[#211947] cursor-pointer' : 'cursor-default'}
                ${isWinningSquare ? 'bg-[#251b54]' : ''}
              `}
            >
              {/* Thick Neon Text Styling using text-shadow drop effects */}
              <span className={`
                transition-transform duration-200 transform font-sans font-extrabold leading-none tracking-tighter
                ${square ? 'scale-100 opacity-100' : 'scale-70 opacity-0'}
                ${square === 'X' ? 'text-white drop-shadow-[0_0_12px_#FF2A6D] [text-shadow:0_0_4px_#FF2A6D,0_0_15px_#FF2A6D]' : ''}
                ${square === 'O' ? 'text-white drop-shadow-[0_0_12px_#05D9E8] [text-shadow:0_0_4px_#05D9E8,0_0_15px_#05D9E8]' : ''}
              `}>
                {square}
              </span>

              {/* Vertical neon win overlay line effect across the whole match if column won */}
              {isWinningSquare && (
                <div className="absolute inset-0 bg-white/5 mix-blend-overlay border border-white/20 rounded-sm" />
              )}
            </button>
          );
        })}
      </div>

      {/* Control Option */}
      <button
        onClick={resetGame}
        className="mt-10 bg-[#1A123C] hover:bg-[#251B54] active:scale-95 text-white font-bold tracking-widest text-xs uppercase py-3.5 px-10 rounded-full border-2 border-white/20 transition-all cursor-pointer shadow-md shadow-black/40 hover:border-white/50"
      >
        Restart Battle
      </button>

    </div>
  );
}

export default App;