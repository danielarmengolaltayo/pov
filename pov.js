var myObj, i, a="", b="", x = "", c=0, id=0, path="";
            
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
        //document.getElementById("demo").innerHTML = myObj.name;
        updatePhoto(c,id); //onload
    }
};
xmlhttp.open("GET", "assets/data.txt", true);
xmlhttp.send();


function updatePhoto(c,id){
    path = "assets/" + myObj.collection[c].photos[id].code + ".jpg";
    x = "<img src='" + path + "' usemap='#" + id + "' id='content'><map name='" + id + "'>";

    for (i in myObj.collection[c].photos[id].people) {
        x += "<area target='_self' coords='" + myObj.collection[c].photos[id].people[i].coords + "' shape='rect' onclick='updatePhoto(c," + myObj.collection[c].photos[id].people[i].id + ")'>";
    }

    x += "</map>"
    
    //console.log(myObj.collection.length);
    
    if (c == 0){
        a = "";
        b = "<a onclick='updateOnNext()'>next</a>";
    }else if (c == myObj.collection.length - 1){
        a = "<a onclick='updateOnPrev()'>prev</a>";
        b = "";
    }else if (c > 0 && c < myObj.collection.length){
        a = "<a onclick='updateOnPrev()'>prev</a>";
        b = "<a onclick='updateOnNext()'>next</a>";
    }

    document.getElementById("prev").innerHTML = a;
    document.getElementById("next").innerHTML = b;
    
    document.getElementById("photo").innerHTML = x;
    document.getElementById("content").src = path;
    
    console.log("c:" + c);
    console.log("id:" + id);
}

function updateOnLoad (){
    c = 0;
    id = 0;
    updatePhoto(c,id);
}

function updateOnPrev (){
    c = c - 1;
    id = 0;
    updatePhoto(c,id);
}

function updateOnNext (){
    c = c + 1;
    id = 0;
    updatePhoto(c,id);
}