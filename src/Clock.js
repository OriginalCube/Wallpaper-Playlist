import React from 'react'

const Clock = () => {
    const [hour, setHour] = React.useState('00');
    const [minute, setMinute] = React.useState('0');
    const [second, setSecond] = React.useState('0')
    React.useEffect(()=>{
        setInterval(() => {
            const currentTime = new Date();
            setHour(currentTime.getHours());
            setMinute(currentTime.getMinutes());
            setSecond(currentTime.getSeconds());
        }, 1000);
    },[])
  return (
    <div>
        <p className='clockText' style={{fontSize:'12rem'}}>{hour + ':' }{ minute>9? minute: '0' + minute}</p>
        <p className='clockSecond' style={{fontSize:'3rem'}}>{second>9? second : '0' + second}</p>
    </div>
  )
}

export default Clock