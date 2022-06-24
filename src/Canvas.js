import React from 'react'
const Canvas = (props) => {
  const canvasRef = React.useRef(null);
  
  React.useEffect(() => {
    let circleNumbers = 15;
    let confettiNumbers = 10;
    let tempCircle = [];//Store Circle class
    let tempConfetti = [];//Store Confetti class 
    let circleColors = ["#A8E6CF", "#DCEDC1", "#FFD3B6", "#FFAAA5", "#FF8B94"];//Circle Color
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let ctx = canvas.getContext('2d');


    //First animation CD circle 
    function AnimateCircle(){
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
  }

  //Second Animation Confetti
  function AnimateConfetti(){
    class Confetti{
      constructor (xPos, yPos, radius, color, turn, fade, speed, velocity){
        this.xPos = xPos;
        this.initial_x = xPos;
        this.velocity_x = speed;
        this.yPos = yPos;
        this.initial_y = yPos;
        this.velocity_y = speed ;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.velocity = velocity;
        this.turn = turn;
        this.fade = fade;
        this.initial_fade = fade;
        this.turned = true;
      }
      draw (ctx){
        ctx.beginPath();
        //ctx.arc(this.xPos, this.yPos, this.radius/2, 0, Math.PI * 2 ,  true)
        ctx.rect(this.xPos, this.yPos, this.radius, this.radius);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = this.fade;
        ctx.closePath();
      }

      update(){
        this.draw(ctx);
        if(this.yPos < this.initial_y+window.innerHeight/(confettiNumbers)){
          this.yPos += this.speed*this.velocity;
        }else{
          this.yPos = this.initial_y;
        }        

        if(this.turn === 0){
          if(this.xPos <= this.initial_x+(window.innerWidth/confettiNumbers)/4 && this.turned){
            this.velocity_x = this.speed/4;
          }else{
            this.velocity_x = -this.speed/4;      
            this.turned = false; 
            if(this.xPos <= this.initial_x - (window.innerWidth/confettiNumbers)/4 && this.turned === false){
              this.turned = true;
            }
          }
        }else{
          if(this.xPos >= this.initial_x-(window.innerWidth/confettiNumbers)/4 && this.turned){
            this.velocity_x = -this.speed/4;
          }else{
            this.velocity_x = +this.speed/4;      
            this.turned = false; 
            if(this.xPos >= this.initial_x + (window.innerWidth/confettiNumbers)/4 && this.turned === false){
              this.turned = true;
            }
          }
        }
        //Confetti fade
        if(this.fade < .8){
          this.fade += .002;
        }else if(this.fade > .8){
          this.fade = this.initial_fade;
        }
        this.xPos += this.velocity_x;    
      }
    }

    let createConfetti = function(circle){
      circle.draw(ctx);
    }
  
    for(let y = 0; y <= confettiNumbers; y++){
      let confettiX = 0;
      let confettiY = window.innerHeight - (window.innerHeight/(confettiNumbers)) * y;
      let tempC = (window.innerWidth/confettiNumbers)/2;//Initial Spaces || same as above but as a var
      for(let x = 1; x <= confettiNumbers; x++){
        confettiX = tempC+window.innerWidth - ((window.innerWidth/confettiNumbers) * x);
        let randomColor = Math.floor(Math.random() * circleColors.length);
        let confetti = new Confetti(confettiX, confettiY, 12, circleColors[randomColor], Math.floor(Math.random()*2), Math.random()*.3, confettiNumbers*.05, Math.random());
        tempConfetti.push(confetti);
      }
    }    

    //creates confetti circles
    for(let i = 0; i<tempConfetti.length; i++){
      createConfetti(tempConfetti[i]);
    }
    
    //creates animation for confetti
    let updateConfetti = function(){
      requestAnimationFrame(updateConfetti);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for(let i = 0; i<tempConfetti.length; i++){
        tempConfetti[i].update();
      }
    }
    updateConfetti();
  }

  /*Keyboard Sounds
   idea Canvas here audio outside Effect Going Up with th*/
  function keyboardAnimation(e){
    let keyInput = Math.floor(e.clientX/(window.innerWidth/8));
    class Key{
      constructor (xPos, yPos, width, height, speed, color, opacity){
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = color;
        this.opacity = opacity;
      }
    
      draw (ctx){
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = this.opacity;
        ctx.closePath();
      }

      update(){
        this.draw(ctx);
        this.yPos -= this.speed/2;
        this.height += this.speed;
        this.opacity -= .01;
      }
    }    
      //Default Data
      let temp_size = (window.innerWidth/8);//Sets width
      let keyColor = ['#A7D7CE', '#F2E4A1', '#F4D5A4', '#EECBA9', '#F0BBB6', '#D6BFE0', '#A0CECE', '#E6978E'];
      let key = new Key(keyInput*temp_size, e.clientY-75, temp_size, 75, 20, keyColor[keyInput], .8);
      key.draw(ctx);
    let updateKey = function(){
      window.requestAnimationFrame(updateKey);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      key.update();
    }
      updateKey();
  }

  //If for animation Loader
  if(props.animationMode === 0){
    AnimateCircle();
  }else if(props.animationMode === 1){
    AnimateConfetti();
  }else if(props.animationMode === 2){
    document.addEventListener('click', keyboardAnimation);
  }
  
  //return useEffect
  return () => {document.removeEventListener('click', keyboardAnimation);}
  }, [props.animationMode]);

  
  return <canvas ref={canvasRef} />
}

export default Canvas