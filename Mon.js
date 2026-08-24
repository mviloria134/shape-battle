export class Mon {
    constructor({name, maxHP, moves, imgPath}) {
        this.name = name;
        this.maxHP = maxHP;
        this.currentHP = this.maxHP;
        this.moves = moves;
        this.image = new Image();
        this.image.src = imgPath;
    }
}

export const REDEYE = {
    name: "Redeye",
    maxHP: 50,
    moves: ['Scratch', 'Growl'],
    imgPath: 'img\\enemy-sprite.png'
};

export const TRIANGREEN = {
    name: "Triangreen",
    maxHP: 100,
    moves: ['Scratch', 'Tail Whip', 'Spark', 'Tackle'],
    imgPath: 'img\\item-sprite.png'
};