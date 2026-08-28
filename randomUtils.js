export function didHitWithPercentChance(percent) {
    return randInt(101) < percent;
}

export function randInt(nonInclusiveMax) {
    return Math.floor(Math.random() * nonInclusiveMax);
}

export function randIntInRange(min, nonInclusiveMax) {
    return Math.floor(Math.random() * (nonInclusiveMax - min) + min);
}

export function randomChoiceFrom(array) {
    return array[randInt(array.length)];
}