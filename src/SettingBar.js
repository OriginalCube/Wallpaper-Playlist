import React from 'react'
import SettingUI from './SettingUI';

const SettingBar = () => {
  const [active, setActive] = React.useState(false);
  const [settingUI, setSettingUI] = React.useState(false);
  return (
    <div >
       {settingUI?<SettingUI/>:null}
      {active?<div className='settingBarWrapper'>
        <img className='settingIcon' src='./assets/images/settings/note.png' alt='' style={{top:'5%'}}/>
        <img className='settingIcon' onClick={()=>setSettingUI(true)} src='./assets/images/settings/setting.png' alt='' style={{top: '42.5%'}}/>
        <img className='settingIcon' onClick={()=>setActive(false)} src='./assets/images/settings/back.png' alt='' style={{top: '80%'}}/>
      </div>:
      <div className='settingActive' onClick={()=>setActive(true)}/>}
      
    </div>
  )
}

export default SettingBar