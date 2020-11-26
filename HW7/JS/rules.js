/*
 File: https://dachaoda.github.io/GUI_Fall2020/HW7/JS/rules.js
 91.461 Assignment: Using the jQuery UI Slider and Tab Widgets
 Dachao Kuang, UMass Lowell Computer Science, Dachao_Kuang@student.uml.edu
 Copyright (c) 2020 by Dachao Kuang. All rights reserved. May be freely
 copied or excerpted for educational purposes with credit to the author.
 updated by DK on November 25, 2020 at 10:26 PM

 Decription: This javascript uses jquery and jquery validation plugin to valid user input
*/

$(document).ready(function() {

    $.validator.addMethod("lessThan", function(value, element, param) {
        return this.optional(element) || parseInt(value) > parseInt($(param).val()) || $(param).val().length == 0;;
    }, 'Invalid value1')

    $.validator.addMethod("moreThan", function(value, element, param) {
        return this.optional(element) || parseInt(value) < parseInt($(param).val()) || $(param).val().length == 0; 
    }, 'Invalid value2')

    $.validator.addMethod("notDecimal", function(value, element) {
        return this.optional(element) || (value%1) == 0;
    }, 'Invalid value: Please input integer only')

    $("#RangeForm").validate({
        rules: {
            Minimum_CV: {
                required: true,
                number: true,
                range: [-100, 100],
                moreThan: '#Maximum_CV',
                notDecimal: true
            },
            Maximum_CV: {
                required: true,
                number: true,
                range: [-100, 100],
                lessThan: '#Minimum_CV',
                notDecimal: true
            },
            Minimum_RV: {
                required: true,
                number: true,
                range: [-100, 100],
                moreThan: '#Maximum_RV',
                notDecimal: true
            },
            Maximum_RV: {
                required: true,
                number: true,
                range: [-100, 100],
                lessThan: '#Minimum_RV',
                notDecimal: true
            },
        },
        messages: {
            Minimum_CV: {
                required:'Empty Value! Please input a minimum column value',
                number: 'Invalid Number! Please input an integer value for minimum column',
                range: 'Invalid Range! Please enter a value between -100 and 100 for minimum column',
                moreThan: 'Invalid Range! Please enter a Minimum column value is smaller than Maximum colume value'
            },
            Maximum_CV: {
                required:'Empty Value! Please input a maximum column value',
                number: 'Invalid Number! Please input an integer value for maximum column',
                range: 'Invalid Range! Please enter a value between -100 and 100 for maximum column',
                lessThan: 'Invalid Range! Enter a Maximum column value is bigger than Maximum colume value'
            },
            Minimum_RV: {
                required:'Empty Value! Please input a minimum row value',
                number: 'Invalid Number! Please input an integer value for minimum row ',
                range: 'Invalid Range! Please enter a value between -100 and 100 for minimum row',
                moreThan: 'Invalid Range! Enter a Minimum row value is smaller than Maximum row value'

            },
            Maximum_RV: {
                required:'Empty Value! Please input a maximum row value',
                number: 'Invalid Number! Please input an integer value for maximum row',
                range: 'Invalid Range! Please enter a value between -100 and 100 for maximum row',
                lessThan: 'Invalid Range! Enter a Maximum row value is bigger than Maximum row value'
            },
        },

        errorPlacement: function(error, element){
            if(element.attr("name") == "Minimum_CV"){

                error.addClass("col-md-12 text-danger")
                error.insertBefore($("#Maximum_CV_L"));

            }else if(element.attr("name") == "Maximum_CV"){

                error.addClass("col-md-12  text-danger")
                error.insertBefore($("#Minimum_RV_L"));

            }else if(element.attr("name") == "Minimum_RV"){

                error.addClass("col-md-12  text-danger")
                error.insertBefore($("#Maximum_RV_L"));

            }else if(element.attr("name") == "Maximum_RV"){

                error.addClass("col-md-12  text-danger")
                error.insertBefore($("#Submit"));

            }else{
                error.insertAfter(element);
            }
        },
        
    });

    $("#Submit").click(function() {
        var valided = $("#RangeForm").valid();
        if (valided) {
            Generate();
        }else{
            $("#Error").text("Please fix input error first");
            $("#Error").addClass("col-md-12 text-center text-danger")
        }
    });

});

