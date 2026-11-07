class Skill {
    constructor({
        name,
        experience = 0,
        experienceLevel = 0,
        knowledge = 0,
        knowledgeLevel = 0,
        unlocked = false,
        experienceUpgrade = 1,
        knowledgeUpgrade = 1,
        coinUpgrade = 1,
        bodyUpgrade = 1,
        spiritUpgrade = 1,
        unlockedReq,

    }) {
        this.name = name;
        this.experience = experience;
        this.experienceLevel = experienceLevel;
        this.knowledge = knowledge;
        this.knowledgeLevel = knowledgeLevel;
        this.unlocked = unlocked;
        this.experienceUpgrade = experienceUpgrade;
        this.knowledgeUpgrade = knowledgeUpgrade;
        this.coinUpgrade = coinUpgrade;
        this.bodyUpgrade = bodyUpgrade;
        this.spiritUpgrade = spiritUpgrade;
        this.unlockReq = unlockedReq;
    }
}

const farming = new Skill({
    name: "Farming",
    experienceLevel: 0,
    knowledgeLevel: 0,
    unlocked: true,
})


const smithing = new Skill({
    name: "Smithing",
    experienceLevel: 0,
    knowledgeLevel: 0,
    unlocked: false,
    unlockedReq: (game) => game.flags.unlockSmithing.value,
})

const fighting = new Skill({
    name: "Fighting",
    experienceLevel: 0,
    knowledgeLevel: 0,
    unlocked: false,
    unlockedReq: (game) => game.flags.unlockFighting.value,
})

const exploring = new Skill({
    name: "Exploring",
    experienceLevel: 0,
    knowledgeLevel: 0,
    unlocked: false,
    unlockedReq: (game) => game.flags.unlockExploring.value
})

const trading = new Skill({
    name: "Trading",
    experienceLevel: 0,
    knowledgeLevel: 0,
    unlocked: false,
    unlockedReq: (game) => game.flags.unlockTrading.value
})

const meditating = new Skill({
    name: "Meditating",
    experienceLevel: 0,
    knowledgeLevel: 0,
    unlocked: false,
    unlockedReq: (game) => game.flags.unlockMeditating.value
})


export const skills = {
    farming,
    smithing,
    fighting,
    exploring,
    trading,
    meditating,
}

export function unlockSkills(game){
    let changed = false;
    for (const skill of Object.values(game.skills)) {
            if(!skill.unlocked && skill.unlockReq?.(game)) {
                changed = true;
                skill.unlocked = true;
            }
        }
    return changed;
}