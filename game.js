
const green = document.getElementById('green');
const red = document.getElementById('red');
const blue = document.getElementById('blue');
const yellow = document.getElementById('yellow');
const title = document.getElementById('level-title');
const container = document.getElementsByTagName('body')

let playerList = [];
let gameList = [];
let colorList = [green,red,blue,yellow];
let gameStarted = false;
let level=0;



function nextSequence(){
    playerList = [];
    const shuffle = Math.floor(Math.random() * 4);
    const color = colorList[shuffle]
    gameList.push(color)
    level = level+1;
    title.textContent = 'Level ' + level;
    console.log(color.id)
    color.classList.add('pressed')
    setTimeout(() => {
        color.classList.remove('pressed');
         }, 100);
    const audio = new Audio(`Assets/audio/${color.id}.mp3`);
    audio.play();    
    console.log(gameList);

}

function handleClick(e) {
    const color = e.target
    if (color.id === 'red' || color.id === 'blue' || color.id === 'green' || color.id === 'yellow') {
        playerList.push(color);
        color.classList.add('pressed')
        const audio = new Audio(`Assets/audio/${color.id}.mp3`);
        audio.play(); 
         setTimeout(() => {
        color.classList.remove('pressed');
         }, 100);

        levelUp();
    }
}


function levelUp(){
    playerList.forEach(function (element,index){
        console.log('is equal',element===gameList[index])
        if(element !== gameList[index]){
            gameStarted = false;
            container[0].classList.add('game-over')
            const audio = new Audio(`Assets/audio/wrong.mp3`);
            audio.play(); 
            playerList=[]
            level=0;
            title.textContent="Game Over.Press Any Key to Start"
            gameList=[]
            return;
        }
    })
    if(playerList.length === gameList.length && gameList.length !== 0){
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }
}


document.addEventListener('keydown', function() {
    if (!gameStarted) {
        if(container[0].classList.contains('game-over')){
            container[0].classList.remove('game-over')
        }
        gameStarted = true;
        nextSequence();
    }
    document.querySelectorAll('.btn').forEach(function(square){
            square.addEventListener('click',handleClick)
    })
});

