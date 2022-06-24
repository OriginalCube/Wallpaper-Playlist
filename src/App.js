import './App.css';
import React from 'react';
import Playlist from './Playlist';
import AudioData from './AudioData';
import StartingScreen from './StartingScreen';
import Canvas from './Canvas';
import SettingBar from './SettingBar';
import data from './songList.json';

function App() { 
  const [load, setLoad] = React.useState(false);
  const [songIndex, setSongIndex] = React.useState(Math.floor(Math.random() * data.length));//Math.floor(Math.random() * data.length)
  const [activeWallpaper, setActiveW] = React.useState('');
  const [animationMode, setAnimationMode] = React.useState();
  const [filterOpacity, setFilterOpacity] = React.useState('.1');
  const [songVolume, setSongVolume] = React.useState(.5);
  const [keyboard, setKeyboard] = React.useState(false);
  let wallpaper = ['morning', 'morning_1', 'morning_2', 'afternoon', 'afternoon_1', 'evening', 'evening_1'];

  const wallpaperSet = () =>{// Sets the wallpaper by the current time
    let _date = new Date().getHours();
    if(_date > 5 && _date < 12){
      let randomInt = (Math.floor(Math.random() * 3));
      setActiveW(wallpaper[randomInt]);
    }else if(_date > 11 && _date < 19){
      let randomInt = (Math.floor(Math.random() * 2) + 3);
      setActiveW(wallpaper[randomInt]);
    }else if(_date > 18 || _date < 6){
      let randomInt = (Math.floor(Math.random() * 2) + 5);
      setActiveW(wallpaper[randomInt]);
    }
  }

  React.useEffect(()=>{
    wallpaperSet();
    localStorage.getItem('filterOpacity')!==null?setFilterOpacity(localStorage.getItem('filterOpacity')) : localStorage.setItem('filterOpacity', '.1'); //Dont ask -_-
    localStorage.getItem('songVolume')!==null?setSongVolume(localStorage.getItem('songVolume')) : localStorage.setItem('songVolume', '.4'); 
    localStorage.getItem('animationMode')!==null?setAnimationMode(localStorage.getItem('animationMode')) : localStorage.setItem('animationMode', '1');     
    if(localStorage.getItem('instrument')!==null){
      let tempData = localStorage.getItem('instrument');
      setKeyboard(tempData==='true'?true:false);
    }else{
      localStorage.setItem('instrument', 'true');
    }
  },[])

  React.useEffect(()=>{
    // Key Events
    if(keyboard===true){document.addEventListener('click', audioKey);}
    else{document.removeEventListener('click', audioKey);};
    return () => {document.removeEventListener('click', audioKey);}
  },[keyboard]);


  const audioKey = (e) =>{
    let audioSound = new Audio();
    let tempData = Math.floor(e.clientX/(window.innerWidth/8));
    if(tempData===0){
      audioSound.src = './assets/audios/keys/e4.mp3'
    }else if(tempData===1){
      audioSound.src = './assets/audios/keys/f4.mp3'
    }else if(tempData===2){
      audioSound.src = './assets/audios/keys/g4.mp3'
    }else if(tempData===3){
      audioSound.src = './assets/audios/keys/a5.mp3'
    }else if(tempData===4){
      audioSound.src = './assets/audios/keys/b5.mp3'
    }else if(tempData===5){
      audioSound.src = './assets/audios/keys/c5.mp3'
    }else if(tempData===6){
      audioSound.src = './assets/audios/keys/d5.mp3'
    }else if(tempData===7){
      audioSound.src = './assets/audios/keys/e5.mp3'
    }
    audioSound.volume = 1;
    audioSound.play();
  }

  return (
    <div className="App">
      <SettingBar setLoad={setLoad} setSongVolume={setSongVolume} songVolume={songVolume} 
      setFilterOpacity={setFilterOpacity} filterOpacity={filterOpacity} 
      setKeyboard={setKeyboard} keyboard={keyboard} setAnimationMode={setAnimationMode}
      animationMode={parseFloat(animationMode)}/>
      <img src={'./assets/images/' + activeWallpaper + '.png'} alt='' className='backgroundImage'/>
      <div className='backgroundFilter' style={{opacity: filterOpacity}}></div> 
      <Canvas animationMode={parseFloat(animationMode)}/>
      {load?null:<StartingScreen setLoad={setLoad}/>}
      {load?<Playlist setSongIndex={setSongIndex}/>:null}
      {load?<AudioData setSongIndex={setSongIndex} songIndex={songIndex} songVolume={parseFloat(songVolume)} setSongVolume={setSongVolume}/>:null}

    </div>
  );
}

export default App;
