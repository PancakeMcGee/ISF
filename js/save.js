import { game } from "./game.js"
import { actions } from "./actions.js"
import { lores } from "./lore.js";

const SAVE_KEY = "ISFGameSave";
let isResetting = false;

setInterval(saveGame, 30000)
    

window.addEventListener("beforeunload", () => {if(!isResetting){saveGame();}});

function getSaveData(){
    const {skills, flags, upgrades, activeAction, ...gameData} = game;

    const saveData = {
        version: 1,
        game: gameData,

        skills: Object.fromEntries(
            Object.entries(skills).map(([key, skill]) => [
            key, {
                experience: skill.experience,
                experienceLevel: skill.experienceLevel,
                knowledge: skill.knowledge,
                knowledgeLevel: skill.knowledgeLevel,
                unlocked: skill.unlocked,
                experienceUpgrade: skill.experienceUpgrade,
                knowledgeUpgrade: skill.knowledgeUpgrade,
                coinUpgrade: skill.coinUpgrade,
                bodyUpgrade: skill.bodyUpgrade,
                spiritUpgrade: skill.spiritUpgrade,
            }
        ])),

        activeActionID: activeAction?.id ?? null,

        actions: actions.map(action => ({
            id: action.id,
            unlocked: action.unlocked,
        })),     

        upgrades: Object.values(game.upgrades).map(upgrade => ({
            id: upgrade.id,
            bought: upgrade.bought,
        })),

        flags: Object.fromEntries(
            Object.entries(flags).map(([key, flag]) => [
                key,
                flag.value
            ])
        ),

        lores: Object.fromEntries(
            Object.entries(lores).map(([key, lore]) => [
                key,
                lore.shown,
            ])
        )
    }

    return saveData
}

export function saveGame(){
    const saveData = getSaveData();

    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
        return true;
    } catch (error) {
        console.error("Failed to save game:", error);
        return false;

    }
}

export function loadGame(data){
    let rawSave;

    if (!data){
        rawSave = localStorage.getItem(SAVE_KEY);
    } else {
        rawSave = data;
    }
    

    if (!rawSave) return false;

    try {
        const saveData = JSON.parse(rawSave);

        if(saveData.version !== 1) {
            console.warn("Unsupported save version");
            return false;
        }

        Object.assign(game, saveData.game);

        for (const [key, savedSkill] of Object.entries(saveData.skills ?? {})) {
            if (game.skills[key]) {
                Object.assign(game.skills[key], savedSkill);
            }
        }

        for (const savedAction of saveData.actions ?? []) {
            const action = actions.find(
                a => a.id === savedAction.id
            );

            if (action) {
                action.unlocked = savedAction.unlocked;
            }
        }

        for (const savedUpgrade of saveData.upgrades ?? []) {
            const upgrade = Object.values(game.upgrades).find(
                u => u.id === savedUpgrade.id
            );

            if (upgrade) {
                upgrade.bought = savedUpgrade.bought;
            }
        }

        for (const [key, value] of Object.entries(saveData.flags ?? {})) {
            if (game.flags[key]) {
            game.flags[key].value = value;
            }
        }

        for (const [key, shown] of Object.entries(saveData.lores ?? {})) {
            if (lores[key]) {
            lores[key].shown = shown;
            }
        }


        game.activeAction = actions.find(a => a.id === saveData.activeActionID) ?? null;

        return true;
        
    } catch (error) {
        console.error("Failed to load save:", error);
        return false;
    
    }
}

export async function saveToClipboard(){
    const saveData = JSON.stringify(getSaveData());

    try {
        await navigator.clipboard.writeText(saveData);
        return true;
    } catch (error) {
        console.error("Clipboard export failed:", error);
        return false;
    }

}

export async function importFromClipboard(){
    try {
        const json = await navigator.clipboard.readText();
        return loadGame(json);
    } catch (error) {
        console.error("Clipboard import failed:", error);
        return false;
        
    }
}

export function saveToFile(){
    const saveData = JSON.stringify(getSaveData(), null, 2);

    const blob = new Blob([saveData], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const now = new Date();
    const timeStamp = now.toLocaleString("sv-SE").replace(" ", "_").replace(/:/g, "-");


    link.href = url;
    link.download = `ISF-save-${timeStamp}.json`;
    link.click();

    URL.revokeObjectURL(url);
}

export function importFromFile(file){
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(loadGame(reader.result));

        };

        reader.onerror = () => {
            console.error("Failed to read save file");
            resolve(false);
        };

        reader.readAsText(file);
    })
}

export function resetSaveData(){
    const confirm = window.confirm("Are you sure you wish to delete all save data? This is not reversable.");

    if(!confirm) return;

    isResetting = true;
    localStorage.removeItem(SAVE_KEY);
    location.reload();

}