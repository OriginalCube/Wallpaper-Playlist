import React from 'react'

const Clock = (props) => {
    const [hour, setHour] = React.useState('00');
    const [minute, setMinute] = React.useState('0');
    const [second, setSecond] = React.useState('0')
    const [clockText, setClockText] = React.useState(window.innerHeight/1980);
    const [clockSecond, setClockSecond] = React.useState(window.innerHeight/1980);
    React.useEffect(()=>{
        setInterval(() => {
            const currentTime = new Date();
            setHour(currentTime.getHours());
            setMinute(currentTime.getMinutes());
            setSecond(currentTime.getSeconds());
        }, 1000);
    },[])
    
    React.useEffect(()=>{
      if(props.Mode === 'start'){
        setClockText(clockText*20);
        setClockSecond(clockSecond*8);
      }
    },[props.Mode])

  return (
    <div>
        <p className='clockText' style={{fontSize:clockText.toString()+'rem'}}>{hour + ':' }{ minute>9? minute: '0' + minute}</p>
        <p className='clockSecond' style={{fontSize:clockSecond.toString()+'rem'}}>{second>9? second : '0' + second}</p>
    </div>
  )
}

export default Clock