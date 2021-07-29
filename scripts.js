let table = document.getElementById('table');
let initValue = [0, 0, 1, 1, 1, 1, 2, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 6, 7, 7, 7, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 16, 17, 17, 17, 18, 18, 19, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 23]

const n = 11;
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
    this.rotation = 0;
    this.isEndOfRoad = false;
    this.isMonastery = false;
    this.isShield = false;
    this.isEndOfTown = false;
}

function rotate(val) {
    let buffer = val.routeN;
    val.routeN = val.routeW;
    val.routeW = val.routeS;
    val.routeS = val.routeE;
    val.routeE = buffer;
    val.rotation = (val.rotation + 90) % 360;
}


/*let DATA = JSON.parse(data);

for (let i = 0; i < 24; i++) {
    initialValue[i].number = DATA[i].number;
    initialValue[i].routeN = DATA[i].routeN;
    initialValue[i].routeE = DATA[i].routeE;
    initialValue[i].routeS = DATA[i].routeS;
    initialValue[i].routeW = DATA[i].routeW;
    initialValue[i].isShield = DATA[i].isShield;
    initialValue[i].isEndOfRoad = DATA[i].isEndOfRoad;
    initialValue[i].isEndOfTown = DATA[i].isEndOfTown;
    initialValue[i].isMonastery = DATA[i].isMonastery;
}*/
let initialValue = init();

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
            checkFieldColor();
        }
    }
}

let cellsHTML = document.getElementsByClassName("cell");

function checkFieldColor() {
    let counter = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (cellsJS[i*n+j].isNeighbourWithTile && !cellsJS[i*n+j].isExistTile) {
                cellsHTML[i*n+j].style['backgroundColor'] = '#6666'
                counter++;
            }
        }
    }
    return counter;
}

function checkField(obj) {  // Для копий объекта!
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (cellsJS[i*n+j].isNeighbourWithTile && !cellsJS[i*n+j].isExistTile) {
                /*console.log('.');*/
                for (let k = 0; k < 4; k++) {
                    if (k > 0) {
                        rotate(obj);
                    }
                    if (i > 0) {
                        if (cellsJS[(i-1)*n+j].routeS !== 0 && cellsJS[(i-1)*n+j].routeS !== obj.routeN) {
                            /*console.log(cellsJS[(i-1)*n+j].routeS, obj.routeN);*/
                            continue;
                        }
                    }
                    if (j > 0) {
                        if (cellsJS[i*n+j-1].routeE !== 0 && cellsJS[i*n+j-1].routeE !== obj.routeW) {
                            /*console.log(cellsJS[i*n+j-1].routeE, obj.routeW);*/
                            continue;
                        }
                    }
                    if (i < n) {
                        if (cellsJS[(i+1)*n+j].routeN !== 0 && cellsJS[(i+1)*n+j].routeN !== obj.routeS) {
                            /*console.log(cellsJS[(i+1)*n+j].routeN, obj.routeS);*/
                            continue;
                        }
                    }
                    if (j < n) {
                        if (cellsJS[i*n+j+1].routeW !== 0 && cellsJS[i*n+j+1].routeW !== obj.routeE) {
                            /*console.log(cellsJS[i*n+j+1].routeW, obj.routeE);*/
                            continue;
                        }
                    }
                    return true;
                }

            }
        }
    }
    return false;
}

checkField(initialValue[0]);

let controlArray = [];
for (let i = 0; i < 24; i++) {
    controlArray[i] = 0;
}

function randomize() {
    let randomizeArray = [];
    let k = 0;
    for (let i = 0; i < 24; i++) {
        if (initialValue[i].number > 0) {
            if (checkField(Object.assign(initialValue[i]))) {
                for (let j = 0; j < initialValue[i].number; j++) {
                    randomizeArray[k++] = i;
                    /*console.log(randomizeArray);*/
                }
            }
        }
    }
    if (k === 0) {
        return;         // Подходящие плитки закончились -> выход из программы, окончательный подсчет очков
    }
    let b = randomizeArray[Math.trunc(Math.random() * k)];
    controlArray[b]++;
    /*console.log(b);*/
    initialValue[b].number--;
}





cellsJS[center*n+center].routeN = 2;
cellsJS[center*n+center].routeE = 3; // id center tile - 3
cellsJS[center*n+center].routeW = 2;
cellsJS[center*n+center].routeS = 1;
for (let i = 0; i < 3; i++) {
    rotate(cellsJS[center * n + center]);
}
cellsHTML[center * n + center].style.transform = 'rotate(cellsJS[center*n+center].rotation)';
cellsHTML[center * n + center].style.backgroundImage = 'url("Tiles/3.png")';

updateNeighbours(center,center, true);

checkFieldColor(3);

/*randomize();*/

for (let h = 0; h < 100; h++) {
    randomize();
}

console.log(controlArray);