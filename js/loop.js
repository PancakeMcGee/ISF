import { actions, unlockActions } from "./actions.js";
import { drawDeath, drawLists, drawPause, drawSupplies1, drawSupplies2, drawActiveAction, drawLore} from "./draw.js";
import { unlockUpgrades } from "./upgrades.js";
import { unlockSkills} from "./skills.js";
import { unlockFlags } from "./flags.js";
import { updateStats, levelUp, decreaseHealth } from "./stats.js";
import { game, recordStartingGame, resetGame } from "./game.js";
import { unlockLore } from "./lore.js";

export function unlock(){
    let changed = false
    
    if (unlockFlags(game)) changed = true;
    if (unlockSkills(game)) changed = true;
    if (unlockUpgrades(game)) changed = true;
    if (unlockActions(game)) changed = true;
    
    if (changed){
        drawLists(game, actions);

    } 
}

export function showLore(){
    const lore = unlockLore(game);

    if (!lore) return;

    game.isPaused = true;
    drawPause(0);
    drawLore(lore);

}

function gamePause(game){
    const action = game?.activeAction;
    if (!action) return;

    let suppliesCost = 0;
    if (game.buySupplies1) suppliesCost += 1/30;
    if (game.buySupplies2) suppliesCost += 1;



    if (!action.unlocked || game.coin + (action.coinGain - suppliesCost)  * game.globalMult < 0){
        game.isPaused = true;
        game.activeAction = null;

        if(game.buySupplies1){ 
            game.buySupplies1 = false;
            drawSupplies1(game);
        }

        if(game.buySupplies2){ 
            game.buySupplies2 = false;
            drawSupplies2(game);
        }

        drawActiveAction(game);
        drawPause(0);
        drawLists(game, actions);

        return;
    }

    const suppliesNeeded = (game.activeAction?.baseComfort ?? 0) < 1 && game.age >= 16 * 365
    const noMoney1 = game.coin < 1/30 * game.globalMult 
    
    if(game.buySupplies1 && (!suppliesNeeded || noMoney1) ) {
        game.buySupplies1 = false;
        game.isPaused = true;
        drawPause(0);
        drawSupplies1(game);

    }

    const noMoney2 = game.coin < 1 * game.globalMult 
    
    if(game.buySupplies2 && noMoney2)  {
        game.buySupplies2 = false;
        game.isPaused = true;
        drawPause(0);
        drawSupplies2(game);

    }

    unlock();
}

export function update() {
    gamePause(game);
    showLore(game)

    if (game.isPaused || game.isDead) return
    
    game.age += 1 * game.globalMult;

    updateStats(game, game.globalMult);
    if (levelUp(game)) drawLists(game, actions);
    unlock();
    if (decreaseHealth(game)) drawDeath(game);

}

export function newLife(){

    resetGame();
    unlock();
    drawLists(game, actions);
    drawSupplies1(game);
    drawSupplies2(game);
    drawDeath(game);

    recordStartingGame();
    showLore();


}