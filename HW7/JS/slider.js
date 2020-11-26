/*
 File: https://dachaoda.github.io/GUI_Fall2020/HW7/JS/slider.js
 91.461 Assignment: Using the jQuery UI Slider and Tab Widgets
 Dachao Kuang, UMass Lowell Computer Science, Dachao_Kuang@student.uml.edu
 Copyright (c) 2020 by Dachao Kuang. All rights reserved. May be freely
 copied or excerpted for educational purposes with credit to the author.
 updated by DK on November 25, 2020 at 10:26 PM

 Decription: This script creates a tabel dynamically based on user input between the
 range of -100 to 100
*/

$(document).ready(function () {

    /*
     Minimum Columne value slider
    */
    $("#Minimum_CV_slider").slider({
        range: 200,
        min: -100,
        max: 100,
        value: 1,
        step: 1,
        slide: function (event, ui) {
            //Bind slider to Minimum Column Value input
            $("#Minimum_CV").val(ui.value);
            //Manual trigger for validation for Minimum Column Value input
            $("#RangeForm").validate().element('#Minimum_CV');
        }
    });

    //Bind Minimum Column Value input to slider
    $("#Minimum_CV").on("change", function () {
        $("#Minimum_CV_slider").slider("value", this.value);
    });

    /*
     Maximum Columne value slider
    */
    $("#Maximum_CV_slider").slider({
        range: 200,
        min: -100,
        max: 100,
        value: 10,
        step: 1,
        slide: function (event, ui) {
            //Bind slider to Minimum Column Value input
            $("#Maximum_CV").val(ui.value);
            //Manual trigger for validation for Maximum Column Value input
            $("#RangeForm").validate().element('#Maximum_CV');
        }
    });

    //Bind Minimum Column Value input to slider
    $("#Maximum_CV").on("change", function () {
        $("#Maximum_CV_slider").slider("value", this.value);
    });

    /*
     Minimum row value slider
    */
    $("#Minimum_RV_slider").slider({
        range: 200,
        min: -100,
        max: 100,
        value: 10,
        step: 1,
        slide: function (event, ui) {
            //Bind slider to Minimum row value input
            $("#Minimum_RV").val(ui.value);
            //Manual trigger for validation for Minimum row Value input
            $("#RangeForm").validate().element('#Minimum_RV');
        }
    });
    //Bind Minimum row value input to slider
    $("#Minimum_RV").on("change", function () {
        $("#Minimum_RV_slider").slider("value", this.value);
    });

    /*
     Maximum row value slider
    */
    $("#Maximum_RV_slider").slider({
        range: 200,
        min: -100,
        max: 100,
        value: 10,
        step: 1,
        slide: function (event, ui) {
            //Bind slider to Maximum row value input
            $("#Maximum_RV").val(ui.value);
            //Manual trigger for validation for Maximum row Value input
            $("#RangeForm").validate().element('#Maximum_RV');
        }
    });
    //Bind Maximum row value input to slider
    $("#Maximum_RV").on("change", function () {
        $("#Maximum_RV_slider").slider("value", this.value);
    });

});