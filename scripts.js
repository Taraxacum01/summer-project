let table = document.getElementById('table');


const n = 143;
const center = n/2;

function Cell(x, y) {
    this.x = x;   // need
    this.y = y;   //  ?
    this.isExistTile = false;
    this.isNeighbourWithTile = false;
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

function updateNeighbours(x, y) {
    cells[++x][y].isNeighbourWithTile = true;
    cells[--x][++y].isNeighbourWithTile = true;
    cells[--x][--y].isNeighbourWithTile = true;
    cells[++x][++y].isNeighbourWithTile = true;
}



function step() {

}

let cells = [];
for (let i = 0; i < n; i++) {
    cells[i] = [];
    for (let j = 0; j < n; j++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        table.appendChild(cell);
        cells[i][j] = new Cell(i, j);
        if (i === center && j === center) {
            cell.style.backgroundColor = '#9999';
        }

        cell.onclick = function () {
            if (cells[i][j].isExistTile) {
                cell.style.backgroundColor = '#0000';
            }
            else {
                cell.style.backgroundColor = 'black';
            }
            cells[i][j].isExistTile = !cells[i][j].isExistTile;
        }
    }
}

let cell = document.getElementsByTagName('cell');  // Warning! cell - ячейки в html
                                                                // cells - в js
function checkField() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (cells[i][j].isNeighbourWithTile && cells[i][j].isExistTile) {
                cell[i*n+j].style.backgroundColor = '#7777'
            }
        }
    }
}

cells[center][center].routeN = 3;
cells[center][center].routeE = 2; // id center tile - 7
cells[center][center].routeW = 2;
cells[center][center].routeS = 1;

updateNeighbours(center,center);

checkField();

