import { skills } from "./skills.js"
import { flags } from "./flags.js"
import { upgrades } from "./upgrades.js"
import { actions } from "./actions.js"

const initialGame = {
    lives: 1,
    age: 6 * 365,
    bodyLevel: 3,
    body: 0,
    nextBodyGain: 8 * 365,
    spirit: 0,
    spiritLevel: 0,
    comfort: 1,
    coin: 0,
    buySupplies1: false,
    buySupplies2: false,
    startDeath: 50 * 365,
    healthLost: 0,
    nextHealthDecrease: 6*365,
    isPaused: true,
    isDead: false,

    skills,
    flags,
    upgrades,

    activeAction: null,

    globalMult: 10,
}

export const game = { ... initialGame}



const startingGame = {
    spiritLevel: game.spiritLevel,
    skills: Object.fromEntries(
        Object.entries(game.skills).map(([key, skill]) => [
            key, 
            {
                name: skill.name,
                knowledgeLevel: skill.knowledgeLevel
            },
           
        ])
    )
}

export function recordStartingGame(){
    startingGame.spiritLevel = game.spiritLevel;
    startingGame.skills = Object.fromEntries(
        Object.entries(game.skills).map(([key, skill]) => [
            key, 
            {
                name: skill.name,
                knowledgeLevel: skill.knowledgeLevel
            },
           
        ])
    )
}

export function getGameChanges(){
    let changes = [];

    const spiritChange = game.spiritLevel - startingGame.spiritLevel

    if (spiritChange >= 1) changes.push(`+${spiritChange} Spirit`);

    for (const [key, skill] of Object.entries(game.skills)) {
        const startingSkill = startingGame.skills[key];

        const knowledgeChange = skill.knowledgeLevel - startingSkill.knowledgeLevel

        if (knowledgeChange >= 1) changes.push(`+${knowledgeChange} ${skill.name} Knowledge`);

    }

    console.log("test")

    return changes;
}

export function resetGame(){
    game.age = initialGame.age;
    game.bodyLevel = initialGame.bodyLevel;
    game.body = initialGame.body;
    game.startDeath = initialGame.startDeath;
    game.healthLost = initialGame.healthLost;
    game.nextHealthDecrease = initialGame.nextHealthDecrease;
    game.coin = initialGame.coin;
    game.nextBodyGain = initialGame.nextBodyGain;
    game.comfort = initialGame.comfort;
    game.buySupplies1 = initialGame.buySupplies1;
    game.buySupplies2 = initialGame.buySupplies2;

    game.spirit = initialGame.spirit;

    game.isDead = false;
    game.isPaused = true;
    game.activeAction = null;

    game.lives++;

    for (const skill of Object.values(game.skills)) {
        skill.experience = 0;
        skill.experienceLevel = 0;
        skill.experienceUpgrade = 1;
        skill.knowledgeUpgrade = 1;
        skill.coinUpgrade = 1;
        skill.bodyUpgrade = 1;
        skill.spiritUpgrade = 1;
    }

    for (const action of actions) {
        action.unlocked = false;
    }

    for (const upgrade of Object.values(game.upgrades)) {
        upgrade.unlocked = false;
        upgrade.bought = false;
    }
}