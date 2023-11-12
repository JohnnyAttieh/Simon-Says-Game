
const green = document.getElementById('green');
const red = document.getElementById('red');
const blue = document.getElementById('blue');
const yellow = document.getElementById('yellow');
const title = document.getElementById('level-title');

let playerList = [];
let gameList = [];
let colorList = [green,red,blue,yellow];
let gameStarted = false;



function nextSequence(){
    playerList = [];
    const shuffle = Math.floor(Math.random() * 4);
    const color = colorList[shuffle]
    gameList.push(color)
    console.log(color.id)

    const audio = new Audio(`Assets/audio/${color.id}.mp3`);
    audio.play();    
    console.log(gameList);

}

function handleClick(e) {
    const color = e.target
    if (color.id === 'red' || color.id === 'blue' || color.id === 'green' || color.id === 'yellow') {
        playerList.push(color);
        const audio = new Audio(`Assets/audio/${color.id}.mp3`);
        audio.play(); 
        levelUp();
    }
}


function levelUp(){
    playerList.forEach(function (element,index){
        console.log('is equal',element===gameList[index])
        if(element !== gameList[index]){
            gameStarted = false;
            const audio = new Audio(`Assets/audio/wrong.mp3`);
            audio.play(); 
            playerList=[]
            gameList=[]
            return;
        }
    })
    if(playerList.length === gameList.length && gameList.length !== 0){
     nextSequence();
    }
}


document.addEventListener('keydown', function() {
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();
    }

    document.querySelectorAll('.btn').forEach(function(square){
        square.addEventListener('click',handleClick)
    })
});
