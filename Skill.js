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
    }
};