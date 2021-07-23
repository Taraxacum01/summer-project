function Cell(x, y) {
    this.x = x;   // need
    this.y = y;   //  ?
    this.isExistTile = false;
    this.isNeighboorWithTiles = false;
    this.routeN = 0;   // 0 - undefined
    this.routeE = 0;   // 1 - field
    this.routeS = 0;   // 2 - road
    this.routeW = 0;   // 3 - town
    function rotation() {
        let buffer = this.routeN;
        this.routeN = this.routeW;
        this.routeW = this.routeS;
        this.routeS = this.routeE;
        this.routeE = buffer;
    }
    this.isEndOfRoad = false;
    this.isMonastery = false;
    this.isShield = false;
    this.isEndOfTown = false;
}

const n = 143;
const center = n/2;
let cells = Cell[n][n];
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        cells[i][j] = new Cell(i, j);
    }
}

cells[center][center].routeN = 3;
cells[center][center].routeE = 2; // id center tile - 7
cells[center][center].routeW = 2;
cells[center][center].routeS = 1;

let i = center + 1, j = center;

cells[i--][j++].isNeighboorWithTiles = true;
cells[i--][j--].isNeighboorWithTiles = true;
cells[i++][j--].isNeighboorWithTiles = true;
cells[i][j].isNeighboorWithTiles = true;


