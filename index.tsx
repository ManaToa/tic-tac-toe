import { useState } from 'react'

export default function TicTacToe() {
  const [whoIsPlaying, setWhoIsPlaying] = useState<string>('X')
  const [winner, setWinner] = useState<boolean>(false)
  const [isDraw, setIsDraw] = useState<boolean>(false)
  const [game, setGame] = useState<string[]>(Array(9).fill(''))

  function handleClick(index: number) {
    const cpyGame = [...game]
    if (winner || cpyGame[index] !== '') return
    cpyGame[index] = whoIsPlaying
    checkForWinner(cpyGame)
    setGame(cpyGame)
  }

  function checkForWinner(cpyGame: string[]) {
    const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    const isWinning = winningPositions.some(winPos => {
      const values = cpyGame.filter((_, i) => winPos.includes(i))
      return values.filter(x => values[0] === x && x !== '').length === 3
    })
    if (isWinning) return setWinner(true)

    if (!isWinning && !cpyGame.includes('')) return setIsDraw(true)

    setWhoIsPlaying(whoIsPlaying === 'X' ? 'O' : 'X')
  }

  function resetGame() {
    setGame(Array(9).fill(''))
    setWinner(false)
    setWhoIsPlaying('X')
    setIsDraw(false)
  }

  return (
    <div className='w-[13rem] sm:w-[23rem] sm:h-[23rem] p-5 flex justify-center items-center bg-lightColor rounded-md shadow-xl'>
      <div>
        <h1 className=' text-2xl sm:text-3xl font-bold uppercase text-center'>
          {isDraw
            ? 'Égalité !'
            : `${whoIsPlaying} ${winner ? 'gagne la partie ! ' : 'joue'}`}
        </h1>
        <div className='my-6 mx-auto w-[12.2rem] h-[12.2rem] grid grid-cols-3 bg-ligthColorHover border-2 border-darkColor rounded-md overflow-hidden'>
          {Array(9)
            .fill('')
            .map((_, i) => (
              <div
                className={`hover:bg-ligthColorAlt p-4 w-[4rem] h-[4rem] grid place-content-center text-5xl font-bold border-2 border-darkColor ${
                  (i + 1) % 3 !== 0 && 'border-r-2'
                } ${i < 6 && 'border-b-2'} ${
                  winner || isDraw ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                key={i}
                onClick={() => handleClick(i)}
              >
                <span
                  className={`${
                    game[i] === 'X' ? 'text-mainColor' : 'text-darkColor'
                  }`}
                >
                  {game[i]}
                </span>
              </div>
            ))}
        </div>
        <button
          onClick={resetGame}
          className='block text-1xl font-bold uppercase text-center border bg-darkColor text-lightColor rounded-md hover:bg-mainColor p-2 mx-auto'
        >
          Recommencer
        </button>
      </div>
    </div>
  )
}
