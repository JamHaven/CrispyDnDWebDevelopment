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
    file = elmnt.getAttribute("data-w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; elmnt.add }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("data-w3-include-html");
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
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  var modalText = document.getElementById("modalText");

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  if (isIdInEquipmentTable(parentListItem.getAttribute("id"))) {
    modalText.innerHTML = "Item already in list! Remove it first!";
    modal.style.display = "block";
  }
  else {
    let clonedItem = parentListItem.cloneNode(true);    //clone the li node -> this removes all eventListeners from childnodes!
    clonedItem.setAttribute("id", parentListItem.getAttribute("id"))
    let btn = clonedItem.getElementsByTagName("button")[0]; //get the button element
    btn.textContent = "\u2718";
    btn.addEventListener("click", function () { this.closest("tr").remove(); });   //click event that removes the list element
    document.getElementById("shoppingList").appendChild(clonedItem); //append li element to wishlist
  }
}

function isIdInEquipmentTable(idToCheckAgainstTable) {
  var children = document.querySelectorAll("#shoppingList tr");
  for (var i = 0; i < children.length; i++) {
    if (idToCheckAgainstTable == children[i].id) {
      return true;
    }
  }
  return false;
}

function validateLogin() {
  var username = document.forms["loginForm"]["Username"].value;
  var password = document.forms["loginForm"]["Password"].value;
  var email = document.forms["loginForm"]["Email"].value;

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  var modalText = document.getElementById("modalText");

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  if (username == "" || password == "" || email == "") {
    modalText.innerHTML = "Please fill out all fields.";
    modal.style.display = "block";
    return false;
  }

  if (!ValidateEmail(email)) {
    modalText.innerHTML = "The E-Mail address is not valid.";
    modal.style.display = "block";
    return false;
  }

  if (username == "nousername" && password == "nopassword") {
    window.location.replace("/member.html");
    return true;
  } else {
    modalText.innerHTML = "Username or password is not correct.";
    modal.style.display = "block";
    return false
  }
}

function ValidateEmail(email) {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return (true)
  }
  return (false)
}

function searchTable() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("equipmentTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}