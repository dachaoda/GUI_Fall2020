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

$(document).ready(function() {

    $("#Minimum_CV_slider").slider({
        range: 200,
        min: -100,
        max: 100,
        value: 1,
        step: 1,
        slide: function(event , ui){
            $("#Minimum_CV").val(ui.value);
        }
    });
    
    $("#Minimum_CV").on("change", function() {
        $("#Minimum_CV_slider").slider("value", this.value);
    });

    $("#Maximum_CV_slider").slider({
        range: 200,
        min: -100,
        max: 100,
        value: 10,
        step: 1,
        slide: function(event , ui){
            $("#Maximum_CV").val(ui.value);
        }
    });
    
    $("#Maximum_CV").on("change", function() {
        $("#Maximum_CV_slider").slider("value", this.value);
    });

    $("#Minimum_RV_slider").slider({
        range: 200,
        min: -100,
        max: 100,
        value: 10,
        step: 1,
        slide: function(event , ui){
            $("#Minimum_RV").val(ui.value);
        }
    });
    
    $("#Minimum_RV").on("change", function() {
        $("#Minimum_RV_slider").slider("value", this.value);
    });

    $("#Maximum_RV_slider").slider({
        range: 200,
        min: -100,
        max: 100,
        value: 10,
        step: 1,
        slide: function(event , ui){
            $("#Maximum_RV").val(ui.value);
        }
    });
    
    $("#Maximum_RV").on("change", function() {
        $("#Maximum_RV_slider").slider("value", this.value);
    });

});

