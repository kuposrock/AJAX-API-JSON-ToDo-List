const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const jsonData = xhr.responseText;
        const data = JSON.parse(jsonData);
        const name = data.objects[0].pokemon;
        var pokemon = [];
        for (object of name) {
            pokemon.push(" " + object.name);
        }
        pokemon.sort();
        for (poke of pokemon) {
            var listitem = document.createElement("li");
            listitem.innerHTML = poke;
            document.getElementById("demo1").appendChild(listitem);
        }
    }
};
xhr.open("GET", "https://api.vschool.io/pokemon", true);
xhr.send();