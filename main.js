const canvas = document.querySelector("#app");

canvas.width = 700;
canvas.height = 500;

const ctx = canvas.getContext('2d');

const battleBackground = new Image();
battleBackground.src = 'img\\battleBackground.png';

class Mon {
    constructor({name, maxHP, moves, imgPath}) {
        this.name = name;
        this.maxHP = maxHP;
        this.currentHP = this.maxHP;
        this.moves = moves;
        this.image = new Image();
        this.image.src = imgPath;
    }
}

const REDEYE = {
    name: "Redeye",
    maxHP: 50,
    moves: ['Scratch', 'Growl'],
    imgPath: 'img\\enemy-sprite.png'
};

const TRIANGREEN = {
    name: "Triangreen",
    maxHP: 100,
    moves: ['Scratch', 'Tail Whip', 'Spark', 'Tackle'],
    imgPath: 'img\\item-sprite.png'
};

let enemyMon = new Mon(REDEYE);
const enemyName = document.querySelector(".enemy .name");
const enemyHP = document.querySelector(".enemy .hp")

let player = new Mon(TRIANGREEN);
const playerName = document.querySelector(".player .name");
const playerHP = document.querySelector(".player .hp");

const options = document.querySelector('.options');
const optionButtons = options.querySelectorAll('button');

const menuOptions = ['Fight', 'Mon', 'Bag', 'Run'];
const fightOptions = player.moves;

optionButtons.forEach(element => {
    element.addEventListener("click", () => handleOption(element.textContent))
});

function updateEnemyInfo() {
    enemyName.textContent = enemyMon.name;
    enemyHP.textContent = enemyMon.currentHP + "/" + enemyMon.maxHP;
}

function updatePlayerInfo() {
    playerName.textContent = player.name;
    playerHP.textContent = player.currentHP + "/" + player.maxHP;
}

function updateMonInfo() {
    updateEnemyInfo();
    updatePlayerInfo();
}

function displayOptions(optionArray) {
    for (let index = 0; index < optionButtons.length; index++) {
        optionButtons[index].textContent = optionArray[index];
    }
}

function scratch(attacker, defender) {
    let basePower = 10;
    defender.currentHP -= basePower;
}

function handleOption(buttonText) {
    switch (buttonText) {
        case "Fight":
            displayOptions(player.moves);
            break;

        case "Scratch":
            scratch(player, enemyMon);
            updateMonInfo();
            displayOptions(menuOptions);
    
        default:
            break;
    }
}

function drawBattleScene() {
    ctx.drawImage(battleBackground, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(enemyMon.image, canvas.width * (3/4), canvas.height / 8, 100, 100);
    ctx.drawImage(player.image, canvas.width/5, canvas.height*(2/5), 150, 150);
}

battleBackground.onload = () => {
    drawBattleScene();
};
updateMonInfo();