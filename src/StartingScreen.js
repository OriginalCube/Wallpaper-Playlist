import React from 'react'

const StartingScreen = (props) => {
    const onSubmit = () =>{
        setTimeout(() => {
            props.setLoad(true);            
        }, 3000);
    }
  return (
    <div className='startingScreen'>
        <div className='loadingCircle' onClick={()=>onSubmit()}></div>
    </div>
  )
}

export default StartingScreen