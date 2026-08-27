// TODO: implement status effects

export class Skill {
    constructor({name, basePower, chanceToHit}) {
        this.name = name;
        this.basePower = basePower;
        this.chanceToHit = chanceToHit;
    }
}

export const SKILL_LIST = {
    Scratch: {
        name: "Scratch",
        basePower: 10,
        chanceToHit: 90,
    },

    Spark: {
        name: "Spark",
        basePower: 20,
        chanceToHit: 80
    },

    TailWhip: {
        name: "TailWhip",
        basePower: 0,
        chanceToHit: 90
    },

    Tackle: {
        name: "Tackle",
        basePower: 5,
        chanceToHit: 100
    },

    Growl: {
        name: "Growl",
        basePower: 0,
        chanceToHit: 90
    }
};