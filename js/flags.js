class Flag {
    constructor({
        value = false,
        requirement,
    }) {
        this.value = value;
        this.requirement = requirement;
    }
}

export const flags = {
    showCoins: new Flag({
        value: false,
        requirement: (game) => game.coin > 0,
    }),
    unlockSmithing: new Flag({
        value: false,
        requirement: (game) => (game.coin >= 100 && game.lives >= 5)
    }),
    unlockFighting: new Flag({
        value: false,
        requirement: (game) => game.age >= 16 * 365 && (game.bodyLevel >= 15 || game.skills.fighting.experienceLevel >= 2)
    }),
    unlockSynergy: new Flag({
        value: false,
        requirement: (game) => knowledgeTotal(game) >= 30
    }),
    uncapBody20: new Flag({
        value: false,
        requirement: (game) => game.skills.fighting.experienceLevel >= 12,
    }),
    unlockExploring: new Flag({
        value: false,
        requirement: (game) => game.bodyLevel >= 15 && game.skills.fighting.experienceLevel >= 4,
    }),
    unlockMeditating: new Flag({
        value: false,
        requirement: (game) => game.skills.farming.experienceLevel >= 12 && game.age <= 7*365,
    }),  
    unlockTrading: new Flag({
        value: false,
        requirement: (game) => game.coin >= 5000,
    }),  
    unlockSupplies2: new Flag({
        value: false,
        requirement: (game) => game.skills.trading.knowledgeLevel >= 6,
    }),  

}

function knowledgeTotal(game) {
    let sum = 0;

    for (const skill of Object.values(game.skills)){
        sum += skill.knowledgeLevel;
    }

    return sum;
}

export function unlockFlags(game){
    let changed = false;
    for (const flag of Object.values(flags)) {
    
            if (!flag.value && flag.requirement(game)) {
                changed = true;
                flag.value = true;
            }
        }
    return changed;
}