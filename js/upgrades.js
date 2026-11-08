class Upgrade {
    constructor({
        id,
        name,
        skill,
        experienceMult = 1,
        knowledgeMult = 1,
        coinMult = 1,
        bodyMult = 1,
        spiritMult = 1,
        coinCost,
        smithingSynergy = false,
        unlockReq,
        unlocked = false,
        bought = false,

    }) {
        this.id = id;
        this.name = name;
        this.skill = skill;
        this.experienceMult = experienceMult;
        this.knowledgeMult = knowledgeMult;
        this.coinMult = coinMult;
        this.bodyMult = bodyMult;
        this.spiritMult = spiritMult;
        this.coinCost = coinCost;
        this.smithingSynergy = smithingSynergy;
        this.unlockReq = unlockReq;
        this.unlocked = unlocked;
        this.bought = bought;
    }
}

const farmingUpgrade1 = new Upgrade({
    id: "farmingUpgrade1",
    name: "Buy New Tools",
    skill: "farming",
    experienceMult: 1.5,
    knowledgeMult: 1.2,
    coinMult: 1.5,
    smithingSynergy: true,
    coinCost: 50,
    unlockReq: (game) => game.skills.farming.experienceLevel >= 2,
})

const farmingUpgrade2 = new Upgrade({
    id: "farmingUpgrade2",
    name: "Improve Farm Buildings",
    skill: "farming",
    experienceMult: 1.5,
    knowledgeMult: 1.2,
    coinMult: 1.2,
    coinCost: 200,
    unlockReq: (game) => farmingUpgrade1.bought && game.skills.farming.experienceLevel >= 4,
})

const farmingUpgrade3 = new Upgrade({
    id: "farmingUpgrade3",
    name: "Hire Farm Hands",
    skill: "farming",
    experienceMult: 1.5,
    knowledgeMult: 1.2,
    coinMult: 1.2,
    coinCost: 600,
    unlockReq: (game) => farmingUpgrade2.bought && game.skills.farming.experienceLevel >= 6,
})

const farmingUpgrade4 = new Upgrade({
    id: "farmingUpgrade4",
    name: "Buy More Land",
    skill: "farming",
    experienceMult: 1.5,
    knowledgeMult: 1.2,
    coinCost: 5000,
    unlockReq: (game) => farmingUpgrade3.bought && game.skills.trading.knowledgeLevel >= 8,
})


const smithingUpgrade1 = new Upgrade({
    id: "smithingUpgrade1",
    name: "Buy Quality Tools",
    skill: "smithing",
    experienceMult: 1.5,
    knowledgeMult: 1.2,
    coinMult: 1.5,
    smithingSynergy: true,
    coinCost: 100,
    unlockReq: (game) => game.skills.smithing.experienceLevel >= 4,
})

const smithingUpgrade2 = new Upgrade({
    id: "smithingUpgrade2",
    name: "Improve Forge",
    skill: "smithing",
    experienceMult: 1.5,
    knowledgeMult: 1.2,
    coinMult: 1.5,
    coinCost: 500,
    unlockReq: (game) => smithingUpgrade1.bought && game.skills.smithing.experienceLevel >= 6,
})

const smithingUpgrade3 = new Upgrade({
    id: "smithingUpgrade3",
    name: "Buy Rare Materials",
    skill: "smithing",
    experienceMult: 1.5,
    knowledgeMult: 1.2,
    smithingSynergy: true,
    coinCost: 2500,
    unlockReq: (game) => smithingUpgrade2.bought && game.skills.trading.knowledgeLevel >= 8,
})

const fightingUpgrade1 = new Upgrade({
    id: "fightingUpgrade1",
    name: "Buy Quality Weapons",
    skill: "fighting",
    experienceMult: 1.5,
    smithingSynergy: true,
    coinCost: 150,
    unlockReq: (game) => game.skills.fighting.experienceLevel >= 4 && game.coin >= 10,
})

const fightingUpgrade2 = new Upgrade({
    id: "fightingUpgrade2",
    name: "Buy Quality Armor",
    skill: "fighting",
    experienceMult: 1.5,
    smithingSynergy: true,
    coinCost: 250,
    unlockReq: (game) => game.skills.fighting.experienceLevel >= 5,
})

const fightingUpgrade3 = new Upgrade({
    id: "fightingUpgrade3",
    name: "Buy Artifacts",
    skill: "fighting",
    experienceMult: 1.5,
    knowledgeMult: 1.2,
    smithingSynergy: true,
    coinCost: 2000,
    unlockReq: (game) => fightingUpgrade1.bought && fightingUpgrade2.bought && game.skills.trading.knowledgeLevel >= 8,
})

const exploringUpgrade1 = new Upgrade({
    id: "exploringUpgrade1",
    name: "Buy Exploration Gear",
    skill: "exploring",
    experienceMult: 1.5,
    knowledgeMult: 1.2,
    smithingSynergy: true,
    coinCost: 200,
    unlockReq: (game) => game.skills.exploring.experienceLevel >= 2,
})

const exploringUpgrade2 = new Upgrade({
    id: "exploringUpgrade2",
    name: "Buy Exploration Map",
    skill: "exploring",
    experienceMult: 1.5,
    knowledgeMult: 1.2,
    coinCost: 800,
    unlockReq: (game) => game.skills.exploring.experienceLevel >= 6,
})

const tradingUpgrade1 = new Upgrade({
    id: "tradingUpgrade1",
    name: "Improve Storefront",
    skill: "trading",
    experienceMult: 1.5,
    knowledgeMult: 1.2,
    coinMult: 2,
    coinCost: 200,
    unlockReq: (game) => game.skills.trading.experienceLevel >= 4,
})

const tradingUpgrade2 = new Upgrade({
    id: "tradingUpgrade2",
    name: "Hire More Employees",
    skill: "trading",
    experienceMult: 1.5,
    knowledgeMult: 1.2,
    coinMult: 1.5,
    coinCost: 1200,
    unlockReq: (game) => game.skills.trading.experienceLevel >= 6,
})

const meditatingUpgrade1 = new Upgrade({
    id: "meditatingUpgrade1",
    name: "Buy Meditation Mat",
    skill: "meditating",
    experienceMult: 1.5,
    knowledgeMult: 1.5,
    spiritMult: 1.5,
    coinCost: 200,
    unlockReq: (game) => game.skills.meditating.experienceLevel >= 2 && game.skills.trading.knowledgeLevel >= 4,
})

export const upgrades = {
    farmingUpgrade1, farmingUpgrade2, farmingUpgrade3, farmingUpgrade4, 
    smithingUpgrade1, smithingUpgrade2, smithingUpgrade3,
    fightingUpgrade1, fightingUpgrade2, fightingUpgrade3,
    exploringUpgrade1, exploringUpgrade2,
    tradingUpgrade1, tradingUpgrade2,
    meditatingUpgrade1}

export function unlockUpgrades(game){
    let changed = false;
    for (const upgrade of Object.values(game.upgrades)) {
            if(!upgrade.unlocked && upgrade.unlockReq?.(game)) {
                changed = true;
                upgrade.unlocked = true;
            }
        }
    return changed;
}

export function buyUpgrade(buttonData, game){
    const upgrade = Object.values(game.upgrades).find(upgrade => upgrade.id === buttonData)
        
    
        if(game.coin >= upgrade.coinCost) {
            game.coin -= upgrade.coinCost;
    
            const skill = game.skills[upgrade.skill];
    
            const synergyMult = game.flags.unlockSynergy.value && game.skills.smithing.knowledgeLevel >= 8 && upgrade.smithingSynergy
            ? 1 + game.skills.smithing.experienceLevel * 1/25 : 1
    
            skill.experienceUpgrade *= upgrade.experienceMult * synergyMult;
            skill.knowledgeUpgrade *= upgrade.knowledgeMult * synergyMult;
            skill.coinUpgrade *= upgrade.coinMult;
            skill.bodyUpgrade *= upgrade.bodyMult;
            skill.spiritUpgrade *= upgrade.spiritMult;
    
            upgrade.bought = true;

            return true;
        }
    return false;
}