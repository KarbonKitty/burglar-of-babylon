import { Display, FOV } from 'rot-js';
import { Tile } from './Tile';
import { GameMap } from '../map';
import { GamePosition } from '../position';
import { Player } from '../actors/player';

export class DisplayManager {
    mainAreaWidth = 60;
    mainAreaHeight = 60;
    textAreaWidth = 80;
    textAreaHeight = 60;
    fontSize: number;

    gameDisplay: Display;
    messageDisplay: Display;

    private getFontSize() {
        if (screen.width <= 1280 || screen.height <= 720) {
            return 10;
        } else if (screen.width <= 1600 || screen.height <= 900) {
            return 12;
        } else {
            return 15;
        }
    }

    constructor() {
        this.fontSize = this.getFontSize();

        const gameDisplay = new Display({
            width: this.mainAreaWidth,
            height: this.mainAreaHeight,
            forceSquareRatio: true,
            fontSize: this.fontSize,
            fontFamily: "Droid Sans"
        });

        const messageDisplay = new Display({
            width: this.textAreaWidth,
            height: this.textAreaHeight,
            fontSize: this.fontSize
        });

        const gameContainer = gameDisplay.getContainer()!;
        const messageContainer = messageDisplay.getContainer()!;

        const leftDiv = document.getElementById("left")!;
        const rightDiv = document.getElementById("right")!;
        leftDiv.appendChild(gameContainer);
        rightDiv.appendChild(messageContainer);

        this.gameDisplay = gameDisplay;
        this.messageDisplay = messageDisplay;
    }

    draw(tile: Tile, position: GamePosition) {
        this.gameDisplay.draw(position.x, position.y, tile.glyph, tile.fgColor, tile.bgColor);
    }

    drawMapWithoutFov(map: GameMap) {
        map.tileArray.forEach((mapTile, index) => this.draw(mapTile.tile, map.positionFromIndex(index)));
        map.actorList.forEach(actor => this.draw(actor.tile, actor.position));
    }

    drawMap(map: GameMap, player: Player) {
        const fovAlgo = new FOV.RecursiveShadowcasting(map.lightPasses.bind(map));
        const mask: boolean[] = [];
        // TODO: variable visibility range
        fovAlgo.compute(player.position.x, player.position.y, 10, (x, y, r, v) => {
            mask[map.width * y + x] = true;
        });

        map.tileArray.forEach((mapTile, index) => this.draw(
            mask[index] ? mapTile.tile : { glyph: "~", fgColor: "#aaa", bgColor: "#333" },
            map.positionFromIndex(index)
        ));
        map.actorList.forEach(actor => mask[map.width * actor.position.y + actor.position.x] ? this.draw(actor.tile, actor.position) : 0);
    }
}
