import React,{ useState, useEffect }  from 'react';
import "../Game/Game.css"
import Cell from '../Cell/Cell';


function Game({ socket, username, room }) {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", "",]);// 3*3 grids = 9 states.
  const [canPlay, setCanPlay] = useState(true);


  const cellClick = (e) => {
    const id = e.currentTarget.id;
    if (canPlay && board[id] === "") {
      const currentRound = {
        room:room,
        author: username,
        id: id
      }
      socket.emit("play", currentRound);
      setBoard((data) => ({ ...data, [id]: "X" }));
      setCanPlay(false);
    }
    if (
      (board[0] === "X" && board[1] === "X" && board[2] === "X") ||
      (board[0] === "O" && board[1] === "O" && board[2] === "O")
    ) {
      setBoard(["", "", "", "", "", "", "", "", ""]);
    }
  }

  useEffect(() => {
    socket.on("updateGame", (data) => {
      console.log("me",username)
      console.log("upadate at :", data);
      setBoard((data) => ({ ...data, [data.id]: "O" }));
      
      setCanPlay(true);
    })

    return () => {
      console.log("sockte off with!!!", username)
      socket.off("updateGame");
    }
  });

  return (
    <div>
      <p>Now is {username} tern</p>
      <div className='main'>
      <section className="main-section">
        <Cell cellClick={cellClick} id={"0"} text={board[0]} />
        <Cell cellClick={cellClick} id={"1"} text={board[1]} />
        <Cell cellClick={cellClick} id={"2"} text={board[2]} />

        <Cell cellClick={cellClick} id={"3"} text={board[3]} />
        <Cell cellClick={cellClick} id={"4"} text={board[4]} />
        <Cell cellClick={cellClick} id={"5"} text={board[5]} />

        <Cell cellClick={cellClick} id={"6"} text={board[6]} />
        <Cell cellClick={cellClick} id={"7"} text={board[7]} />
        <Cell cellClick={cellClick} id={"8"} text={board[8]} />
      </section>
    </div>
    </div>
    
  )
}

export default Game