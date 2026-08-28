import { Mon, MONS_LIST } from "./Mon.js";
import { SKILL_LIST } from "./Skill.js";
import { randomChoiceFrom } from "./randomUtils.js";

const canvas = document.querySelector("#app");

canvas.width = 700;
canvas.height = 500;

const ctx = canvas.getContext('2d');

const battleBackground = new Image();
battleBackground.src = 'img\\battleBackground.png';

const battleInterface = document.querySelector(".battle-interface");
battleInterface.style.width = canvas.width + "px";
battleInterface.style.height = canvas.height + "px";

let enemyMon = new Mon(MONS_LIST.REDEYE);
const enemyName = document.querySelector(".enemy .name");
const enemyHP = document.querySelector(".enemy .hp")

let player = new Mon(MONS_LIST.TRIANGREEN);
const playerName = document.querySelector(".player .name");
const playerHP = document.querySelector(".player .hp");

const menu = document.querySelector('.menu');
const statusText = document.querySelector('.status p');
const statusDefault = statusText.textContent;

const optionsUL = document.querySelector('.options');
const optionButtons = optionsUL.querySelectorAll('button');

const menuOptions = ['Fight', 'Mon', 'Bag', 'Run'];

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

function changeStatusTo(message) {
    statusText.textContent = message;
}

function goToMainMenu() {
    if (!optionsUL.parentElement) {
        menu.appendChild(optionsUL);
    }
    changeStatusTo(statusDefault);
    displayOptions(menuOptions);
}

async function displayStatusMessages(messages, millisecondsBetweenMessages = 800) {
    updateMonInfo();
    if (optionsUL.parentElement) {
        menu.removeChild(optionsUL);
    }
    
    for (let i = 0; i < messages.length; i++) {
        await displayForMilliseconds(messages[i], millisecondsBetweenMessages);
    }
    // goToMainMenu();
    return Promise.resolve(1);
}

function displayForMilliseconds(message, milliseconds) {
    changeStatusTo(message);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(1);
        }, milliseconds);
    });
}

function displayAttackResult(attacker, defender, skill) {
    const messages = [attacker.name + " used " + skill.name + " on " + defender.name];
    (attacker.attack(skill.name, defender)) ? 
        messages.push("It did " + skill.basePower + " damage!") :
        messages.push("But it missed!");
        
    return displayStatusMessages(messages);  
}

async function handleOption(buttonText) {
    switch (true) {
        case buttonText === "Fight":
            displayOptions(player.skills);
            break;

        case buttonText in SKILL_LIST:
            await displayAttackResult(player, enemyMon, SKILL_LIST[buttonText]);
            await goToEnemyTurn();
            goToMainMenu();
            break;
    
        default:
            displayStatusMessages(["Haven't implemented that yet. Sorry!"]);
    }
}

function goToEnemyTurn() {
    return displayAttackResult(enemyMon, player, SKILL_LIST[randomChoiceFrom(enemyMon.skills)]);
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