let currentSign = 'X';

function load() {
    setUpEventListeners();
    makeAllFieldsFree();
}

function setUpEventListeners() {
    const boardTDs = document.querySelectorAll("table.board td");
    for (let td of boardTDs) {
        td.addEventListener("mouseover", mouseoverEventListener);
        td.addEventListener("click", clickEventListener);
        td.addEventListener("mouseleave", mouseleaveEventListener);
    }
}

function mouseoverEventListener(event) {
    const td = event.currentTarget;
    if (td.classList.contains("free")) {
        td.style.backgroundColor = "aquamarine";
        td.innerHTML = currentSign;
    }
    else
        td.style.backgroundColor = "crimson";
}

function clickEventListener(event) {
    const td = event.currentTarget;
    if (td.classList.contains("free")) {
        td.innerHTML = currentSign;
        td.classList.remove("free");
        currentSign = currentSign == 'X' ? 'O' : 'X';

        const boardTDs = document.querySelectorAll("table.board td");
        checkIfPlayerWins(td, boardTDs);
    }
}

function mouseleaveEventListener(event) {
    const td = event.currentTarget;
    if (td.classList.contains("free")) {
        td.innerHTML = "";
    }
    td.style.backgroundColor = "";
}

function makeAllFieldsFree() {
    const boardTDs = document.querySelectorAll("table.board td");
    for (let td of boardTDs) {
        td.classList.add("free");
    }
}

function checkIfPlayerWins(clickedTD, boardTDs) {

    let matrixOfTDs = [[], [], []];
    let clickedX, clickedY;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const element = boardTDs[i * 3 + j];
            matrixOfTDs[i].push(element);
            if (element === clickedTD) {
                clickedX = i;
                clickedY = j;
            }
        }
    }

    let createdSign = clickedTD.innerHTML;
    
    // going up
    let count = 1;
    let listOfCheckedFields = [clickedTD];
    for (let nextX = clickedX - 1; nextX >= 0; nextX--) {
        if (matrixOfTDs[nextX][clickedY].innerHTML === createdSign)
            count++;
        else
            break;
        listOfCheckedFields.push(matrixOfTDs[nextX][clickedY]);
        if (count === 3) {
            endGame(listOfCheckedFields);
            return;
        }
    }

    // going down
    for (let nextX = clickedX + 1; nextX < 3; nextX++) {
        if (matrixOfTDs[nextX][clickedY].innerHTML === createdSign)
            count++;
        else
            break;
        listOfCheckedFields.push(matrixOfTDs[nextX][clickedY]);
        if (count === 3) {
            endGame(listOfCheckedFields);
            return;
        }
    }

    // going left
    count = 1;
    listOfCheckedFields = [clickedTD];
    for (let nextY = clickedY - 1; nextY >= 0; nextY--) {
        if (matrixOfTDs[clickedX][nextY].innerHTML === createdSign)
            count++;
        else
            break;
        listOfCheckedFields.push(matrixOfTDs[clickedX][nextY]);
        if (count === 3) {
            endGame(listOfCheckedFields);
            return;
        }
    }

    // going right
    for (let nextY = clickedY + 1; nextY < 3; nextY++) {
        if (matrixOfTDs[clickedX][nextY].innerHTML === createdSign)
            count++;
        else
            break;
        listOfCheckedFields.push(matrixOfTDs[clickedX][nextY]);
        if (count === 3) {
            endGame(listOfCheckedFields);
            return;
        }
    }

    // going up right
    count = 1;
    listOfCheckedFields = [clickedTD];
    for (let nextX = clickedX - 1, nextY = clickedY + 1;
            nextX >= 0 && nextY < 3;
            nextX--,
            nextY++) {
        if (matrixOfTDs[nextX][nextY].innerHTML === createdSign)
            count++;
        else
            break;
        listOfCheckedFields.push(matrixOfTDs[nextX][nextY]);
        if (count === 3) {
            endGame(listOfCheckedFields);
            return;
        }
    }

    // going down left
    for (let nextX = clickedX + 1, nextY = clickedY - 1;
            nextX < 3 && nextY >= 0;
            nextX++,
            nextY--) {
        if (matrixOfTDs[nextX][nextY].innerHTML === createdSign)
            count++;
        else
            break;
        listOfCheckedFields.push(matrixOfTDs[nextX][nextY]);
        if (count === 3) {
            endGame(listOfCheckedFields);
            return;
        }
    }

    // going up left
    count = 1;
    listOfCheckedFields = [clickedTD];
    for (let nextX = clickedX - 1, nextY = clickedY - 1;
            nextX >= 0 && nextY >= 0;
            nextX--,
            nextY--) {
        if (matrixOfTDs[nextX][nextY].innerHTML === createdSign)
            count++;
        else
            break;
        listOfCheckedFields.push(matrixOfTDs[nextX][nextY]);
        if (count === 3) {
            endGame(listOfCheckedFields);
            return;
        }
    }

    // going down right
    for (let nextX = clickedX + 1, nextY = clickedY + 1;
            nextX < 3 && nextY < 3;
            nextX++,
            nextY++) {
        if (matrixOfTDs[nextX][nextY].innerHTML === createdSign)
            count++;
        else
            break;
        listOfCheckedFields.push(matrixOfTDs[nextX][nextY]);
        if (count === 3) {
            endGame(listOfCheckedFields);
            return;
        }
    }
}

function endGame(listOfCheckedFields) {
    removeEventListeners();

    for (let field of listOfCheckedFields) {
        field.style.backgroundColor = "green";
    }
}

function removeEventListeners() {
    const boardTDs = document.querySelectorAll("table.board td");
    for (let td of boardTDs) {
        td.removeEventListener('click', clickEventListener);
        td.removeEventListener('mouseover', mouseoverEventListener);
        td.removeEventListener('mouseleave', mouseleaveEventListener);
    }
}
