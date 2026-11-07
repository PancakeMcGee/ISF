import { getGameChanges } from "./game.js";

// Stats
const ageValue = document.getElementById("age-value");
const comfortValue = document.getElementById("comfort-value");
const bodyValue = document.getElementById("body-value");
const coinValue = document.getElementById("coin-value");
const coinRow = document.getElementById("coin-row");
const spiritValue = document.getElementById("spirit-value");
const spiritRow = document.getElementById("spirit-row");
const bodyFill = document.getElementById("body-bar-fill")
const spiritFill = document.getElementById("spirit-bar-fill")

// Skills
const skillList = document.getElementById("skill-container");
// Active Action display
const activeActionContainer = document.getElementById("active-container");
const activeActionName = document.getElementById("active-name");
const activeSkillName = document.getElementById("active-skill");
// Active Action Xp and bars
const experienceContainer = document.getElementById("experience-container");
const knowledgeContainer = document.getElementById("knowledge-container");
const experiencePercent = document.getElementById("experience-percent");
const knowledgePercent = document.getElementById("knowledge-percent");
const experienceFill = document.getElementById("experience-bar-fill");
const knowledgeFill = document.getElementById("knowledge-bar-fill");
// Action list
const actionList = document.getElementById("action-list");
// Upgrade list
const upgradeList = document.getElementById("upgrade-list");
// Death overlay
const deathScreen = document.getElementById("death");
const deathOverlay = document.getElementById("overlay");
const deathChanges = document.getElementById("changes");
// Speed buttons
const pauseButton = document.getElementById("pause-button");
const playButton = document.getElementById("play-button");
const x2Button = document.getElementById("2x-button");
const x5Button = document.getElementById("5x-button");
// Supplies buttons
const suppliesButton1 = document.getElementById("supplies-button1");
const suppliesButton2 = document.getElementById("supplies-button2");
const shopContainer = document.getElementById("shop-container");
// Settings
const settings = document.getElementById("settings");
const overlay2 = document.getElementById("overlay2");
const exportContainer = document.getElementById("export-container");
const importContainer = document.getElementById("import-container");
// Lore
const loreContainer = document.getElementById("lore-container");
const loreText = document.getElementById("lore-text");
const loreGain = document.getElementById("lore-gain");
const oldLore = document.getElementById("old-lore");


export function drawPause(speed){// When game.isPause changes
    pauseButton.style.backgroundColor = speed === 0 ? "var(--outline)" : "transparent"
    playButton.style.backgroundColor = speed === 1 ? "var(--outline)" : "transparent"
    x2Button.style.backgroundColor = speed === 2 ? "var(--outline)" : "transparent"
    x5Button.style.backgroundColor = speed === 5 ? "var(--outline)" : "transparent"

}

function drawStats(game){//Every tick

    const year = Math.floor(game.age / 365);
    const comfort = game.comfort;
    const body = Math.floor(game.bodyLevel);
    const coin = Math.floor(game.coin);

    ageValue.textContent = year;

    if(comfort >= 1){
        comfortValue.textContent = "Good";
        comfortValue.classList.add("green");
        comfortValue.classList.remove("red");
    } else {
        comfortValue.textContent = "Bad";
        comfortValue.classList.add("red");
        comfortValue.classList.remove("green");

    }

    bodyValue.textContent = body;

    const bodyCap = game.bodyLevel >= 10 ? game.bodyLevel ** 2 : 100;
    const spiritCap = (game.spiritLevel + 1) * (game.spiritLevel + 2) / 2 * 100;


    const bodyPercent = game.body / bodyCap * 100;
    const bodyLostPercent = (game.healthLost % 20) / 20 * 100
    const spiritPercent = game.spirit / spiritCap * 100;

    if(game.age < game.startDeath && (game.comfort >= 1 || game.age <= 16 * 365)){
        bodyFill.style.width = `${bodyPercent}%`;
        bodyFill.style.backgroundColor = "var(--xp-filled)";

    } else {
        bodyFill.style.width = `${bodyLostPercent}%`;
        bodyFill.style.backgroundColor = "var(--red)"
    }

    spiritFill.style.width = `${spiritPercent}%`;

    coinRow.hidden = !game.flags.showCoins.value;
    coinValue.textContent= coin;

    spiritRow.hidden = !game.flags.unlockMeditating.value;
    spiritValue.textContent= game.spiritLevel;

    skillList.innerHTML = "<h2>Skills</h2>";

    for (const skill of Object.values(game.skills)) {
        if (!skill.unlocked) continue;

        const skillRow = document.createElement("div");
        skillRow.classList.add("skill-row");
        
        const name = document.createElement("h4");
        name.textContent = `${skill.name}`;

        const info = document.createElement("span");
        info.textContent = `${skill.experienceLevel} / ${skill.knowledgeLevel}`

        skillRow.append(name, info);
        skillList.appendChild(skillRow);
    }
   
}

export function drawActiveAction(game){// When they change
    const action = game.activeAction;

    if (!action) {
        activeActionContainer.hidden = true;
        return;
    } 

    activeActionContainer.hidden = false;

    activeActionName.textContent = action.name;
    activeSkillName.textContent = game.skills[action.skill]?.name ?? "None";
}

function drawSkillProgression(game){// Every tick

    const action = game.activeAction;

    if (!action || !game.skills[action.skill]) {
        experienceContainer.hidden = true;
        knowledgeContainer.hidden = true;
        return;
    } 

    experienceContainer.hidden = false;
    knowledgeContainer.hidden = false;
    
    const skill = game.skills[action.skill];

    const softCap1 = skill.experienceLevel >= 10 ? skill.experienceLevel ** 0.5 : 1;
    const softCap2 = skill.knowledgeLevel >= 10 ? skill.knowledgeLevel ** 0.5 : 1;

    const experienceCap = (skill.experienceLevel + 1) ** 2 * 100 * softCap1;
    const knowledgeCap = (skill.knowledgeLevel + 1) ** 2 * 50 * softCap2;

    experiencePercent.textContent = `${Math.floor(skill.experience)} / ${Math.floor(experienceCap)}`;
    knowledgePercent.textContent = `${Math.floor(skill.knowledge)} / ${Math.floor(knowledgeCap)}`;

    const experience = skill.experience / experienceCap * 100;
    const knowledge = skill.knowledge / knowledgeCap * 100;

    experienceFill.style.width = `${experience}%`;
    knowledgeFill.style.width = `${knowledge}%`;

}

export function drawDeath(game){// When death and rebirth
    deathScreen.hidden = !game.isDead;
    deathOverlay.hidden = !game.isDead;

    const changes = getGameChanges();

    deathChanges.innerHTML = ""

    for (const change of changes) {
        const info = document.createElement("h3");

        info.textContent = change
        deathChanges.append(info)
    }
    
}

export function drawSettings(){
    if (settings.hidden){
        settings.hidden = false;
        deathOverlay.hidden = false;
    } else {
        settings.hidden = true;
        deathOverlay.hidden = true;
    }
}

export function drawExport(){
    if (exportContainer.hidden){
        exportContainer.hidden = false;
        overlay2.hidden = false;
    } else {
        exportContainer.hidden = true;
        overlay2.hidden = true;
    }
}

export function drawImport(){
    if (importContainer.hidden){
        importContainer.hidden = false;
        overlay2.hidden = false;
    } else {
        importContainer.hidden = true;
        overlay2.hidden = true;
    }
}

export function drawActions(game, actions){// When things change
    actionList.innerHTML = "<h2>Available Actions</h2>";

    const unlockedActions = actions.filter(action => action.unlocked && action !== game.activeAction);

    unlockedActions.forEach(action => {
        const button = document.createElement("button");

        button.type = "button";
        button.dataset.action = action.id;
        button.classList.add("action-button");

        const name = document.createElement("div");
        name.classList.add("action-name");
        name.textContent = action.name;

        const skill = document.createElement("div");
        skill.classList.add("action-skill");
        skill.textContent = game.skills[action.skill]?.name ?? "None";

        const stats = document.createElement("div");
        stats.classList.add("action-stats");

        if (action.experienceGain !== 0) {
            const statSkill = document.createElement("span");
            if (action.experienceGain > 0) {
                statSkill.textContent = `+${game.skills[action.skill]?.name ?? "None"}`;
                statSkill.classList.add("green")
            } else {
                statSkill.textContent = `-${game.skills[action.skill]?.name ?? "None"}`;
                statSkill.classList.add("red")
            }
            stats.append(statSkill);
        }      

        if(action.bodyGain !== 0) {
            const statBody = document.createElement("span");
            if (action.bodyGain > 0) {
                statBody.textContent = `+Body`;
                statBody.classList.add("green");
            } else {
                statBody.textContent = `-Body`;
                statBody.classList.add("red"); 
            }
            stats.append(statBody);
        }

        const showCoin = (game.skills[action.skill]?.experienceLevel ?? 1) >= action.startCoinGain;
        
        if (action.coinGain !== 0 && showCoin) {
            const statCoin = document.createElement("span");
            if (action.coinGain > 0) {
                statCoin.textContent = `+Coin`;
                statCoin.classList.add("green")
            } else{
                statCoin.textContent = `-Coin`;
                statCoin.classList.add("red")
            }
            stats.append(statCoin);
        }
        
        if (true) {
            const statComfort = document.createElement("span");
            if (action.baseComfort > 0) {
                statComfort.textContent = `+Comfort`;
                statComfort.classList.add("green")
            } else {
                statComfort.textContent = `-Comfort`;
                statComfort.classList.add("red")
            }
            stats.append(statComfort);
        }

        
        
        button.append(name, skill, stats);
        actionList.appendChild(button);
    })
}

export function drawUpgrades(game){// When things change
    upgradeList.innerHTML = "<h3>Upgrades</h3>";
    const unlockedUpgrades = Object.values(game.upgrades).filter(upgrade => upgrade.unlocked  && !upgrade.bought);
    

    unlockedUpgrades.forEach(upgrade => {
        const button = document.createElement("button");

        button.type = "button"
        button.dataset.action = upgrade.id;
        button.classList.add("upgrade-button");

        const name = document.createElement("div");
        name.classList.add("upgrade-name");
        name.textContent = upgrade.name;

        const skill = document.createElement("div");
        skill.classList.add("upgrade-skill");
        skill.textContent = game.skills[upgrade.skill]?.name ?? "None";

        const cost = document.createElement("div");
        cost.classList.add("upgrade-cost");
        cost.textContent = `${upgrade.coinCost} Coins`;

        const stats = document.createElement("div");
        stats.classList.add("upgrade-stats");

        if(upgrade.experienceMult !== 1) {
            const statExperience = document.createElement("span");
            statExperience.textContent = `+Experience`
            statExperience.classList.add("green");
            stats.append(statExperience);
        }

        if(upgrade.knowledgeMult !== 1) {
            const statKnowledge = document.createElement("span");
            statKnowledge.textContent = `+Knowledge`
            statKnowledge.classList.add("green");
            stats.append(statKnowledge);
        }

        if(upgrade.coinMult !== 1) {
            const statCoin = document.createElement("span");
            statCoin.textContent = `+Coin`
            statCoin.classList.add("green");
            stats.append(statCoin);
        }

        if(upgrade.bodyMult !== 1) {
            const statBody = document.createElement("span");
            statBody.textContent = `+Body`
            statBody.classList.add("green");
            stats.append(statBody);
        }

        button.append(name, skill, cost, stats);
        upgradeList.appendChild(button);
    })
}

export function drawSupplies1(game){// When supplies change
    const color = !game.buySupplies1 ? 'var(--bg-color)' : 'var(--outline)';
    suppliesButton1.style.setProperty('background-color', color);
}

export function drawSupplies2(game){// When supplies change
    const color = !game.buySupplies2 ? 'var(--bg-color)' : 'var(--outline)';
    suppliesButton2.style.setProperty('background-color', color);
}

function drawShop(game){
        if(game.flags.showCoins.value && shopContainer.hidden) {
            shopContainer.hidden = false;
        }

        if(game.flags.unlockSmithing.value && suppliesButton1.hidden) {
            suppliesButton1.hidden = false;
        }
    
        if(game.flags.unlockSupplies2.value && suppliesButton2.hidden) {
            suppliesButton2.hidden = false;
        }
}

export function drawLore(lore){
    loreText.innerHTML = lore.text;

    loreGain.innerHTML = ""

    for (const text of lore.gain) {
        const gainText = document.createElement("p");

        gainText.classList.add("green");
        gainText.textContent = text;

        loreGain.append(gainText);
    }

    loreContainer.hidden = false;
    deathOverlay.hidden = false;

    const p = document.createElement("p");
    p.textContent = lore.text.replace("<br> <br>", "");

    oldLore.append(p);

}

export function hideLore(){
    loreContainer.hidden = true;
    deathOverlay.hidden = true;

}

export function drawLists(game, actions){
    drawActions(game, actions);
    drawUpgrades(game);
}



export function draw(game) {
    drawShop(game);
    drawStats(game);
    drawSkillProgression(game);
    drawActiveAction(game); 
}