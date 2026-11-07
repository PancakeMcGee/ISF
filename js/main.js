import { game } from "./game.js";
import { update, unlock, showLore} from "./loop.js";
import { draw, drawDeath, drawLists } from "./draw.js";
import { loadGame } from "./save.js";
import { setupInput } from "./input.js";
import { actions } from "./actions.js";

loadGame();
setupInput();
unlock();
drawLists(game, actions);
startGame();
drawDeath(game)
showLore(game);



//localStorage.removeItem("ISFGameSave");

function startGame(){
    setInterval(update, 20);
    requestAnimationFrame(updateScreen);
}

function updateScreen() {
    draw(game);

    requestAnimationFrame(updateScreen)
}

