const canvas = document.querySelector("#app");

canvas.width = 700;
canvas.height = 500;

const ctx = canvas.getContext('2d');

const battleBackground = new Image();
battleBackground.src = 'img\\battleBackground.png';

const enemyImg = new Image();
enemyImg.src = 'img\\enemy-sprite.png';

const playerImg = new Image();
playerImg.src = 'img\\item-sprite.png';

battleBackground.onload = () => {
    ctx.drawImage(battleBackground, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(enemyImg, canvas.width * (3/4), canvas.height / 8, 100, 100);
    ctx.drawImage(playerImg, canvas.width/5, canvas.height/2, 150, 150);
};

const options = document.querySelector('.options');
const optionButtons = options.querySelectorAll('button');

const menuOptions = ['Fight', 'Mon', 'Bag', 'Run'];
const fightOptions = ['Scratch', 'Tail Whip', 'Spark', 'Tackle'];

optionButtons.forEach(element => {
    element.addEventListener("click", () => handleOption(element.textContent))
});


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