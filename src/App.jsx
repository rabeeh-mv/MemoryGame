
import { useEffect, useMemo } from "react";
import "./App.css";
import { useState } from "react";
import Confetti from 'react-confetti'

const gameicon = ["🥼", "🚗", "💻", "❤️", "🏍", "🍦",  "🌙", "🍔",'🌏'];
function App() {
  const [pieces, setPeces] = useState([]);

  const checkIfGameFinish = useMemo(()=>{
    if(pieces.length > 0 && pieces.every((piece)=> piece.solved)){
      return true;
    }
    return false;
  },[pieces])
  const startGame = () => {
    const duplicatGameIcon = [...gameicon, ...gameicon];
    const newGameIcon = [];

    // console.log(duplicatGameIcon);

    while (newGameIcon.length < gameicon.length *2 ) {
      const randomIndex = Math.floor(Math.random() * duplicatGameIcon.length);
      newGameIcon.push({
        emoji: duplicatGameIcon[randomIndex],
        flipped: false,
        solved: false,
        position: newGameIcon.length,
      });
      duplicatGameIcon.splice(randomIndex,1)
    }
    setPeces(newGameIcon);
  };
  useEffect(() => {
    startGame();
  }, []);
  
  const handilActive =(data)=>{
    const flippedData = pieces.filter(data=> data.flipped && !data.solved)
    if(flippedData.length === 2)return;
   const newpices = pieces.map(piece =>{
      if(piece.position === data.position){
        piece.flipped = !piece.flipped }
        return piece
      })
    
    setPeces(newpices)
  }
  
  const gameLogicForFlip = ()=>{
    const flippedData =pieces.filter(data=> data.flipped && !data.solved)
    
    if (flippedData.length === 2) {
      setTimeout(() => {
        if (flippedData[0].emoji === flippedData[1].emoji) {
          setPeces(
            pieces.map((piece)=>{
              if(piece.position === flippedData[0].position || 
                piece.position === flippedData[1].position
              ){
                piece.solved = true
              }
              return piece
            }
          )
          )
        }else{
          setPeces(
            pieces.map((piece)=>{
              if(piece.position === flippedData[0].position || 
                piece.position === flippedData[1].position
              ){
                piece.flipped = false
              }
              return piece
            })
          )
        }
      }, 800);
    }
   
  }

  useEffect(() => {
    gameLogicForFlip();
  
  }, [pieces]);
  return (
    <>
      <div className="main">
        <h1>Memory Game</h1>
        <div className="container">
          {pieces.map((data, index) => (
            <div className={`flip-card ${data.flipped ? "active" : ""}`}
            key={index} onClick={()=> handilActive(data)}>
              <div className="flip-card-inner">
                <div className="flip-card-front" />
                <div className="flip-card-back">{data.emoji}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {checkIfGameFinish && (
        <div className="congratulations">
        <h1>YOU WIN!!!</h1>
        <Confetti width={window.innerWidth}height={window.innerHeight}/>
      </div>
      
    )}
      
    </>
  );

}
export default App;
