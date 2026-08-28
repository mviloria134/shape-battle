import { SKILL_LIST } from "./Skill.js";
import { didHitWithPercentChance, randomChoiceFrom } from "./randomUtils.js";

export class Mon {
    constructor({name, maxHP, skills, imgPath}) {
        this.name = name;
        this.maxHP = maxHP;
        this.currentHP = this.maxHP;
        this.skills = skills;
        this.image = new Image();
        this.image.src = imgPath;
    }

    attack(skillName, defender) {
        if (!(skillName in SKILL_LIST)) {
            return -1;
        }
        let skill = SKILL_LIST[skillName]
        
        let didHit = didHitWithPercentChance(skill.chanceToHit);

        if (didHit) {
            defender.currentHP -= skill.basePower;
        }

        return didHit ? 1 : 0;
    }

    randomAttack(defender) {
        this.attack(randomChoiceFrom(this.skills), defender);
    }
}

export const MONS_LIST = {
    REDEYE: {
        name: "Redeye",
        maxHP: 50,
        skills: ['Scratch', 'Growl'],
        imgPath: 'img\\enemy-sprite.png'
    },
    TRIANGREEN: {
        name: "Triangreen",
        maxHP: 100,
        skills: ['Scratch', 'TailWhip', 'Spark', 'Tackle'],
        imgPath: 'img\\item-sprite.png'
    }
};