import { Display } from 'rot-js';
import { Tile } from './Tile';
import { GameMap } from '../map';
import { GamePosition } from '../position';

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
            fontFamily: "Lucida Console"
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

    drawMap(map: GameMap) {
        map.tileArray.forEach((mapTile, index) => this.draw(mapTile.tile, map.positionFromIndex(index)));
        map.actorList.forEach(actor => this.draw(actor.tile, actor.position));
    }
}
