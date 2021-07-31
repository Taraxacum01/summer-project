let table = document.getElementById('table');
let img = document.getElementById('cell-preview');
let nextMove = document.getElementById('finish-move-button');
let rotation = document.getElementById('rotate-button');
let players = document.getElementsByClassName('player');

let nextTile;
let urlNextTile;
let isAbilityToRotate = false;
let isAbilityToNextMove = true;
const n = 11;
const center = (n - 1)/2;
let nPlayer = 5;
/*const nSub = 7;*/

function Cell(x, y) {
    this.x = x;   // need
    this.y = y;   //  ?
    this.isExistTile = false;
    this.isNeighbourWithTile = false;
    this.isAbilityPutTile = false;
    this.routeN = 0;   // 0 - undefined
    this.routeE = 0;   // 1 - field
    this.routeS = 0;   // 2 - road
    this.routeW = 0;   // 3 - town
    this.rotation = 0;
    this.isShield = false;
    this.isEndOfRoad = false;
    this.isEndOfTown = false;
    this.isMonastery = false;
    this.isSubjectN = null;
    this.isSubjectE = null;
    this.isSubjectS = null;
    this.isSubjectW = null;
    this.isSubjectMonastery = null;
    this.isBusyObject = false;
}

function rotate(obj, debug) {
    let buffer = obj.routeN;
    obj.routeN = obj.routeW;
    obj.routeW = obj.routeS;
    obj.routeS = obj.routeE;
    obj.routeE = buffer;
    if (debug) {
        console.log(obj.rotation);
    }
    obj.rotation = (obj.rotation + 90) % 360;
    if (debug) {
        console.log(obj.rotation);
    }
}

/*let form = document.querySelector("form");
let log = document.querySelector("#log");*/
let nP = document.getElementsByClassName('invisible-container')[0];
function formP() {
    let rad=document.getElementsByName('player');
    for (let i=0;i<rad.length; i++) {
        if (rad[i].checked) {
            nPlayer = i + 2;
            nP.style.display = 'none';
            for (let j = nPlayer; j < 5; j++) {
                players[j].style.display = 'none';
            }
        }
    }
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

let objRotate;
let objRotateHtml;

function NotIsAbilityPutTile() {
    for (let i = 0 ; i < n; i++) {
        for (let j = 0; j < n; j++) {
            cellsJS[i*n+j].isAbilityPutTile = false;
        }
    }
}

let cellsJS = [];
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        table.appendChild(cell);
        let t = i * n + j;
        cellsJS[t] = new Cell(i, j);
        if (i === center && j === center) {
            cell.style.backgroundColor = 'black';
        }

        cell.onclick = function () {
            if (cellsJS[t].isAbilityPutTile) {
                AbilityPutColor('#0000');
                NotIsAbilityPutTile();
                updateNeighbours(i, j, true);
                isAbilityToNextMove = true;
                /*console.log(initialValue[nextTile]);*/
                /*console.log(nextTile);*/
                cellsJS[t].isExistTile = true;
                cellsJS[t].routeN = initialValue[nextTile].routeN;
                cellsJS[t].routeE = initialValue[nextTile].routeE;
                cellsJS[t].routeS = initialValue[nextTile].routeS;
                cellsJS[t].routeW = initialValue[nextTile].routeW;
                cellsJS[t].isShield = initialValue[nextTile].isShield;
                cellsJS[t].isEndOfRoad = initialValue[nextTile].isEndOfRoad;
                cellsJS[t].isEndOfTown = initialValue[nextTile].isEndOfTown;
                cellsJS[t].isMonastery = initialValue[nextTile].isMonastery;
                cellsJS[t].rotation = initialValue[nextTile].rotation;

                while (!checkCell(cellsJS[t], i, j)) {
                    rotate(cellsJS[t], false);
                }
                objRotateHtml = cellsHTML[t];
                /*console.log(objRotateHtml);*/
                /*let r = "rotate(" + objRotateHtml.rotation + "deg)";*/
                objRotateHtml.style.transform = "rotate(" + cellsJS[t].rotation + "deg)";
                img.style.transform = "rotate(" + cellsJS[t].rotation + "deg)";
                /*cellsHTML[t].style.transform = "rotate(" + cellsJS[t].rotation + "deg)";*/
                objRotateHtml.style.backgroundImage = urlNextTile;
                objRotateHtml.style.backgroundColor = 'black';
                /*console.log(urlNextTile);*/
                objRotate = cellsJS[t];
                isAbilityToRotate = true;
                /*console.log(objRotate);*/
            }
        }
    }
}

rotation.onclick = function () {
    if (isAbilityToRotate) {
        rotate(objRotate, false);
        while (!checkCell(objRotate, objRotate.x, objRotate.y)) {
            rotate(objRotate, false);
        }
        /*let r = "rotate(" + objRotateHtml.rotation + "deg)";*/
        objRotateHtml.style.transform = "rotate(" + objRotate.rotation + "deg)";
        img.style.transform = "rotate(" + objRotate.rotation + "deg)";
    }
}

let cellsHTML = document.getElementsByClassName("cell");

function AbilityPutColor(color) {
    let counter = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (cellsJS[i*n+j].isAbilityPutTile) {
                cellsHTML[i*n+j].style['backgroundColor'] = color;
                counter++;
            }
        }
    }
    return counter;
}

function checkCell(obj, i, j) {
    if (i > 0) {
        if (cellsJS[(i-1)*n+j].routeS !== 0 && cellsJS[(i-1)*n+j].routeS !== obj.routeN) {
            /*console.log(cellsJS[(i-1)*n+j].routeS, obj.routeN);*/
            return false;
        }
    }
    if (j > 0) {
        if (cellsJS[i*n+j-1].routeE !== 0 && cellsJS[i*n+j-1].routeE !== obj.routeW) {
            /*console.log(cellsJS[i*n+j-1].routeE, obj.routeW);*/
            return false;
        }
    }
    if (i < n-1) {
        if (cellsJS[(i+1)*n+j].routeN !== 0 && cellsJS[(i+1)*n+j].routeN !== obj.routeS) {
            /*console.log(cellsJS[(i+1)*n+j].routeN, obj.routeS);*/
            return false;
        }
    }
    if (j < n-1) {
        if (cellsJS[i * n + j + 1].routeW !== 0 && cellsJS[i * n + j + 1].routeW !== obj.routeE) {
            /*console.log(cellsJS[i*n+j+1].routeW, obj.routeE);*/
            return false;
        }
    }

    return true;
}

function checkField(obj, fullField) {  // Для копий объекта!
    // fullField == true -> проверяется всё поле
    //           == false -> до первой подходящей клетки
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            cellsJS[i*n+j].isAbilityPutTile = false;
            if (cellsJS[i*n+j].isNeighbourWithTile && !cellsJS[i*n+j].isExistTile) {
                /*console.log('.');*/
                for (let k = 0; k < 4; k++) {
                    if (k > 0) {
                        rotate(obj, false);
                    }

                    if (!checkCell(obj, i, j)) {
                        continue;
                    }

                    if (fullField) {
                        cellsJS[i*n+j].isAbilityPutTile = true;
                        break;
                    }
                    else return true;
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
            if (checkField(Object.assign(initialValue[i]), false)) {
                for (let j = 0; j < initialValue[i].number; j++) {
                    randomizeArray[k++] = i;
                    /*console.log(randomizeArray);*/
                }
            }
        }
    }
    if (k === 0) {
        return null;         // Подходящие плитки закончились -> выход из программы, окончательный подсчет очков
    }
    let b = randomizeArray[Math.trunc(Math.random() * k)];
    controlArray[b]++;
    /*console.log(b);*/
    initialValue[b].number--;
    return b;
}

let currentPlayer = -1;

function step() {
    if (currentPlayer === -1) {
        nextMove.textContent = 'Завершить ход';
    }
    else {
        players[currentPlayer].classList.toggle("active");
    }
    currentPlayer = (currentPlayer + 1) % nPlayer;
    players[currentPlayer].classList.toggle("active");
    nextTile = randomize();
    if (nextTile == null) {
        console.log("Подходящие плитки закончились");
        alert("Подходящие плитки закончились");
        isAbilityToNextMove = true;
        console.log(controlArray);
        return;
    }
    checkField(Object.assign(initialValue[nextTile]), true);
    urlNextTile = 'url("Tiles/' + nextTile + '.png")';
    img.style.backgroundImage = urlNextTile;
    AbilityPutColor('#6666');
}

cellsJS[center*n+center].routeN = 2;
cellsJS[center*n+center].routeE = 3; // id center tile - 3
cellsJS[center*n+center].routeS = 2;
cellsJS[center*n+center].routeW = 1;
for (let i = 0; i < 3; i++) {
    rotate(cellsJS[center * n + center], false);
}
cellsJS[center*n+center].isExistTile = true;
cellsHTML[center * n + center].style.transform = "rotate(" + cellsJS[center*n+center].rotation + "deg)";
cellsHTML[center * n + center].style.backgroundImage = 'url("Tiles/3.png")';

updateNeighbours(center,center, true);

/*randomize();*/

/*for (let h = 0; h < 100; h++) {
    randomize();
}*/
nextMove.onclick = function () {
    if (isAbilityToNextMove) {
        isAbilityToNextMove = false;
        step();
    }
}
