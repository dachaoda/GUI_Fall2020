/***************************************************************************
 File: https://dachaoda.github.io/GUI_Fall2020/HW8/JS/script.js
 91.461 Assignment: Implementing a Bit of Scrabble with Drag-and-Drop
 Dachao Kuang, UMass Lowell Computer Science, Dachao_Kuang@student.uml.edu
 Copyright (c) 2020 by Dachao Kuang. All rights reserved. May be freely
 copied or excerpted for educational purposes with credit to the author.
 updated by DK on December 15, 2020 at 10:26 PM
***************************************************************************/

var tilesinhand = 0;
var first = true;
var tilefile = "url(\"graphics_data/Scrabble_Tiles/Scrabble_Tile_";
var tiledata = [];
var pretile;
var score = 0;
var word = "";
var wordplayed= 0;
var Wbonus = 0;
var TotalScore= 0;
var Remaintile = 100;
var boardInit = document.getElementById("scrabble_board").innerHTML;
var letter = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","_"];
tiledata = ScrabbleTiles;
dealhand();


function dealhand(){

    //Checks if there are no more tile remaining and player has play their last tiles to initial end game msg
    if (Remaintile == 0 && tilesinhand == 0){
        var remainingTile = document.getElementById("msg");
        remainingTile.innerHTML = "GAME OVER! Please click Reset Game to start a new game";

    return;
    }

    //Create tile base until hand is full or no more tile remains
    while (tilesinhand != 7 && Remaintile !=0) {

        createtile();
        tilesinhand++;
    }
}

function createtile(){
    //Creat empty draggable tile
    var holder = document.getElementById("holder")
    var tile = document.createElement('div');
    tile.setAttribute("class", "draggable draggable_tile");

    //Assignment of tile attributes
    var currenttile;
    var x = randomletter();
    currenttile = tilefile + x  +".jpg\")";
    tile.setAttribute("name", x);
    tile.setAttribute("value", tiledata[x]["value"]);
    tile.style.backgroundImage = currenttile;

    //Add tile to rack and initialize tile to draggable
    holder.appendChild(tile);
    initdraggable();

}

//Keeping count of tile in hand
function playedtile(){
    tilesinhand--;
}

function initdraggable(){
    //Inital draggable properties
    $(".draggable_tile").draggable({
        revert: "invalid",
        snap: ".droppable",
        snapMode: "inner",
        opacity: 0.7

    });

    //Triggers when a tile is drop on to the board
    $(".droppable").droppable({
        drop(event, ui) {
            var drag = ui.draggable;
            var drop = $(this);
            //Center the drag to stick properly to the board
            $(drag)
                .css({
                    top: 0,
                    left: 0
                }).appendTo(drop);
                
            //Disable the drop tile
            $(drag).draggable("disable");
            
            //When first tile is place all droppable is disable
            if (first) {
                disabledroppable();
                
                word = $(drag).attr("name");
                var newL = parseInt(drop.attr('name'));
            }else{
                //Determines which side to append the new letter to the existing string
                var newL = parseInt(drop.attr('name'));
                if(newL < pretile){
                    word = $(drag).attr("name") + word;
                }else if(newL > pretile){
                    word = word + $(drag).attr("name");
                }
            
            }

            //only enable droppable next the the dropped tile only
            enabledroppable(drop);

            //disable droppable for used board slot
            playedtile();
            pretile = drop.attr("name");
            $("#board_droppable_" + pretile.toString()).droppable("disable");

            //update player word
            var currentword = document.getElementById("currentWord");
            currentword.innerHTML = "Current Word: " + word;

            //update letter score
            findScore(parseInt($(drag).attr("value")), newL);
            wordplayed++;
        }
        
    });
}

//Disable all droppable
function disabledroppable(){
    $(".droppable").droppable("disable");
}


function enabledroppable(drop){
    var center = parseInt(drop.attr('name'));
    //Trigger only if tile place is first tile
    if(first){
        center = center + 1;
        $("#board_droppable_" + center.toString()).droppable("enable");
        center = center - 2;
        $("#board_droppable_" + center.toString()).droppable("enable");
        first = false;
    }

    //Re enable left or right tile of place tile depending on which side its on
    if(pretile < center){
        center = center + 1;
        $("#board_droppable_" + center.toString()).droppable("enable");
    }else if(pretile > center){
        center = center - 1;
        $("#board_droppable_" + center.toString()).droppable("enable");
    }

    return;
}

function randomletter(){
    //pick random letter
    var random;
    random = Math.floor(Math.random() * letter.length);
    var x;
    x = letter[random];


    //Keep track of remain tiles of that letter and remove for the generatable letter when it reaches 0
    tiledata[x]["number-remaining"]--;
    if(tiledata[x]["number-remaining"] == 0){
        letter.splice(random, 1);
        console.log(letter);
    }   

    //Update UI
    Remaintile--;
    var remainingTile = document.getElementById("remainingTile");
    remainingTile.innerHTML = "Remaining Tile: " + Remaintile.toString();

    return x;
}

//Updates the letter scores
function findScore(tileV, boardP){
    //Letter bonus are applied and word bonus are keep in record
    if (boardP == 3 || boardP ==13){
        Wbonus++;        
    }else if(boardP == 7 || boardP == 9){
        tileV = tileV * 2;
    }
    console.log(tileV);
    console.log(score);
    score = score + tileV;
    console.log(score)

}

//This updates the final score for a submitted word
function updateScore(){
    //word bonus are applied
    if(Wbonus == 0){
        TotalScore = TotalScore + score;
    }else{
        score = score * (Wbonus * 2);
        TotalScore = TotalScore + score;
    }
    if(wordplayed == 7){
        TotalScore = TotalScore + 50;
    }
    //update ui
    var currentScore = document.getElementById("currentScore");
    currentScore.innerHTML = "Score: " + TotalScore;
    
    var currentword = document.getElementById("currentWord");
            currentword.innerHTML = "Current Word: ";
    
    score=0;
    clearboard();
}

//Remove placed tiles and reset variables
function clearboard(){
    document.getElementById("scrabble_board").innerHTML = boardInit;
    first = true;
    Wbonus = 0;
    word = "";
    wordplayed = 0;
    pretile = 0;
    initdraggable();
    dealhand();
}

//fully resets all attributes of the games and starts a new game
function reset(){
    //reset variables
    tiledata = ScrabbleTiles;
    Remaintile = 100;
    letter = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","_"];
    score = 0;
    word = "";
    Wbonus = 0;
    TotalScore= 0;
    first = true;
    pretile = 0;
    wordplayed = 0;

    //reset ui elements
    document.getElementById("scrabble_board").innerHTML = boardInit;
    dealhand();

    var currentScore = document.getElementById("currentScore");
    currentScore.innerHTML = "Score: ";

    var remainingTile = document.getElementById("msg");
    remainingTile.innerHTML = "";

    var currentword = document.getElementById("currentWord");
    currentword.innerHTML = "Current Word: ";

}
