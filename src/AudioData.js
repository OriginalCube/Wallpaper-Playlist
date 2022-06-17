import React from 'react'
import data from './songList.json'

const AudioData = (props) => {
  const [trackIndex, setTrackIndex] = React.useState(props.songIndex);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [trackProgress, setTrackProgress] = React.useState(0);
  const [volume, setVolume] = React.useState(.4);
  //ref
  const intervalRef = React.useRef();
  const audioRef = React.useRef(new Audio());
  const isReady = React.useRef(false);
  const { duration } = audioRef.current;

  const skipButton = () => {
    if (trackIndex < data.length - 1) {
      props.setSongIndex(trackIndex + 1);
    } else {
      props.setSongIndex(0);
    }
  };

  const prevButton = () => {
    if (trackIndex > 0) {
      props.setSongIndex(trackIndex - 1);
    }
  }

  const lessVolume = () =>{
    if(volume-.1>0){
      setVolume(Math.round((volume-.1)*10)/10);
      audioRef.current.volume = volume;
    }else{
      setVolume(0);
      audioRef.current.volume = volume;
    }
  }

  const addVolume = () =>{
    if(volume+.1<.9){
      volume<0?setVolume(volume+.3):setVolume(volume+.1);
      audioRef.current.volume = volume;
    }
  }

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        skipButton();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    setIsPlaying(false);
    startTimer();
  };

  const playButton = () =>{
    setIsPlaying(false);
    audioRef.current.play();
  }

  const pauseButton = () =>{
    setIsPlaying(true);
    audioRef.current.pause();
  }

  React.useEffect(() => {
    if (isPlaying) {
      startTimer();
    }
  }, [isPlaying]);

  React.useEffect(()=>{
    setTrackIndex(props.songIndex);
    audioRef.current.pause();
    audioRef.current = new Audio('./assets/songs/'+ data[props.songIndex]['Name'] +'.mp3');
    audioRef.current.volume = volume;
    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }    
    setIsPlaying(audioRef.isPlaying);
  },[props.songIndex])

  React.useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className='audioData'>
      <div className='audioDataText'>
        <p className='audioTitle'>{data[props.songIndex]['Name']}</p>
        <p className='audioCPlay'>Currently Playing:</p>
      </div>
      <div className='audioControls'>
        <div className='audioProgressWrapper'><input
            type='range'
            step='1'
            min='0'
            value={trackProgress}
            max={duration ? duration : `${duration}`}
            className="audioProgress"
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
          /></div>
        <img className='audioIcon' onClick={lessVolume} style={{marginLeft:'0%'}} alt='' src='./assets/images/audio/volumeMinus.png' />
        <img className='audioIcon' onClick={prevButton} alt='' src='./assets/images/audio/backward.png' />
        {isPlaying?<img className='audioIcon' onClick={playButton} alt='' src='./assets/images/audio/play.png' />
        :<img className='audioIcon' onClick={pauseButton} alt='' src='./assets/images/audio/pause.png' />}
        <img className='audioIcon' onClick={skipButton} alt='' src='./assets/images/audio/forward.png' />
        <img className='audioIcon' onClick={addVolume} alt='' src='./assets/images/audio/volumePlus.png' />
      </div>
    </div>
  )
}

export default AudioData