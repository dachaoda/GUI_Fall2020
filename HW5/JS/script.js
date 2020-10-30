/*
 File: https://dachaoda.github.io/GUI_Fall2020/HW5/JS/script.js
 91.461 Assignment: Creating an Interactive Dynamic Table
 Dachao Kuang, UMass Lowell Computer Science, Dachao_Kuang@student.uml.edu
 Copyright (c) 2020 by Dachao Kuang. All rights reserved. May be freely
 copied or excerpted for educational purposes with credit to the author.
 updated by DK on October 29, 2020 at 10:12 PM

 Decription: This script creates a tabel dynamically based on user input between the
 range of -100 to 100
*/

var Minimum_CV;
var Maximum_CV;
var Minimum_RV;
var Maximum_RV;
var Error_Range = " not within the range of -100 to 100";
var Error_Empty = " is empty";
var Error_Char = " is not a numeric value";
var Error_Float = " is a float, please enter an integer"
var Error_Message = "";

// setting default values
test();
// Build inital tabel
Build_Table();


// Generate function is call when the Submit button is clicked
function Generate() {

    // reset error messages
    Error_Message = ""


    // Grab values from user input 
    Minimum_CV = document.getElementById("Minimum_CV").value;
    document.getElementById("Minimum_CV").style.border = "#ced4da solid 1px";
    Maximum_CV = document.getElementById("Maximum_CV").value;
    document.getElementById("Maximum_CV").style.border = "#ced4da solid 1px";
    Minimum_RV = document.getElementById("Minimum_RV").value;
    document.getElementById("Minimum_RV").style.border = "#ced4da solid 1px";
    Maximum_RV = document.getElementById("Maximum_RV").value;
    document.getElementById("Maximum_RV").style.border = "#ced4da solid 1px";

    //Checking values for user error
    In_Range(Minimum_CV, 'Minimum_CV');
    In_Range(Maximum_CV, 'Maximum_CV');
    In_Range(Minimum_RV, 'Minimum_RV');
    In_Range(Maximum_RV, 'Maximum_RV');

    check_Value();

    Build_Table();

    //Code for checking user input value
    /*
    var element = document.getElementById("Output");
    element.innerHTML = 'Min_CV: ' + Minimum_CV + ' Max_CV: ' + Maximum_CV + ' Max_RV: ' + Minimum_RV + ' Min_RV: ' + Maximum_RV;
    */

    //reset error messages
    var element = document.getElementById("Error");
    element.innerHTML = Error_Message;

}

function In_Range(x, y) {
    var temp = y + '_L';

    //Error checking if user input is empty
    if (x == "") {
        document.getElementById(y).style.border = "red solid 1px";
        temp = document.getElementById(temp).innerHTML;
        Error_Message = Error_Message.concat(temp, Error_Empty);
        var element = document.getElementById("Error");
        element.innerHTML = Error_Message;
        exit();
    }

    //Error checking if user input is not a number
    if (isNaN(x)) {
        document.getElementById(y).style.border = "red solid 1px";
        temp = document.getElementById(temp).innerHTML;
        Error_Message = Error_Message.concat(temp, Error_Char);
        var element = document.getElementById("Error");
        element.innerHTML = Error_Message;
        exit();
    }

    //Error checking if user input is not a integer
    if ((x % 1) != 0) {
        document.getElementById(y).style.border = "red solid 1px";
        temp = document.getElementById(temp).innerHTML;
        Error_Message = Error_Message.concat(temp, Error_Float);
        var element = document.getElementById("Error");
        element.innerHTML = Error_Message;
        exit();
    }


    //Error checking if user input is within range
    if (x <= 100 && x >= -100) {
        document.getElementById(y).style.border = "#ced4da solid 1px";
        return true;
    } else {
        document.getElementById(y).style.border = "red solid 1px";
        temp = document.getElementById(temp).innerHTML;
        Error_Message = Error_Message.concat(temp, Error_Range);
        var element = document.getElementById("Error");
        element.innerHTML = Error_Message;
        exit();
    }
}

//function for setting pre-define values for user input
function test() {
    Minimum_CV = '1';
    Maximum_CV = '10';
    Minimum_RV = '1';
    Maximum_RV = '10';
}

//Builds the tabel
function Build_Table() {
    var element = document.getElementById("Table");
    element.innerHTML = ""
    for (i = Minimum_RV; i <= Maximum_RV; i++) {

        // Builds only the first rows
        if (i == Minimum_RV) {
            var row = document.createElement('tr');
            var col = document.createElement('th');
            row.appendChild(col)
            for (j = Minimum_CV; j <= Maximum_CV; j++) {
                col = document.createElement('th');
                col.innerHTML = j;
                row.appendChild(col);
            }
            element.appendChild(row);
        }

        var row = document.createElement('tr');
        var col = document.createElement('th');
        col.innerHTML = i;
        row.appendChild(col)

        //build the rest of the rows
        for (j = Minimum_CV; j <= Maximum_CV; j++) {
            col = document.createElement('td');
            col.innerHTML = j * i;

            row.appendChild(col);
        }
        element.appendChild(row);

    }
    return;
}

//checks if user inputs a minimum value > maximum value
function check_Value() {
    if (Maximum_CV < Minimum_CV) {
        document.getElementById("Minimum_CV").style.border = "red solid 1px";
        document.getElementById("Maximum_CV").style.border = "red solid 1px"
        var element = document.getElementById("Error");
        element.innerHTML = 'Invalid range: Minimum column value is bigger than Maximum column value.';
        exit();
    }

    if (Maximum_RV < Minimum_RV) {
        document.getElementById("Minimum_RV").style.border = "red solid 1px";
        document.getElementById("Maximum_RV").style.border = "red solid 1px"
        var element = document.getElementById("Error");
        element.innerHTML = 'Invalid range: Minimum row value is bigger than Maximum row value.';
        exit();
    }

    return
}