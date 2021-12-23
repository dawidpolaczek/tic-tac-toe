function load() {
    const boardTDs = document.querySelectorAll("table.board td");

    // adds highlighting to td elements of the board
    for (let td of boardTDs) {
        td.addEventListener('mouseover', function() {
            if (td.innerHTML == "")
                td.style.backgroundColor = "aquamarine";
            else
                td.style.backgroundColor = "crimson";
        });
        td.addEventListener('mouseleave', function() {
            td.style.backgroundColor = "";
        });
    }
}
