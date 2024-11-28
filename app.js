const gameBoardTable = document.getElementById('game-board');

const height = 30;
const width = 30;

const food = ['🍉', '🍒', '🥩', '🫘', '🧀', '🥪', '🍕', '🥕'];

let foodY, foodX, foodIndex;
let direction = 'n';
const speed = 200;
let snake = initSnake();

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            direction = 'n';
            break;
        case 'ArrowDown':
            direction = 's';
            break;
        case 'ArrowLeft':
            direction = 'w';
            break;
        case 'ArrowRight':
            direction = 'e';
            break;
    }
});

const intervalId = setInterval(runGame, speed);

generateFood();
// drawGameBoard();

function runGame () {
    updateSnake();
    drawGameBoard();
}

function generateFood () {
    foodY = Math.floor(Math.random() * height);
    foodX = Math.floor(Math.random() * height);
    foodIndex = Math.floor(Math.random() * food.length);
}

function initSnake () {
    const snakeY = Math.floor(height / 2);
    const snakeX = Math.floor(width / 2);

    return [snakeY + '_' + snakeX];
}

function updateSnake () {
    const head = snake[0].split('_');
    let newY = parseInt(head[0]);
    let newX = parseInt(head[1]);

    switch ( direction ) {
        case 'n':
            newY--;
            break;
        case 's':
            newY++;
            break;
        case 'w':
            newX--;
            break;
        case 'e':
            newX++;
            break;
    }

    if ( newY == foodY && newX == foodX ) {
        generateFood();
    }

    snake.unshift(newY + '_' + newX);
    snake.pop();
}

function drawGameBoard () {

    gameBoardTable.innerHTML = '';

    for ( let y = 0; y < height; y++ ) {

        const tr = document.createElement('tr');
    
        for ( let x = 0; x < width; x++ ) {
    
            const td = document.createElement('td');
    
            td.dataset.y = y;
            td.dataset.x = x;

            if ( y == foodY && x == foodX ) {
                td.innerText = food[foodIndex];
            }
    
            if ( snake.includes(y + '_' + x) ) {
                td.innerText = '🕷';
            }

            tr.appendChild(td);
    
        }
    
        gameBoardTable.appendChild(tr);
    
    }

}

