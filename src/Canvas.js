import React from 'react'
const Canvas = () => {
  const canvasRef = React.useRef(null);
  
  React.useEffect(() => {
    let circleNumbers = 15;
    let tempCircle = [];//Store Circle class
    let circleColors = ["#A8E6CF", "#DCEDC1", "#FFD3B6", "#FFAAA5", "#FF8B94"];//Circle Color
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    
    class Circle{
      constructor (xPos, yPos, radius, color, speed){
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.velocity_x = 1 * this.speed;
        this.velocity_y = 1 * this.speed;
      }
      
      draw (ctx){
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.radius, 0,Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = .8;
        ctx.closePath();
      }

      update(){
        this.draw(ctx);
        ctx.fillStyle = 'blue';
        if(this.xPos+this.radius > window.innerWidth){
          this.velocity_x = -this.velocity_x;
        }
        if(this.yPos+this.radius > window.innerHeight){
          this.velocity_y = -this.velocity_y;
        }
        if(this.yPos-this.radius < 0){
          this.velocity_y = -this.velocity_y;
        }
        if(this.xPos-this.radius < 0){
          this.velocity_x = -this.velocity_x;
        } 
        this.xPos += this.velocity_x;
        this.yPos += this.velocity_y;
      }
    }

    let createCircle = function(circle){
      circle.draw(ctx);
    }
    
    for(let i = 0; i < circleNumbers; i++){
      let random_size = Math.random() * 75 + 25;
      let random_x = Math.random() * (window.innerWidth - random_size*2) + random_size;
      let random_y = Math.random() * (window.innerHeight - random_size*2) + random_size;
      let randomColor = Math.floor(Math.random() * circleColors.length);
      let randomSpeed = Math.floor(Math.random() * 2.5 + 1.5)
      let circle = new Circle(random_x, random_y, random_size, circleColors[randomColor], randomSpeed);
      tempCircle.push(circle);
    }    

    for(let i = 0; i<tempCircle.length; i++){
      createCircle(tempCircle[i]);
    }
    let updateCircle = function(){
      requestAnimationFrame(updateCircle);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for(let i = 0; i<tempCircle.length; i++){
        tempCircle[i].update();
      }
    }
    updateCircle();
    
    console.log(window.innerHeight + ':' + window.innerWidth)
  }, [canvasRef])

  return <canvas ref={canvasRef} />
}

export default Canvas