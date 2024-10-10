function myFunction() {
    var x = document.getElementById("mySiderBar");
    if (x.className === "sideBar") {
      x.className += " responsive";
    } else {
      x.className = "sideBar";
    }
  }