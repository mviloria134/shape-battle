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
    
    for (let i = 0; i < messages.length; i++) {
        await displayForMilliseconds(messages[i], millisecondsBetweenMessages);
    }
    // goToMainMenu();
    return Promise.resolve(1);
}

function displayForMilliseconds(message, milliseconds = 800) {
    if (optionsUL.parentElement) {
        menu.removeChild(optionsUL);
    }
    changeStatusTo(message);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(1);
        }, milliseconds);
    });
}

async function displayAttackResult(attacker, defender, skill) {
    await displayForMilliseconds(attacker.name + " used " + skill.name + " on " + defender.name);
    let didHit = attacker.attack(skill.name, defender)
    let message = (didHit) ? 
        "It did " + skill.basePower + " damage!" :
        "But it missed!";
    if (didHit) {
        if (attacker === player) {
            await animatePlayerAttack();
        }
        else {
            await animateEnemyAttack();
        }
        updateMonInfo();
    }
    await displayForMilliseconds(message);  
    return stopAnimation(playerAnimationFrame);
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
            await displayForMilliseconds("Haven't implemented that yet. Sorry!");
            goToMainMenu();
    }
}

function goToEnemyTurn() {
    return displayAttackResult(enemyMon, player, SKILL_LIST[randomChoiceFrom(enemyMon.skills)]);
}

const PLAYER_DEFAULT_X = canvas.width/5;
const PLAYER_DEFAULT_Y = canvas.height*(2/5);
let playerx = PLAYER_DEFAULT_X;
let playery = PLAYER_DEFAULT_Y;

let playerAnimationFrame;

const ENEMY_DEFAULT_X = canvas.width * (3/4);
const ENEMY_DEFAULT_Y = canvas.height / 8;
let enemyx = ENEMY_DEFAULT_X;
let enemyy = ENEMY_DEFAULT_Y;

let enemyAnimationFrame;

function drawBattleScene() {
    ctx.drawImage(battleBackground, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(enemyMon.image, enemyx, enemyy, 100, 100);
    ctx.drawImage(player.image, playerx, playery, 150, 150);
}


function animatePlayerAttack() {
    playerx += 20;
    playery -= 10;
    
    drawBattleScene();
    playerAnimationFrame = window.requestAnimationFrame(animatePlayerAttack);

    return new Promise( (resolve) => {
        setTimeout( () => {
            stopAnimation(playerAnimationFrame)
            resolve(1);
        }, 250);
    });
}

function animateEnemyAttack() {
    enemyx -= 20;
    enemyy += 10;
    
    drawBattleScene();
    enemyAnimationFrame = window.requestAnimationFrame(animateEnemyAttack);

    return new Promise( (resolve) => {
        setTimeout( () => {
            stopAnimation(enemyAnimationFrame)
            resolve(1);
        }, 250);
    });
}

function stopAnimation(frame) {
    window.cancelAnimationFrame(frame);
    playerx = PLAYER_DEFAULT_X;
    playery = PLAYER_DEFAULT_Y;
    enemyx = ENEMY_DEFAULT_X;
    enemyy = ENEMY_DEFAULT_Y;
    drawBattleScene();

    return Promise.resolve(1);
}

battleBackground.onload = () => {
    drawBattleScene();
};
updateMonInfo();