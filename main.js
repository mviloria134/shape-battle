import { Mon, REDEYE, TRIANGREEN } from "./Mon.js";

const canvas = document.querySelector("#app");

canvas.width = 700;
canvas.height = 500;

const ctx = canvas.getContext('2d');

const battleBackground = new Image();
battleBackground.src = 'img\\battleBackground.png';

let enemyMon = new Mon(REDEYE);
const enemyName = document.querySelector(".enemy .name");
const enemyHP = document.querySelector(".enemy .hp")

let player = new Mon(TRIANGREEN);
const playerName = document.querySelector(".player .name");
const playerHP = document.querySelector(".player .hp");

const menu = document.querySelector('.menu');
const statusText = document.querySelector('.status p');
const optionsUL = document.querySelector('.options');
const optionButtons = optionsUL.querySelectorAll('button');

const menuOptions = ['Fight', 'Mon', 'Bag', 'Run'];
const fightOptions = player.skills;

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

// TODO: rework skills and attack logic. Maybe have a Skill class
function scratch(attacker, defender) {
    let basePower = 10;
    defender.currentHP -= basePower;

    return attacker.name + " used Scratch on " + defender.name;
}

function displayStatusText(text) {
    updateMonInfo();
    menu.removeChild(optionsUL);
    statusText.textContent = text
    let displayMiliseconds = 800;
    setTimeout(() => {
        menu.appendChild(optionsUL);
        statusText.textContent = "What will you do?";
        displayOptions(menuOptions);
    }, displayMiliseconds);
}

function handleOption(buttonText) {
    switch (buttonText) {
        case "Fight":
            displayOptions(player.skills);
            break;

        case "Scratch":
            displayStatusText(scratch(player, enemyMon));
    
        default:
            displayStatusText("Haven't implemented that yet. Sorry!");
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