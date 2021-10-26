window.addEventListener('DOMcontentLoaded',()=>{

    const squares = document.querySelectorAll('.box');
    let Score = document.querySelector('.score');
    let snake = [2,1,0];    // the first index is the head 1 is for the body and 0 is for the tail.
    // let currentIndex = 0;
    let speed = 0.9;
    let score = 0;
    let direction = 1;
    let intervalTime = 0;
    let interval = 0;
    let appleIndex = 0;

    const width = 10;
// function for set and reset

    function start(){
        snake.forEach((item)=>{
            squares[item].classList.remove('snake');
        });
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        Score.innerHTML = score;
        snake = [2,1,0];
        snake.forEach((item)=>{
            squares[item].classList.add('snake');
        });
        score = 0;
        intervalTime = 1000;
        randomApple();
        setInterval(moveCount,intervalTime);
    }
    function control(e){
        if(e.keyCode === 39) {
            direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
          } else if (e.keyCode === 38) {
            direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
          } else if (e.keyCode === 37) {
            direction = -1 // if we press left, the snake will go left one div
          } else if (e.keyCode === 40) {
            direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
          }
    }
    function moveCount(){
        // for collisions into the walls and into the snake body itself
        if(
            (snake[0]%width===width-1&&direction===1)|| //right wall
            (snake[0]%width===0&&direction===-1)|| //left wall
            (snake[0]+width>=width*width&&direction===width)||//bottom wall
            (snake[0]-width<0&&direction===-width)||    // top wall
            (squares[snake[0]+direction].classList.contains('snake'))
        ){
            clearInterval(interval);
        }

        let tail = snake.pop();
        squares[tail].classList.remove('snake');
        snake.unshift(snake[0]+direction);

        //If snake's head is on a div with an apple class on it.

        if(squares[snake[0]].classList.contains('apple')){
            squares[snake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            snake.push(tail);
            randomApple();
            score++;
            Score.innerHTML = score;
            clearInterval(interval);
            interval*=speed;
            interval = setInterval(moveCount,intervalTime);
        }
        
        squares[snake[0]].classList.add('snake');

    }

    document.addEventListener('keyup',control);
    document.querySelector('.btn').addEventListener('click',start);

});