export class Mon {
    constructor({name, maxHP, moves: skills, imgPath}) {
        this.name = name;
        this.maxHP = maxHP;
        this.currentHP = this.maxHP;
        this.skills = skills;
        this.image = new Image();
        this.image.src = imgPath;
    }
}

export const REDEYE = {
    name: "Redeye",
    maxHP: 50,
    skills: ['Scratch', 'Growl'],
    imgPath: 'img\\enemy-sprite.png'
};

export const TRIANGREEN = {
    name: "Triangreen",
    maxHP: 100,
    skills: ['Scratch', 'Tail Whip', 'Spark', 'Tackle'],
    imgPath: 'img\\item-sprite.png'
};