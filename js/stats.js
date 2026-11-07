function getBodyMult(game){
    const body = game.bodyLevel;

    switch(true) {
        case body >= 10 && body < 20:
            return 1 + (body - 10) / 10;
        case body >= 20 && body < 40:
            return 2 + (body - 20) / 20;
        case body >= 40 && body < 80:
            return 3 + (body - 40) / 40;
        default:
            return 1;

    }
}

function getSpiritMult(game){
    let spiritMult = 1;

    for (const skill of Object.values(game.skills)) {
        if (skill.name !== "Meditating") {
            spiritMult *= 1 + skill.experienceLevel / 20
        }
    }

    return spiritMult;
}

function randomHealthDecrease(){
    return Math.floor(Math.random() * 37) + 36
}

export function updateStats(game){
    const action = game.activeAction;

    if (!action) return;

    const skill = game.skills[action.skill];

    const childComfort = game.age < 16*365 ? 1 : 0;
    const suppliesComfort1 = game.buySupplies1 ? 1 : 0
    const suppliesComfort2 = game.buySupplies2 ? 2 : 0


    const newComfort = Math.max(childComfort, suppliesComfort1, suppliesComfort2, action.baseComfort);

    game.comfort = newComfort;

    const suppliesCost1 = game.buySupplies1 ? 1/30 : 0;
    const suppliesCost2 = game.buySupplies2 ? 1 : 0;

    game.coin -= suppliesCost1 * game.globalMult;
    game.coin -= suppliesCost2 * game.globalMult;

    if (game.age <= 16 * 365) game.body += 100 * game.globalMult / (2 * 365)

    if (!skill) return;

    const bodyMult = getBodyMult(game);  
   
    const spiritMult = game.flags.unlockMeditating.value && game.spiritLevel > skill.experienceLevel && skill.knowledgeLevel > skill.experienceLevel ? 
    game.spiritLevel - skill.experienceLevel + 1: 1;

    const supplies2Mult = game.buySupplies2 ? 1.5 : 1
    // Experience
    const experienceMult = (skill.experienceLevel + 2) / 2 * (skill.knowledgeLevel + 1) * bodyMult * skill.experienceUpgrade;
    skill.experience += action.experienceGain * experienceMult * supplies2Mult * spiritMult * game.globalMult;
    // Knowledge
    const knowledgeMult = (skill.experienceLevel + 2) / 2 * skill.knowledgeUpgrade;
    skill.knowledge += action.knowledgeGain * knowledgeMult * supplies2Mult * game.globalMult;
    // Coins
    const coinExMult = skill.experienceLevel - action.startCoinGain <= 2 ? 
    (skill.experienceLevel - action.startCoinGain) / 2 + 1 : 
    (skill.experienceLevel - action.startCoinGain - 2) / 4 + 2 
    const synergyCoinMult = game.flags.unlockSynergy.value && skill !== game.skills.trading && game.skills.trading.knowledgeLevel >= 10
    ? 1 + (game.skills.trading.experienceLevel / 20) : 1;
    const coinMult = action.coinGain >= 0 ? coinExMult * synergyCoinMult * bodyMult * skill.coinUpgrade : 1;
    if (skill.experienceLevel >= action.startCoinGain) game.coin += action.coinGain * coinMult * game.globalMult;
    // Body
    const synergyBodyMult = game.flags.unlockSynergy.value && skill !== game.skills.fighting && game.skills.fighting.knowledgeLevel >= 10
    ? 1 + (game.skills.fighting.experienceLevel / 20) : 1;
    const bodyCap20 = !game.flags.uncapBody20.value && game.bodyLevel === 20 ? 0 : 1;
    const bodyCap20Mult = game.flags.uncapBody20.value ? 1.5 : 1
    const bodyGainMult = (skill.experienceLevel + 10) / 10 * skill.bodyUpgrade * synergyBodyMult * supplies2Mult * bodyCap20 * bodyCap20Mult;
    if (game.age < game.startDeath) game.body += action.bodyGain * bodyGainMult * game.globalMult;
    // Spirit
    const spiritGainMult = (game.skills.meditating.experienceLevel + 2) / 2 * skill.spiritUpgrade * getSpiritMult(game);
    game.spirit += action.spiritGain * spiritGainMult * game.globalMult
   
}

export function levelUp(game){
    
    const action = game.activeAction;

    let changed = false


    if (!action) return false;

    const skill = game.skills[action.skill];

    const bodyCap = game.bodyLevel >= 10 ? game.bodyLevel ** 2 : 100;


    if (game.body >= bodyCap && game.age < game.startDeath) {
        game.bodyLevel++;
        game.body = 0;
        changed = true;
    }

    if (!skill) return changed;

    const softCap1 = skill.experienceLevel >= 10 ? skill.experienceLevel ** 0.5 : 1;
    const softCap2 = skill.knowledgeLevel >= 10 ? skill.knowledgeLevel ** 0.5 : 1;


    const experienceCap = (skill.experienceLevel + 1) ** 2 * 100 * softCap1;
    const knowledgeCap = (skill.knowledgeLevel + 1) ** 2 * 50 * softCap2;
    const spiritCap = (game.spiritLevel + 1) * (game.spiritLevel + 2) / 2 * 100;


    if(skill.experience >= experienceCap){
        skill.experienceLevel++;
        skill.experience = 0;
        changed = true;
    }

    if(skill.knowledge >= knowledgeCap){
        skill.knowledgeLevel++;
        skill.knowledge = 0;
        changed = true;
    }

    if (game.spirit >= spiritCap) {
        game.spiritLevel++;
        changed = true;
    }

    return changed;

}

export function decreaseHealth(game){
    let loseHealth = 0;

    const bodyAdd = (game.bodyLevel - 10) * 2;
    const farmingAdd = game.flags.unlockSynergy.value && game.skills.farming.knowledgeLevel >= 10
    ? game.skills.farming.experienceLevel : 0;
    game.startDeath = (50 + bodyAdd + farmingAdd) * 365;

    if (game.comfort < 1) loseHealth += 2;
    if (game.age >= game.startDeath) loseHealth++;
    

    if(game.age >= game.nextHealthDecrease && loseHealth >= 1) {
        game.healthLost++;
        game.nextHealthDecrease = game.age + randomHealthDecrease() / loseHealth;
  
        if(game.healthLost % 20 === 0){
            game.bodyLevel = Math.max(3, game.bodyLevel - 1);        } 

        if(game.healthLost >= 100){

            console.log(`${game.lives} age ${Math.floor(game.age / 365)} body ${game.bodyLevel} spirit ${game.spiritLevel} coins ${Math.floor(game.coin)} farming ${game.skills.farming.experienceLevel} / ${game.skills.farming.knowledgeLevel} smithing ${game.skills.smithing.experienceLevel} / ${game.skills.smithing.knowledgeLevel} fighting ${game.skills.fighting.experienceLevel} / ${game.skills.fighting.knowledgeLevel}  exploring ${game.skills.exploring.experienceLevel} / ${game.skills.exploring.knowledgeLevel} trading ${game.skills.trading.experienceLevel} / ${game.skills.trading.knowledgeLevel} meditating ${game.skills.meditating.experienceLevel} / ${game.skills.meditating.knowledgeLevel} `)
            
            game.isPaused = true;
            game.isDead = true;
            return true;
        }
    }
}