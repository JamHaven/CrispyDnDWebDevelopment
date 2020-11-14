function changeBurger(x) {
  x.classList.toggle("change");
  var navMenu = document.getElementById("menu");
  if (navMenu.style.display === "block") {
    navMenu.classList.toggle("hidenav");
  } else {
    navMenu.classList.toggle("shownav");
  }
}


function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; elmnt.add }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}


function queryDnDApiGetArmor() {
  var xhr = new XMLHttpRequest();
  var myObj;


  xhr.open('GET', 'https://www.dnd5eapi.co/api/equipment/');
  xhr.send(null);
  xhr.onreadystatechange = function () {
    var table = document.getElementById("equipmentTable");
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        //console.log(xhr.responseText); // 'This is the returned text.'
        myObj = JSON.parse(xhr.responseText);
        for (result in myObj.results) {
          var row = table.insertRow(-1);
          row.setAttribute("id", myObj.results[result].name);
          var namerow = row.insertCell(0);
          namerow.innerHTML = myObj.results[result].name;
          var btn = document.createElement("BUTTON");
          btn.classList.add("myButton");  // Create a <button> element
          btn.innerHTML = "Add";
          btn.setAttribute("link", myObj.results[result].url);
          btn.addEventListener("click", function () { addItemShoppingList(this); })
          var buttonrow = row.insertCell(1);
          buttonrow.appendChild(btn);
          buttonrow.classList.add("buttoninTable");
        }
      } else {
        console.log('Error: ' + xhr.status); // An error occurred during the request.
      }
    }
  };
}


function addItemShoppingList(btnElement) {
  let parentListItem = btnElement.closest("tr");
  if(isIdInEquipmentTable(parentListItem.getAttribute("id"))){
    console.log("Already in list");
  }
  else{
  let clonedItem = parentListItem.cloneNode(true);    //clone the li node -> this removes all eventListeners from childnodes!
  clonedItem.setAttribute("id", parentListItem.getAttribute("id"))
  let btn = clonedItem.getElementsByTagName("button")[0]; //get the button element
  btn.textContent = "x";
  btn.addEventListener("click", function () { this.closest("tr").remove(); });   //click event that removes the list element
  document.getElementById("shoppingList").appendChild(clonedItem); //append li element to wishlist
  }
}

function isIdInEquipmentTable(idToCheckAgainstTable) {
  var children = document.querySelectorAll("#shoppingList tr");
  for (var i = 0; i < children.length; i++) {
    if(idToCheckAgainstTable == children[i].id){
      return true;
    }
  }
  return false;
}


/*
function getArmorDetails(jsonEquipment) {
  for (var i = 0; i < myObj.results.length; i++) {
    //console.log(myObj.results[element].url);
    equipmentXhrList[i] = new XMLHttpRequest();
    equipmentXhrList[i].open('GET', 'https://www.dnd5eapi.co' + myObj.results[i].url)
    equipmentXhrList[i].send();
    equipmentXhrList[i].onreadystatechange = function () {
      var DONE = 4; // readyState 4 means the request is done.
      var OK = 200; // status 200 is a successful return.
      if (equipmentXhrList[i].readyState === DONE) {
        if (equipmentXhrList[i].status === OK) {
          var equipmentResponse = JSON.parse(equipmentXhrList[i].responseText);
          console.log(equipmentResponse);
          if (equipmentResponse.equipment_category.index == "armor") {
            var row = table.insertRow(-1);
            row.insertCell(0).innerHTML = equipmentResponse.name;
            row.insertCell(1).innerHTML = equipmentResponse.armor_category;
            row.insertCell(2).innerHTML = equipmentResponse.armor_class.base;
            row.insertCell(3).innerHTML = equipmentResponse.str_minimum;
            row.insertCell(4).innerHTML = equipmentResponse.stealth_disadvantage;
            row.insertCell(5).innerHTML = equipmentResponse.weight;
            row.insertCell(6).innerHTML = equipmentResponse.cost.quantity + " " + equipmentResponse.cost.unit;
          }
        } else {
          console.log('Error: ' + equipmentXhrList.status); // An error occurred during the request.
        }
      }
    };
  }
}*/