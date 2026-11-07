class Action{
    constructor({
        id,
        name,
        skill = null,
        experienceGain = 0,
        knowledgeGain = 0,
        bodyGain = 0,
        spiritGain = 0,
        coinGain = 0,
        startCoinGain = 0,
        baseComfort = 0,
        unlocked,
        unlockReq,
        hideReq,
    }) {
        this.id = id;
        this.name = name;
        this.skill = skill;
        this.experienceGain = experienceGain;
        this.knowledgeGain = knowledgeGain;
        this.bodyGain = bodyGain;
        this.spiritGain = spiritGain;
        this.coinGain = coinGain;
        this.startCoinGain = startCoinGain;
        this.baseComfort = baseComfort;
        this.unlocked = unlocked;
        this.unlockReq = unlockReq;
        this.hideReq = hideReq;
    }
}

const farming1 = new Action({
    id: "farming1",
    name: "Learn to Farm",
    skill: "farming",
    experienceGain: 1/100,
    knowledgeGain: 1/250,
    bodyGain: 100/(20*365),
    coinGain: 0,
    baseComfort: 0,
    unlocked: false,
    unlockReq: (game) => game.age >= 6*365,
    hideReq: (game) => game.age >= 16*365
});

const farming2 = new Action({
    id: "farming2",
    name: "Tend the Fields",
    skill: "farming",
    experienceGain: 1/50,
    knowledgeGain: 1/125,
    bodyGain: 100/(10*365),
    coinGain: 1/90,
    startCoinGain: 3,
    baseComfort: 1,
    unlocked: false,
    unlockReq: (game) => game.age >= 16*365,
    hideReq: (game) => farming3.unlocked,
});

const farming3 = new Action ({
    id: "farming3",
    name: "Run the Farm",
    skill: "farming",
    experienceGain: 1/25,
    knowledgeGain: 1/50,
    bodyGain: 100/(10*365),
    coinGain: 1/30,
    startCoinGain: 8,
    baseComfort: 2,
    unlocked: false,
    unlockReq: (game) => game.skills.farming.experienceLevel >= 8 && game.upgrades.farmingUpgrade3.bought,
});

const smithing1 = new Action({
    id: "smithing1",
    name: "Serve the Smith",
    skill: "smithing",
    experienceGain: 1/50,
    knowledgeGain: 1/150,
    bodyGain: 100/(6*365),
    coinGain: -1/20,
    baseComfort: 0,
    unlocked: false,
    unlockReq: (game) => game.flags.unlockSmithing.value && game.age >= 16*365,
    hideReq: (game) => smithing2.unlocked || smithing3.unlocked,
});

const smithing2 = new Action({
    id: "smithing2",
    name: "Learn to Smith",
    skill: "smithing",
    experienceGain: 1/45,
    knowledgeGain: 1/100,
    bodyGain: 100/(6*365),
    coinGain: 0,
    baseComfort: 1,
    unlocked: false,
    unlockReq: (game) => game.skills.smithing.knowledgeLevel >= 1 && game.age >= 12 * 365,
    hideReq: (game) => game.age >= 22 * 365,
});

const smithing3 = new Action({
    id: "smithing3",
    name: "Man the Forge",
    skill: "smithing",
    experienceGain: 1/50,
    knowledgeGain: 1/50,
    bodyGain: 100/(5*365),
    coinGain: 1/50,
    startCoinGain: 2,
    baseComfort: 0,
    unlocked: false,
    unlockReq: (game) => game.skills.smithing.experienceLevel >= 2 && game.age >= 16 * 365,
});

const smithing4 = new Action({
    id: "smithing4",
    name: "Forge Spirit Artifacts",
    skill: "smithing",
    experienceGain: 1/25,
    knowledgeGain: 1/50,
    bodyGain: 100/(5*365),
    coinGain: 1/50,
    startCoinGain: 2,
    baseComfort: 0,
    unlocked: false,
    unlockReq: (game) => game.skills.smithing.experienceLevel >= 12 && game.age >= 16 * 365,
});

const fighting1 = new Action({
    id: "fighting1",
    name: "Learn to Fight",
    skill: "fighting",
    experienceGain: 1/50,
    knowledgeGain: 1/125,
    bodyGain: 100/(4*365),
    coinGain: 0,
    baseComfort: 1,
    unlocked: false,
    unlockReq: (game) => game.age >= 16 * 365 && (game.bodyLevel >= 15 || game.skills.fighting.knowledgeLevel >= 2),
    hideReq: (game) => fighting2.unlocked,
});

const fighting2 = new Action({
    id: "fighting2",
    name: "Join the Watch",
    skill: "fighting",
    experienceGain: 1/50,
    knowledgeGain: 1/75,
    bodyGain: 100/(3*365),
    coinGain: 1/90,
    startCoinGain: 4,
    baseComfort: 1,
    unlocked: false,
    unlockReq: (game) => game.skills.fighting.experienceLevel >= 4,
    hideReq: (game) => fighting3.unlocked,
});

const fighting3 = new Action({
    id: "fighting3",
    name: "Command the Watch",
    skill: "fighting",
    experienceGain: 1/25,
    knowledgeGain: 1/50,
    bodyGain: 100/(3*365),
    coinGain: 1/20,
    startCoinGain: 10,
    baseComfort: 2,
    unlocked: false,
    unlockReq: (game) => game.skills.fighting.experienceLevel >= 10,
    //hideReq: (game) => game.age >= 22 * 365,
});

const exploring1 = new Action({
    id: "exploring1",
    name: "Explore the Outskirts",
    skill: "exploring",
    experienceGain: 1/100,
    knowledgeGain: 1/150,
    bodyGain: 100/(4*365),
    coinGain: 0,
    baseComfort: 0,
    unlocked: false,
    unlockReq: (game) => game.age >= 16 * 365 && game.bodyLevel >= 15 && game.skills.fighting.knowledgeLevel >= 4,
    hideReq: (game) => exploring2.unlocked,
});

const exploring2 = new Action({
    id: "exploring2",
    name: "Explore the Forest",
    skill: "exploring",
    experienceGain: 1/50,
    knowledgeGain: 1/75,
    bodyGain: 100/(4*365),
    coinGain: 0,
    baseComfort: 0,
    unlocked: false,
    unlockReq: (game) => game.age >= 16 * 365 && game.bodyLevel >= 18 && game.skills.fighting.knowledgeLevel >= 8,
    //hideReq: (game) => game.age >= 22 * 365,
});

const trading1 = new Action({
    id: "trading1",
    name: "Run a Stall",
    skill: "trading",
    experienceGain: 1/45,
    knowledgeGain: 1/100,
    bodyGain: 0,
    coinGain: 0,
    startCoinGain: 0,
    baseComfort: 1,
    unlocked: false,
    unlockReq: (game) => game.flags.unlockTrading.value && game.age >= 12 * 365,
    hideReq: (game) => game.age >= 22 * 365,
})

const trading2 = new Action({
    id: "trading2",
    name: "Run a Store",
    skill: "trading",
    experienceGain: 1/50,
    knowledgeGain: 1/50,
    bodyGain: 0,
    coinGain: 1/30,
    startCoinGain: 2,
    baseComfort: 0,
    unlocked: false,
    unlockReq: (game) => game.skills.trading.experienceLevel >= 2 && game.age >= 16 * 365,
    hideReq: (game) => trading3.unlocked,

});

const trading3 = new Action({
    id: "trading3",
    name: "Run a Guild",
    skill: "trading",
    experienceGain: 1/25,
    knowledgeGain: 1/50,
    bodyGain: 0,
    coinGain: 1/10,
    startCoinGain: 8,
    baseComfort: 0,
    unlocked: false,
    unlockReq: (game) => game.skills.trading.experienceLevel >= 8 && game.age >= 16 * 365,
});

const meditating1 = new Action({
    id: "meditating1",
    name: "Meditate",
    skill: "meditating",
    experienceGain: 1/50,
    knowledgeGain: 1/150,
    spiritGain: 100/(10*365),
    baseComfort: 0,
    unlocked: false,
    unlockReq: (game) => game.flags.unlockMeditating.value,
});


const nothing = new Action({
    id: "nothing",
    name: "Waste Time",
    unlocked: false,
    unlockReq: (game) => game.age >= 6*365,

});

export const actions = [
    farming1, farming2, farming3, 
    smithing1, smithing2, smithing3, 
    fighting1, fighting2, fighting3, 
    exploring1, exploring2,
    trading1, trading2, trading3,
    meditating1,
    nothing];

export function unlockActions(game){
    let changed = false;
    for (const action of actions){
            
            const shouldUnlock = (action.unlockReq?.(game) && !action.hideReq?.(game));
    
            if (action.unlocked !== shouldUnlock) changed = true;
    
            action.unlocked = shouldUnlock ? true : false;
    
        }
    return changed;
}

export function setActiveAction(game, buttonData){
    const action = actions.find(action => action.id === buttonData);

    if (!action || !action.unlocked) return false
    
    if(action.coinGain < 0 && game.coin <= action.coinGain * -1) return false;
    
    game.activeAction = action;

    game.comfort = game.age >= 16*365 ? action.baseComfort : 1; 

    if(game.comfort >= 1) {
        game.buySupplies1 = false;
        game.buySupplies2 = false;
    }

    return true;
    
}