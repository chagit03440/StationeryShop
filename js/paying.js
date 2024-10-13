import data from "../json/data.json" with {type: 'json'};

let basket = [];  // Array to hold cart items

document.addEventListener("DOMContentLoaded", () => {


    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
        basket = JSON.parse(savedBasket);
        updateCartCount();
        showsItems();
    }

    // Event listener for "Stationery" link
    document.getElementById('link_stationery').addEventListener('click', function () {
        localStorage.setItem('pageContent', 'stationery');
        window.location.href = "../html/web.html";

    });

    // Event listener for "Notebooks" link
    document.getElementById('link_notebooks').addEventListener('click', function () {
        localStorage.setItem('pageContent', 'notebooks');
        window.location.href = "../html/web.html";
    });

    // Handle both the dropdown click and change events
    const selectElement = document.getElementById('items');

    // Add event listeners for both click and change
    selectElement.addEventListener('mousedown', handleSelection);
    selectElement.addEventListener('change', handleSelection);

    // Function to handle the dropdown selection
    function handleSelection() {
        const selectedValue = selectElement.value;

        if (selectedValue === "stationery") {
            localStorage.setItem('pageContent', 'stationery');
            window.location.href = "../html/web.html";
        } else if (selectedValue === "notebooks") {
            localStorage.setItem('pageContent', 'notebooks');
            window.location.href = "../html/web.html";
        }
    }
});

function updateCartCount() {
    const payingLink = document.getElementById('link_paying');
    payingLink.innerHTML = `<b>(${basket.length}) לתשלום</b> <i class="fa fa-shopping-cart"></i>`;
}



function myFunction() {
    var x = document.getElementById("mySiderBar");
    if (x.className === "sideBar") {
        x.className += " responsive";
    } else {
        x.className = "sideBar";
    }
}
function showsItems() {
    const divItems = document.getElementById("items_paying");
    divItems.innerHTML ='';
    let cell;
    for (let i = 0; i < basket.length; i++) {
        cell = document.createElement('div');
        cell.classList.add('show_item');
        // const count = document.createElement('p');    
        const titleItem = document.createElement('p');
        titleItem.innerText = basket[i].title;
        const price = document.createElement('p');
        price.innerText = basket[i].price;
        const lessbtn = document.createElement('button');
        lessbtn.classList.add("btnAddDelete");
        lessbtn.innerText = "-1";
        const morebtn = document.createElement('button');
        morebtn.classList.add("btnAddDelete");
        morebtn.innerText = "+1";

        // divItems.appendChild(count);
        cell.appendChild(morebtn);
        cell.appendChild(lessbtn);
        cell.appendChild(price);
        cell.appendChild(titleItem);
        divItems.appendChild(cell);
           
    }
    
}


