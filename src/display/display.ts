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

    private messageAreaHeight = this.textAreaHeight / 2;
    private interfaceAreaHeight = this.textAreaHeight - this.messageAreaHeight;

    private messageBuffer: string[] = [];

    private invisibleTile = { glyph: "≈", color: "#ccc" };

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

    draw(tile: Tile, position: GamePosition, bgColor = "#000") {
        this.gameDisplay.draw(position.x, position.y, tile.glyph, tile.color, bgColor);
    }

    drawMapWithoutFov(map: GameMap) {
        map.tileArray.forEach((mapTile, index) => this.draw(mapTile.tile, map.positionFromIndex(index)));
        map.actorList.forEach(actor => this.draw(actor.tile, actor.position));
    }

    drawMap(map: GameMap) {
        map.tileArray.forEach((mapTile, index) => {
            if (map.visibilityMask[index]) {
                if (map.enemyVision[index]) {
                    this.draw(mapTile.tile, map.positionFromIndex(index), "#900");
                } else {
                    this.draw(mapTile.tile, map.positionFromIndex(index));
                }
            } else if (map.playerMemory[index]) {
                this.draw({ glyph: mapTile.tile.glyph, color: "#ccc" }, map.positionFromIndex(index));
            } else {
                this.draw(this.invisibleTile, map.positionFromIndex(index), "#222");
            }
        });
        map.actorList.forEach(actor =>
            map.visibilityMask[map.width * actor.position.y + actor.position.x] ?
            this.draw(actor.tile, actor.position) :
            0);
    }

    addMessage(msg: string) {
        this.messageBuffer.push(msg);
        this.drawMessages();
    }

    addTemporaryMessage(msg: string) {
        this.messageBuffer.push(msg);
        this.drawMessages();
        this.messageBuffer.pop();
    }

    drawMessages() {
        this.clearPartial(
            new GamePosition(0, this.interfaceAreaHeight + 1),
            new GamePosition(this.textAreaWidth, this.textAreaHeight));
        const bufferLength = this.messageBuffer.length;
        let line = this.interfaceAreaHeight + 2;
        for (let i = bufferLength - 1; i > 0; i--) {
            const lines = this.messageDisplay.drawText(1, line, this.messageBuffer[i], this.textAreaWidth - 2);
            line += lines;
            if (line >= this.mainAreaHeight - 2) {
                break;
            }
        }
    }

    drawInterface(player: Player) {
        this.clearPartial(new GamePosition(0, 0), new GamePosition(this.textAreaWidth, this.interfaceAreaHeight));

        // player name
        this.messageDisplay.drawText(1, 2, player.name, this.textAreaWidth - 2);

        // alert level
        this.messageDisplay.drawText(1, 4, `Current alert level: ${player.alertLevel}.`, this.textAreaWidth - 2);

        player.inventory.items.forEach((item, index) => {
            this.messageDisplay.drawText(1, 6 + index, `${index + 1}. ${item.name}`);
        });
    }

    private clearPartial(leftUp: GamePosition, rightDown: GamePosition) {
        for (let i = leftUp.x; i <= rightDown.x; i++) {
            for (let j = leftUp.y; j <= rightDown.y; j++) {
                this.messageDisplay.draw(i, j, null, null, null);
            }
        }
    }

    private getFontSize() {
        if (screen.width <= 1280 || screen.height <= 720) {
            return 10;
        } else if (screen.width <= 1600 || screen.height <= 900) {
            return 12;
        } else {
            return 15;
        }
    }
}
