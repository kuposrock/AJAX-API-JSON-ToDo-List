

function getData(){
var postData = axios.get('https://api.vschool.io/matthewgrahek/todo').then(assignResponseToVariable).catch(error => {
    console.log(error);
  });
}
getData();

var data = [];
var listContainer = document.getElementsByClassName("listContainer");
var checkboxes = document.getElementsByClassName("itemCheckBox");
var editButtons = document.getElementsByClassName("editButton");
var deleteButtons = document.getElementsByClassName("deleteButton");
var form = document.listForm;


form.addEventListener("submit",function(event){
    event.preventDefault();
    var title = form.inputTitle.value;
    var description = form.inputDesc.value;
    var url = form.inputURL.value;
    var post = new createPost(title,description,url);
    sendData(post);
});

function addFunctionality() {

    for (var deleteButton of deleteButtons) {
        deleteButton.addEventListener('click', function (e) {
            var postNumber = parseInt(e.target.parentNode.querySelector('.itemNumber').innerText);
            console.log('https://api.vschool.io/matthewgrahek/todo/'+data[postNumber]._id);

            axios.delete('https://api.vschool.io/matthewgrahek/todo/'+data[postNumber]._id).then(response => {
                console.log(response.data);
              }).catch(error => {
                console.log(error)
              });

            e.target.parentNode.remove();
        });
    }

    for (var editButton of editButtons) {
        editButton.addEventListener('click', function (e) {
            var postNumber = parseInt(e.target.parentNode.querySelector('.itemNumber').innerText);
            if (e.target.innerText == "Edit") {
                e.target.innerHTML = "Save";
                e.target.parentNode.querySelector('.itemTitle').contentEditable = "true";
                e.target.parentNode.querySelector('.itemDescription').contentEditable = "true";
                data[postNumber].title = e.target.parentNode.querySelector('.itemTitle').innerText;
                data[postNumber].description = e.target.parentNode.querySelector('.itemDescription').innerText;
                axios.put('https://api.vschool.io/matthewgrahek/todo/'+data[postNumber]._id, data[postNumber]).then(response => {
                    console.log(response.data);
                  }).catch(error => {
                    console.log(error)
                  });
            } else {
                data[postNumber].title = e.target.parentNode.querySelector('.itemTitle').innerText;
                data[postNumber].description = e.target.parentNode.querySelector('.itemDescription').innerText;
                axios.put('https://api.vschool.io/matthewgrahek/todo/'+data[postNumber]._id, data[postNumber]).then(response => {
                    console.log(response.data);
                  }).catch(error => {
                    console.log(error)
                  });
                e.target.innerHTML = "Edit";
                e.target.parentNode.querySelector('.itemTitle').contentEditable = "false";
                e.target.parentNode.querySelector('.itemDescription').contentEditable = "false";
            }
        });
    }

    for (var checkbox of checkboxes) {
        checkbox.addEventListener('change', function (e) {
            var postNumber = parseInt(e.target.parentNode.querySelector('.itemNumber').innerText);
            if (this.checked) {
                e.target.parentNode.style.opacity = .5;
                data[postNumber].completed=true;
                axios.put('https://api.vschool.io/matthewgrahek/todo/'+data[postNumber]._id, data[postNumber]).then(response => {
                    console.log(response.data);
                  }).catch(error => {
                    console.log(error)
                  });
            } else {
                e.target.parentNode.style.opacity = 1;
                data[postNumber].completed=false;
                axios.put('https://api.vschool.io/matthewgrahek/todo/'+data[postNumber]._id, data[postNumber]).then(response => {
                    console.log(response.data);
                  }).catch(error => {
                    console.log(error)
                  });
            }

        });

    }
}

function assignResponseToVariable(response){
    data = response.data;
    parseDataToWebsite(data);
    addFunctionality();
    console.log(data);
}

function createPost(title,descrip,url){
    this.title=title;
    this.description=descrip;
    this.imgUrl = url;
    this.completed=false;
}

function sendData(newTodo){
    console.log(newTodo);
    axios.post('https://api.vschool.io/matthewgrahek/todo', newTodo).then(response => {
    console.log(response.data);
    data =[];
    deletePosts();
    getData();
    //data.push(response.data);
    //createIndividualPost(response.data,data.length);
    //addFunctionality();
  }).catch(error => {
    console.log(error);
  });
}
function deletePosts(){
    while (listContainer[0].hasChildNodes()) {  
        listContainer[0].removeChild(listContainer[0].firstChild);
      }
}

function parseDataToWebsite(items) {
    for (var i in items) {
        createIndividualPost(items[i], i);
    }
}

function createIndividualPost(post, number) {

    var listItem = document.createElement("div");
    listItem.classList.add("listItem");

    var itemNumber = document.createElement("div");
    itemNumber.classList.add("itemNumber");
    itemNumber.innerHTML = parseInt(number) + ". ";

    var itemTitle = document.createElement("div");
    itemTitle.classList.add("itemTitle");
    itemTitle.innerText = (post.title === undefined) ? "Untitled" : " " + post.title;

    var img = document.createElement("img");
    (post.imgUrl === undefined) ? img.style.display = 'none' : img.src = post.imgUrl;

    var itemDescription = document.createElement("div");
    itemDescription.classList.add("itemDescription");
    itemDescription.innerText = (post.description === undefined) ? "No" : post.description;

    var imgTextContainer = document.createElement("div");
    imgTextContainer.classList.add("imgTextContainer");

    var checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.classList.add("itemCheckBox");
    checkBox.checked=post.completed;
    listItem.style.opacity = (post.completed)? .5:1;


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




