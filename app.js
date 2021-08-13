
var data=[];
var listContainer = document.getElementsByClassName("listContainer");

document.addEventListener("DOMContentLoaded", getData());
function getData(){
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var jsonData = xhr.responseText;
        data = JSON.parse(jsonData);
        console.log(data);
    } 
};
xhr.open("GET", "https://api.vschool.io/matthewgrahek/todo", true);
xhr.send();
}


function createPost(){
    var listItem = document.createElement("div");
    listItem.classList.add("listItem");

    var itemNumber = document.createElement("div");
    itemNumber.classList.add("listNumber");

    var itemTitle = document.createElement("div");
    itemTitle.classList.add("itemTitle");

    var img = document.createElement("img");

    var itemDescript = document.createElement("div");
    itemDescript.classList.add("itemDescript");

    var imgTextContainer = document.createElement("div");
    imgTextContainer.classList.add("imgTextContainer");
}



// const xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         const jsonData = xhr.responseText;
//         const data = JSON.parse(jsonData);
//         const name = data.objects[0].pokemon;
//         var pokemon = [];
//         for (object of name) {
//             pokemon.push(" " + object.name);
//         }
//         pokemon.sort();
//         for (poke of pokemon) {
//             var listitem = document.createElement("li");
//             listitem.innerHTML = poke;
//             document.getElementById("demo1").appendChild(listitem);
//         }
//     }
// };
// xhr.open("GET", "https://api.vschool.io/pokemon", true);
// xhr.send();




