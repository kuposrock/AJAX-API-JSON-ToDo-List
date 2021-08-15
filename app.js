
var data = [];
var listContainer = document.getElementsByClassName("listContainer");
var checkboxes = document.getElementsByClassName("itemCheckBox");

for(checks of checkboxes){
    if(checks.checked){
    console.log("checked");
    }
}

document.addEventListener("DOMContentLoaded", getData());
function getData() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var jsonData = xhr.responseText;
            data = JSON.parse(jsonData);
            console.log(data);
            parseDataToWebsite(data);
        }
    };
    xhr.open("GET", "https://api.vschool.io/matthewgrahek/todo", true);
    xhr.send();
}

function parseDataToWebsite(items) {
    for (i in items) {
        createIndividualPost(items[i], i);
    }
}

function createIndividualPost(post, number) {

    var listItem = document.createElement("div");
    listItem.classList.add("listItem");

    var itemNumber = document.createElement("div");
    itemNumber.classList.add("itemNumber");
    itemNumber.innerHTML = parseInt(number) + 1 + ". ";

    var itemTitle = document.createElement("div");
    itemTitle.classList.add("itemTitle");
    itemTitle.innerText = (post.title === undefined) ? "Untitled": " "+ post.title;

    var img = document.createElement("img");
    (post.imgUrl === undefined) ? img.style.display ='none' :img.src = post.imgUrl;

    var itemDescription = document.createElement("div");
    itemDescription.classList.add("itemDescription");
    itemDescription.innerText = (post.description === undefined) ? "No" : post.description;

    var imgTextContainer = document.createElement("div");
    imgTextContainer.classList.add("imgTextContainer");

    var checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.classList.add("itemCheckBox");
    

    var editButton = document.createElement("button");
    editButton.classList.add("editButton");
    editButton.innerText = "Edit";

    var deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.innerText = "Delete";

    listItem.appendChild(itemNumber);
    listItem.appendChild(itemTitle);
    imgTextContainer.appendChild(img);
    imgTextContainer.appendChild(itemDescription);
    listItem.appendChild(imgTextContainer);
    listItem.appendChild(checkBox);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listContainer[0].appendChild(listItem);
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




