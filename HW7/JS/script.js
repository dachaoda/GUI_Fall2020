/*
 File: https://dachaoda.github.io/GUI_Fall2020/HW7/JS/script.js
 91.461 Assignment: Using the jQuery UI Slider and Tab Widgets
 Dachao Kuang, UMass Lowell Computer Science, Dachao_Kuang@student.uml.edu
 Copyright (c) 2020 by Dachao Kuang. All rights reserved. May be freely
 copied or excerpted for educational purposes with credit to the author.
 updated by DK on November 25, 2020 at 10:26 PM

 Decription: This script creates a tabel dynamically based on user input between the
 range of -100 to 100
*/
var idnumber = 1;
var tabnumber = 1;
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
    //In_Range(Minimum_CV, 'Minimum_CV');
    //In_Range(Maximum_CV, 'Maximum_CV');
    //In_Range(Minimum_RV, 'Minimum_RV');
    //In_Range(Maximum_RV, 'Maximum_RV');

    //check_Value();

    Build_Tab();

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
    $("#tableBox").tabs();
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

function Build_Tab() {
    //error check
    limit_tabs();
    //init tabs function
    $("#tableBox").tabs();

    //Create Tab labels
    idnumber = idnumber + 1;
    var tableBox = document.getElementById("tableBox")
    var tab_label = document.getElementById("tab_label");
    var label_list = document.createElement('li');
    var label_link = document.createElement('a');
    var check_box = document.createElement('input');

    //Create Tab labels attributes and classes
    check_box.setAttribute("class", "form-check-inline mt-2 delete_check");
    check_box.setAttribute("type", "checkbox");
    check_box.setAttribute("name", parseInt(idnumber));
    label_link.innerHTML = Minimum_CV.toString() + ', ' + Maximum_CV.toString() + ', ' + Minimum_RV.toString() + ', ' + Maximum_RV.toString();
    label_link.setAttribute("href", "#testtab" + idnumber.toString());
    label_list.setAttribute("id", "listtab" + idnumber.toString());

    //Add Tab to existing list
    label_list.appendChild(label_link);
    label_list.appendChild(check_box);
    tab_label.appendChild(label_list);

    //Create Tab Table 
    var div = document.createElement('div');
    var table = document.createElement('table');
    table.setAttribute('id', 'testtable' + idnumber.toString());
    table.setAttribute('class', 'col-md-12')
    div.setAttribute('id', 'testtab' + idnumber.toString());

    //Add Tabel to html
    div.appendChild(table);
    tableBox.appendChild(div);
    Build_Tab_Table("testtable" + idnumber.toString());
    $("#tableBox").tabs("refresh");
    tabnumber = tabnumber + 1;
    return;
}

//same function as Build_Table except it accepts an element id
function Build_Tab_Table(table_id) {
    var element = document.getElementById(table_id);
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

// Delete all checked tabs
function delete_tab() {
    $('.delete_check:checkbox:checked').each(function () {
        //find name of tab
        var checkedValue = $(this).attr('name');

        //Generate id for tabs and tables to delete
        var tab_id = 'testtab' + checkedValue;
        var list_id = 'listtab' + checkedValue;

        //delete the tab and table
        var delete_tab = document.getElementById(tab_id);
        var delete_list = document.getElementById(list_id);
        delete_tab.remove();
        delete_list.remove();

        //update count of tabs
        tabnumber = tabnumber - 1;

        //reset error message
        var element = document.getElementById("Error");
        element.innerHTML = '';
    });
}

// Checks if user has already have 14 tabs generated
function limit_tabs() {
    if (tabnumber == 14) {
        var element = document.getElementById("Error");
        element.innerHTML = 'You have reached the limit of 14 tabs. Please delete some before creating more tables.';
        exit();
    }
    return;
}