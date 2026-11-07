import { game } from "./game.js";
import { newLife } from "./loop.js";
import { actions, setActiveAction} from "./actions.js";
import { buyUpgrade } from "./upgrades.js";
import {  draw, drawDeath, drawPause, drawSupplies1, drawSupplies2, drawLists, drawActiveAction, drawSettings, drawExport, drawImport, hideLore} from "./draw.js";
import { saveGame, resetSaveData, saveToClipboard, saveToFile, importFromClipboard, importFromFile} from "./save.js";
import { changeActiveLore } from "./lore.js";


const pauseButton = document.getElementById("pause-button");
const playButton = document.getElementById("play-button");
const x2Button = document.getElementById("2x-button");
const x5Button = document.getElementById("5x-button");

const rebirthButton = document.getElementById("rebirth");
const suppliesButton1 = document.getElementById("supplies-button1")
const suppliesButton2 = document.getElementById("supplies-button2")


const actionList = document.getElementById("action-list");
const upgradeList = document.getElementById("upgrade-list");

const settingsButton = document.getElementById("settings-button");
const overlay = document.getElementById("overlay");
const overlay2 = document.getElementById("overlay2");

const savingButton = document.getElementById("save-button");
const exportButton = document.getElementById("export-button");
const importButton = document.getElementById("import-button");
const toClipboardButton = document.getElementById("to-clipboard");
const toFileButton = document.getElementById("to-file");
const fromClipboardButton = document.getElementById("from-clipboard");
const fromFileButton = document.getElementById("from-file");
const resetDataButton = document.getElementById("reset-data");


const settings = document.getElementById("settings");
const exportContainer = document.getElementById("export-container");

const exitLoreButton = document.getElementById("exit-lore");
const oldLore = document.getElementById("old-lore");
const loreButton = document.getElementById("lore-button");
const exitOldLore = document.getElementById("exit-old-lore");

const SPEED_MULT = 5;




export function setupInput() {
    pauseButton.addEventListener("click", () => pauseGame(0));

    playButton.addEventListener("click", () => pauseGame(1));

    x2Button.addEventListener("click", () => pauseGame(2));

    x5Button.addEventListener("click", () => pauseGame(5));

    rebirthButton.addEventListener("click", rebirth);

    actionList.addEventListener("click", activateAction);

    suppliesButton1.addEventListener("click", toggleSupplies1);

    suppliesButton2.addEventListener("click", toggleSupplies2);

    upgradeList.addEventListener("click", clickUpgrade);

    settingsButton.addEventListener("click", drawSettings);

    overlay.addEventListener("click", closeSettings);

    loreButton.addEventListener("click", showOldLore);

    exitOldLore.addEventListener("click", hideOldLore);

    savingButton.addEventListener("click", save);

    exportButton.addEventListener("click", drawExport);

    importButton.addEventListener("click", drawImport);

    toClipboardButton.addEventListener("click", toClipboard);

    fromClipboardButton.addEventListener("click", importFromClipboard);

    toFileButton.addEventListener("click", toFile);

    fromFileButton.addEventListener("click", fromFile);

    resetDataButton.addEventListener("click", resetSaveData);

    overlay2.addEventListener("click", closeImportExport);

    exitLoreButton.addEventListener("click", exitLore);

    window.addEventListener("keydown", spacePress);
}

function exitLore(){
    hideLore();
    changeActiveLore();

}

function showOldLore(){
    oldLore.hidden = false;
    overlay.hidden = false;
}

function hideOldLore(){
    oldLore.hidden = true;
    overlay.hidden = true;
}

function spacePress(event){
    if (event.code === "Space") {
        event.preventDefault();

        if(game.isPaused){
            pauseGame(1);
            return;
        } 
        if(game.globalMult === 1 * SPEED_MULT){
            pauseGame(2);
            return;
        } 
        if(game.globalMult === 2 * SPEED_MULT){
            pauseGame(5);
            return;
        } 
        if(game.globalMult === 5 * SPEED_MULT){
            pauseGame(0);
            return;
        } 
        
    }
}

function pauseGame(speed){
    if (speed === 0){
        game.isPaused = true;
    } else if(game.activeAction !== null){
        game.isPaused = false;
        game.globalMult = speed * SPEED_MULT;
    } else {
        drawPause(0);
        return;
    }
    drawPause(speed);
}

function closeImportExport(){
    if(exportContainer.hidden) {
        drawImport();
    } else {
        drawExport();
    }
        

}

function fromFile(){
    const input = document.createElement("input");

    input.type = "file";
    input.accept = ".json, application/json"

    input.addEventListener("change", async () => {
        const file = input.files[0];
        if (!file) {
            input.remove();
            return;
        } 

        if (await importFromFile(file)) {
            input.remove();
            location.reload();
            return true;
        } else {
            alert("Invalid save file.");
        }

        input.remove();
    })

    input.click();
}

async function toClipboard(){
    const success = await saveToClipboard();

    if (!success) return;

    toClipboardButton.textContent = "Copied!"

    setTimeout(() =>{
        toClipboardButton.textContent = "To clipboard"
    }, 1000)
}

function toFile(){
    saveToFile();
}

function save(){
    saveGame();
    savingButton.textContent = "Saved!"

    setTimeout(() =>{
        savingButton.textContent = "Save"
    }, 1000)
}

function closeSettings(){
    if (!settings.hidden) {
        drawSettings();
    }
}




function rebirth(){
    newLife();
    draw(game);
    drawLists(game, actions);
    drawDeath(game);
    drawPause(0);
}

function activateAction(event){
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    if (setActiveAction(game, button.dataset.action)) {
        drawActiveAction(game);
        drawLists(game, actions);
        drawSupplies1(game);
        drawSupplies2(game);
    }

    
}

function clickUpgrade(event) {
    const button = event.target.closest("button[data-action]");

    if (!button) return

    if (buyUpgrade(button.dataset.action, game)) drawLists(game, actions);
    
}

function toggleSupplies1(){
    const suppliesNeeded = (game.activeAction?.baseComfort ?? 0) < 1 && game.age >= 16 * 365

    if (game.coin > 1 / 30 * game.globalMult && suppliesNeeded) {
        game.buySupplies1 = !game.buySupplies1;
        game.comfort = game.buySupplies1 ? 1 : 0;
        drawSupplies1(game);
        draw(game);
    }

}

function toggleSupplies2(){

    if (game.coin >= 1 * game.globalMult || game.buySupplies2) {
        game.buySupplies2 = !game.buySupplies2;
        drawSupplies2(game);
        draw(game);
    }

}


