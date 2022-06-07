import React from 'react'
import Clock from './Clock';

const StartingScreen = (props) => {
    const onSubmit = () =>{
      let _audio = new Audio('./audios/notes.mp3');
      _audio.play();
      props.setLoad(true);            
    }
  return (
    <div className='startingScreen'>
      <div className='startClock' onClick={onSubmit}><Clock/></div>
    </div>
  )
}

export default StartingScreen