import React from 'react'

const SettingUI = (props) => {
  const [tempMusic, setMusic] = React.useState(props.songVolume);
  const [tempOpacity, setOpacity] = React.useState(props.filterOpacity);
  const [instrument, setInstrument] = React.useState(props.keyboard);
  const [animMode, setAnimMode] = React.useState(props.animationMode);
  const musicVolume = (e) =>{
    setMusic(e);
    props.setSongVolume(e)
  }

  const backgroundFilter = (e) =>{
    setOpacity(e);
    props.setFilterOpacity(e);
  }

  const onInstrument = () =>{
    setInstrument(!instrument);
    props.setKeyboard(!instrument);
  }

  const animOption = (e) =>{
    setAnimMode(e);
    props.setAnimationMode(e);
  }

  const onSave = () =>{
    localStorage.setItem('filterOpacity', tempOpacity);
    localStorage.setItem('songVolume', tempMusic);
    localStorage.setItem('instrument', instrument);
    localStorage.setItem('animationMode', animMode);    
    props.setSettingUI(false);
  }
  return (
    <div className='mainSettings'>
      <p>On Load Settings and adjustments</p>
        <div className='settingCard'>
          <div className='filterCard'>
            <div className='filterCardWrapper'>
              <label >Background Filter:</label>
              <input style={{width:'40%'}}
                type='range'
                min='0'
                max='1'
                onChange={(e)=>backgroundFilter(e.target.value)}
                step='.1'
                value={props.filterOpacity}
              />
            </div>  
          </div>
          <div className='filterCard' style={{top:'10%'}}>
            <div className='filterCardWrapper'>
              <label>Music volume:</label>
              <input style={{width:'50%'}}
                type='range'
                min='0'
                max='1'
                onChange={(e)=>musicVolume(e.target.value)}
                value={props.songVolume}
                step='.1'
              />
            </div>  
          </div>
          <div className='filterCard' style={{top:'20%'}}>
            <div className='filterCardWrapper'>
              <label>Instrument volume:</label>
              <label onClick={onInstrument}style={{position:'absolute',right:'20%', fontSize:'1.2rem', color:instrument?'green':'red'}}>{instrument?'Enabled':'Disabled'}</label>
            </div>  
          </div>
          <div className='canvasCard'>
            <img alt='' height='50%' width='80%' src='./assets/images/settings/note.png'/>
            <div className='animOptionWrapper'>
              <div className='animOption' onClick={()=>animOption(0)} style={{backgroundColor:animMode===0?'green':'red'}}></div>
              <div className='animOption' onClick={()=>animOption(1)} style={{backgroundColor:animMode===1?'green':'red'}}></div>
              <div className='animOption' onClick={()=>animOption(2)} style={{backgroundColor:animMode===2?'green':'red'}}></div>
            </div>
          </div>
          <div className='filterCard' style={{top:'30%', left:'35%', width:'30%', height:'10%', textAlign:'center'}} onClick={onSave}>
            <label className='saveClose' >Save and close</label>
          </div>
        </div>
    </div>
  )
}

export default SettingUI