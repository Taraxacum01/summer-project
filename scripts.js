let table = document.getElementById('table');


const n = 15;
const center = (n - 1)/2;

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

function updateNeighbours(x, y, val) {
    if (++x < n) {
        cellsJS[x * n + y].isNeighbourWithTile = val;
    }
    --x;
    if (++y < n) {
        cellsJS[x * n + y].isNeighbourWithTile = val;
    }
    --y;
    if (--x >= 0) {
        cellsJS[x * n + y].isNeighbourWithTile = val;
    }
    ++x;
    if (--y >= 0) {
        cellsJS[x * n + y].isNeighbourWithTile = val;
    }
}



function step() {

}

let cellsJS = [];
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        table.appendChild(cell);
        cellsJS[i*n+j] = new Cell(i, j);
        if (i === center && j === center) {
            cell.style.backgroundColor = 'grey';
        }

        cell.onclick = function () {
            if (cellsJS[i*n+j].isExistTile) {
                cell.style.backgroundColor = '#0000';
            }
            else {
                cell.style.backgroundColor = 'black';
                updateNeighbours(i, j, true);
            }
            cellsJS[i*n+j].isExistTile = !cellsJS[i*n+j].isExistTile;
            console.log(i, j);
            checkField();
        }
    }
}

let cellsHTML = document.getElementsByClassName("cell");  // Warning! cell - массив ячеек в html
                                                                // cells - в js
function checkField() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (cellsJS[i*n+j].isNeighbourWithTile && !cellsJS[i*n+j].isExistTile) {
                cellsHTML[i*n+j].style['backgroundColor'] = '#6666'
            }
        }
    }
}

cellsJS[center*n+center].routeN = 3;
cellsJS[center*n+center].routeE = 2; // id center tile - 7
cellsJS[center*n+center].routeW = 2;
cellsJS[center*n+center].routeS = 1;

updateNeighbours(center,center, true);

checkField();

