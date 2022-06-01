import './App.css';
import React from 'react';
import Playlist from './Playlist';
import AudioData from './AudioData';
import StartingScreen from './StartingScreen';
import data from './songList.json'

function App() {
  const [load, setLoad] = React.useState(false);
  const [songIndex, setSongIndex] = React.useState(Math.floor(Math.random() * data.length))
  return (
    <div className="App">
      {load?null:<StartingScreen setLoad={setLoad}/>}
      <img src='./images/morning.jpg' alt='' className='backgroundImage'/>
      {load?<Playlist setSongIndex={setSongIndex}/>:null}
      {load?<AudioData songIndex={songIndex}/>:null}
    </div>
  );
}

export default App;
