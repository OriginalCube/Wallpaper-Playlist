import React from 'react';
import data from './songList.json';

const Playlist = (props) => {
  const [scroll, setScroll] = React.useState(0);
  let textColors = ["#A8E6CF", "#DCEDC1", "#FFD3B6", "#FFAAA5", "#FF8B94"];//Text Color

  const arrowUp = () =>{
    if(scroll<0){(setScroll((scroll+100)))};
  }

  const arrowDown = () =>{
    setScroll((scroll-100));
  }

  const onSubmit = (e) =>{
    props.setSongIndex(e);
  }

  React.useEffect(()=>{
    
  },[])

  return (
    <div className='playlist'>
      <div className='arrowContainer'>
        <div onClick={()=>arrowUp()}>
          <div className='arrowUp'></div>
          <div className='arrowUp1'></div>
        </div>
        <div onClick={()=>arrowDown()}>
          <div className='arrowDown'></div>
          <div className='arrowDown1'></div>
        </div>
      </div>
      <div className='songList' style={{top: scroll}}>
        {
          data.map((song, index)=>(
            <p className='songDetails' style={{color: textColors[Math.floor(Math.random()*textColors.length)]}} 
            key={index} onClick={()=>onSubmit(index)}>{song.Name}</p>
          ))
        }
      </div>
      <button
        type='button' className='audioPlay'
      />

    </div>
  )
}

export default Playlist

// {
//   data.map((song, index)=>(
//   <p className='songDetails' key={index} onClick={()=>onSubmit(song.Name)}>{song.Name}</p>
//   ))
// }