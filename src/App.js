import './App.css';
import React from 'react';
import Playlist from './Playlist';
import AudioData from './AudioData';
import StartingScreen from './StartingScreen';
import data from './songList.json'
import Canvas from './Canvas';

function App() {
  const [load, setLoad] = React.useState(false);
  const [songIndex, setSongIndex] = React.useState(Math.floor(Math.random() * data.length));
  const [activeWallpaper, setActiveW] = React.useState('');
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
  },[])

  return (
    <div className="App">
      <Canvas/>
      <img src={'./images/' + activeWallpaper + '.png'} alt='' className='backgroundImage'/>
      {load?null:<StartingScreen setLoad={setLoad}/>}
      {load?<Playlist setSongIndex={setSongIndex}/>:null}
      {load?<AudioData songIndex={songIndex}/>:null}
    </div>
  );
}

export default App;
