import React from 'react'
import data from './songList.json'
let audioPlayer = new Audio()
const AudioData = (props) => {
  React.useEffect(()=>{
    audioPlayer.volume = .4;
    if(audioPlayer.paused===true && audioPlayer.currentTime > 0){
      audioPlayer.src = './songs/'+ data[props.songIndex]['Name'] +'.mp3';
      audioPlayer.play();
    }else{
      audioPlayer.src = './songs/'+ data[props.songIndex]['Name'] +'.mp3';
      audioPlayer.load()
      audioPlayer.play();
    }
  },[props.songIndex])

  // const audioPause = () =>{
  //   audioPlayer.pause();
  // }

  // const audioPlay = () =>{
  //   audioPlayer.play();
  // }

  return (
    <div className='audioData'>
      <p className='audioTitle'>{data[props.songIndex]['Name']}</p>
      <p className='audioCPlay'>Currently Playing:</p>

    </div>
  )
}

export default AudioData