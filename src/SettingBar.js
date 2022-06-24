import React from 'react'
import SettingUI from './SettingUI';

const SettingBar = (props) => {
  const [active, setActive] = React.useState(false);
  const [settingUI, setSettingUI] = React.useState(false);
  const onBack = () =>{
    props.setLoad(false);
    setActive(false);
  }
  return (
    <div >
       {settingUI?<SettingUI setSongVolume={props.setSongVolume} songVolume={props.songVolume} 
       filterOpacity={props.filterOpacity} setFilterOpacity={props.setFilterOpacity} 
       setSettingUI={setSettingUI} setKeyboard={props.setKeyboard} keyboard={props.keyboard}
       setAnimationMode={props.setAnimationMode} animationMode={props.animationMode}/>:null}
      {active?<div className='settingBarWrapper'>
        <img className='settingIcon' onClick={onBack} src='./assets/images/settings/note.png' alt='' style={{top:'5%'}}/>
        <img className='settingIcon' onClick={()=>setSettingUI(!settingUI)} src='./assets/images/settings/setting.png' alt='' style={{top: '42.5%'}}/>
        <img className='settingIcon' onClick={()=>setActive(false)} src='./assets/images/settings/back.png' alt='' style={{top: '80%'}}/>
      </div>:
      <div className='settingActive' onClick={()=>setActive(true)}/>}
      
    </div>
  )
}

export default SettingBar