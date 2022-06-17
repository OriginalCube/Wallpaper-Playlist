import React from 'react'

const SettingUI = () => {
  return (
    <div className='mainSettings'>
        <div className='settingCard'>
          <div className='filterCard'>
          <p className='filterText'>Background Filter</p>
            <input 
            type='range'
            step='1'
            min='0'
            max= '1'
            />  
          </div>
        </div>
    </div>
  )
}

export default SettingUI