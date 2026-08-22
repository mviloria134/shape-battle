const canvas = document.querySelector("#app");

canvas.width = 700;
canvas.height = 500;

const ctx = canvas.getContext('2d');

const battleBackground = new Image();
battleBackground.src = 'img\\battleBackground.png';

class Mon {
    constructor(name, hp, moves) {
        this.name = name;
        this.maxHP = hp;
        this.currentHP = this.maxHP;
        this.moves = moves;
    }
}

const enemyImg = new Image();
enemyImg.src = 'img\\enemy-sprite.png';
const enemy = new Mon("Red Guy", 50, ['Scratch', 'Growl']);
const enemyName = document.querySelector(".enemy .name");
const enemyHP = document.querySelector(".enemy .hp")

const playerImg = new Image();
playerImg.src = 'img\\item-sprite.png';
const player = new Mon("Green Tri", 100, ['Scratch', 'Tail Whip', 'Spark', 'Tackle']);
const playerName = document.querySelector(".player .name");
const playerHP = document.querySelector(".player .hp");

battleBackground.onload = () => {
    ctx.drawImage(battleBackground, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(enemyImg, canvas.width * (3/4), canvas.height / 8, 100, 100);
    ctx.drawImage(playerImg, canvas.width/5, canvas.height/2, 150, 150);
};

const options = document.querySelector('.options');
const optionButtons = options.querySelectorAll('button');

const menuOptions = ['Fight', 'Mon', 'Bag', 'Run'];
const fightOptions = player.moves;

optionButtons.forEach(element => {
    element.addEventListener("click", () => handleOption(element.textContent))
});

function updateEnemyInfo() {
    enemyName.textContent = enemy.name;
    enemyHP.textContent = enemy.currentHP + "/" + enemy.maxHP;
}

function updatePlayerInfo() {
    playerName.textContent = player.name;
    playerHP.textContent = player.currentHP + "/" + player.maxHP;
}

function displayFightOptions() {
    for (let index = 0; index < optionButtons.length; index++) {
        optionButtons[index].textContent = fightOptions[index];
    }
}

function handleOption(buttonText) {
    switch (buttonText) {
        case "Fight":
            displayFightOptions();
            break;
    
        default:
            break;
    }
}

updateEnemyInfo();
updatePlayerInfo();