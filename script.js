const backgroundMusic = new Audio('music/Overworld Theme - Super Mario_ World.mp3'); 
const jumpSound = new Audio('music/Som do Mario pulando.mp3'); 
const gameOverSound = new Audio('music/Som do Mario Morrendo  - Efeito Sonoro HD.mp3'); 

backgroundMusic.loop = true; 
backgroundMusic.play(); 

const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const restartBtn = document.getElementById('restart-btn');
const scoreDisplay = document.createElement('div'); 
let score = 0;
let gameOver = false;

scoreDisplay.style.position = 'absolute';
scoreDisplay.style.top = '10px';
scoreDisplay.style.left = '50%';
scoreDisplay.style.transform = 'translateX(-50%)';
scoreDisplay.style.fontFamily = "'Press Start 2P', cursive";
scoreDisplay.style.fontSize = '18px';
scoreDisplay.style.color = 'white';
scoreDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
scoreDisplay.style.padding = '8px 15px';
scoreDisplay.style.borderRadius = '10px';
scoreDisplay.style.zIndex = '10';
document.body.appendChild(scoreDisplay);

const updateScore = () => {
    if (!gameOver) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }
};

const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');
        jumpSound.currentTime = 0; 
        jumpSound.play(); 

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500); 
    }
};

const endGame = () => {
    backgroundMusic.pause(); 
    gameOverSound.play(); 
};


const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const marioWidth = mario.offsetWidth;

    if (pipePosition <= (marioWidth + 20) && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'images/game-over.png';

        const marioWidthAdjusted = window.innerWidth <= 600 ? '50px' : '75px';
        mario.style.width = marioWidthAdjusted;
        mario.style.marginLeft = window.innerWidth <= 600 ? '30px' : '50px';

        clearInterval(loop);
        clearInterval(scoreInterval);
        gameOver = true;

        scoreDisplay.innerHTML = `Game Over! <br> Score Final: ${score}`;
        restartBtn.style.display = 'block';

        endGame(); 
    }
}, 10);


document.addEventListener('keydown', (event) => {
    if (gameOver) {
        location.reload();
    } else {
        jump();
    }
});
document.addEventListener('touchstart', jump); 

const adjustButtonForMobile = () => {
    if (window.innerWidth <= 600) {
        restartBtn.style.fontSize = '12px';
        restartBtn.style.padding = '10px 15px';
    } else {
        restartBtn.style.fontSize = '16px';
        restartBtn.style.padding = '15px 30px';
    }
};

adjustButtonForMobile();
window.addEventListener('resize', adjustButtonForMobile);

restartBtn.addEventListener('click', () => {
    location.reload();
});

const scoreInterval = setInterval(updateScore, 100);
