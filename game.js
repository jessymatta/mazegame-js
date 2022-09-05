var score = 0;
var touched_once_border = false;
var touched_end_once = false;
var no_hoverover_bound1 = false;

function textDesc() {
    var p = document.createElement("p");
    p.textContent =
        "You can touch the top left part of the maze once , you lose when you touch the rest of it. Click on S to reset the Maze. Five points are added if you win and ten points are deducted when you lose.";
    document.body.appendChild(p);
}

function boundColor(wanted_color) {
    var all_boundaries = document.getElementsByClassName("boundary");
    for (var i = 0; i < all_boundaries.length; i++) {
        all_boundaries[i].style.backgroundColor = wanted_color;
    }
}

function boundColorMinusFirst(wanted_color) {
    var all_boundaries = document.getElementsByClassName("boundary");
    for (var i = 1; i < all_boundaries.length; i++) {
        all_boundaries[i].style.backgroundColor = wanted_color;
    }
}

function lost() {
    //touched boundary
    score = score - 10;
    var h2_tag = (document.getElementById("status").innerHTML =
        "You Lost :(   10 points deducted. Current score: " + score);
}

function won() {
    //hovered over E
    score = score + 5;
    var h2_tag = (document.getElementById("status").innerHTML =
        "You Won :)   5 points added. Current score: " + score);
}

function collisionCheck(val) {
    console.log("HERE  TOUCHED_ONCE IS SET TO TRUEEEEEEE " + touched_once_border);
    if (val.id == "boundary1" && no_hoverover_bound1 == false) {
        var boundary_one = (document.getElementById(
            "boundary1"
        ).style.backgroundColor = "#bd0000");
    }

    if (
        val.classList.value == "boundary" &&
        val.id != "boundary1" &&
        touched_once_border == false
    ) {
        //not else if because we can touch the first boundary element and then touch the rest
        boundColorMinusFirst("#bd0000");
        boundColor("#bd0000");
        lost();

        touched_once_border = true;
    }

    if (
        val.id == "end" &&
        touched_once_border == false &&
        touched_end_once == false
    ) {
        won();
        touched_end_once = true;
        touched_once_border = true;
        no_hoverover_bound1 = true;
    }
}

function eltClicked(val_id) {
    if (val_id == "start") {
        touched_once_border = false;
        touched_end_once = false;
        no_hoverover_bound1 = false;
        boundColor("#eeeeee");
        var h2_tag = (document.getElementById("status").innerHTML =
            "Another round. Current score: " + score);
    }
}

function main() {
    //to start or reset the game
    window.addEventListener("click", function (event_occuring) {
        var title = document.getElementById("status");
        var event_clicked_id = event_occuring.target.id;
        console.log(event_clicked_id);
        eltClicked(event_clicked_id);
    });

    window.addEventListener("mousemove", function (event_occuring) {
        var event_property = event_occuring.target;
        console.log(event_property);

        collisionCheck(event_property);
    });
}

// window.onload = main();

window.onload = function () {
    textDesc();
    main();
};
