// ADD NEW ITEM TO END OF LIST
var list = document.getElementById('four');
list.parentElement.innerHTML= list.parentElement.innerHTML + '<li id= "five">cream</li>'



// ADD NEW ITEM START OF LIST
var list = document.getElementById('one')
list.parentElement.innerHTML='<li id= "zero">kale</li>' + list.parentElement.innerHTML


// ADD A CLASS OF COOL TO ALL LIST ITEMS
var listAll = document.querySelectorAll('ul li')
listAll.forEach(function(listItem) {
    listItem.className = "cool"
});



// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var number = listAll.length
var header = document.querySelector('h2');
header.innerHTML= header.innerHTML + '<span>'+ number + '</span>'
