import React from 'react'
import Clock from './Clock';

const StartingScreen = (props) => {
    const onSubmit = () =>{
      props.setLoad(true);            
    }
  return (
    <div className='startingScreen'>
      <div className='startClock' onClick={onSubmit}><Clock/></div>
    </div>
  )
}

export default StartingScreen