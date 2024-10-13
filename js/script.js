import data from "../json/data.json" with {type: 'json'};

let basket = [];  // Array to hold cart items

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById('link_paying').addEventListener('click', function () {
        window.location.href = "../html/paying.html";
    });

    const gridContainer = document.getElementById("page_grid");
    // Initial grid population
    populateGrid(data.craft, gridContainer);

    // Check saved content
    const savedPageContent = localStorage.getItem('pageContent');
    if (savedPageContent === "notebooks") {
        setPage('link_notebooks');
    } else {
        setPage('link_stationery');
    }

    // Check saved basket
    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
        basket = JSON.parse(savedBasket);  // Parse basket from localStorage
        updateCartCount();
    }

    // Event listener for "Stationery" link
    document.getElementById('link_stationery').addEventListener('click', function () {
        setPage('link_stationery');
    });

    // Event listener for "Notebooks" link
    document.getElementById('link_notebooks').addEventListener('click', function () {
        setPage('link_notebooks');
    });

    // Event listener for dropdown changes
    document.getElementById('items').addEventListener('change', function () {
        const selectedValue = this.value;
        if (selectedValue === 'stationery') {
            setPage('link_stationery');
        } else if (selectedValue === 'notebooks') {
            setPage('link_notebooks');
        }
    });

});

// Function to populate grid with data
function populateGrid(gridData, gridContainer) {
    gridContainer.innerHTML = '';  // Clear the grid content before populating

    for (let i = 0; i < gridData.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-item');

        // Create a title element
        const title = document.createElement('p');
        title.innerText = gridData[i].title;

        // Create an image element
        const img = document.createElement('img');
        img.src = gridData[i].image;  // Set the image source
        img.onerror = function () {
            this.src = "../images/iq2sub.jpg";  // Fallback image
        };
        img.classList.add('grid-item-image'); // Optional: Add a class for styling

      
        // Create a quantity element
        const quantity = document.createElement('p');
        let storedBasket = localStorage.getItem('basket');
        basket = storedBasket ? JSON.parse(storedBasket) : [];

        // Check if the item already exists in the basket
        const existItem = basket.find(basketItem => basketItem.catalogId === gridData[i].catalogId);

        if (existItem) {
            quantity.innerText = `Quantity: ${existItem.quantity}`;
        }
        quantity.innerText = `Quantity: ${0}`;
        quantity.id = `quantity-${gridData[i].catalogId}`;

        // Create a price element
        const price = document.createElement('p');
        price.innerText = `Price: $${gridData[i].price.toFixed(2)}`; // Format price

        // Create a button for adding to cart
        const addToCartButton = document.createElement('button');
        addToCartButton.innerText = "הוספה לסל";
        addToCartButton.classList.add('add-to-cart-button');

        // Add event listener to the button
        addToCartButton.addEventListener('click', () => {
            addToBasket(gridData[i]);
        });

        // Append image, title, price, quantity, and button to the cell
        cell.appendChild(title);
        cell.appendChild(img);
        cell.appendChild(quantity);
        cell.appendChild(price);
        cell.appendChild(addToCartButton);

        gridContainer.appendChild(cell);
    }
}

// Function to add item to the basket
function addToBasket(item) {

    // Retrieve and parse the basket from localStorage
    let storedBasket = localStorage.getItem('basket');
    basket = storedBasket ? JSON.parse(storedBasket) : [];

    // Check if the item already exists in the basket
    const existingItem = basket.find(basketItem => basketItem.catalogId === item.catalogId);

    if (existingItem) {
        // If the item exists, increment its quantity
        existingItem.quantity += 1;
    } else {
        // If the item does not exist, add it with quantity 1
        const basketItem = { ...item, quantity: 1 };
        basket.push(basketItem);
    }

    // Save the updated basket to localStorage
    localStorage.setItem('basket', JSON.stringify(basket));

    // Update the cart count on the page
    updateCartCount();

    // Update the specific item's quantity in the grid
    const quantityElement = document.getElementById(`quantity-${item.catalogId}`);
    if (quantityElement) {
        const updatedItem = basket.find(basketItem => basketItem.catalogId === item.catalogId);
        quantityElement.innerText = `Quantity: ${updatedItem.quantity}`;
    }

    // Show confirmation
    alert(`${item.title} added to cart!`);
}




// Function to update the cart count on the "Paying" link
function updateCartCount() {
    const payingLink = document.getElementById('link_paying');
    payingLink.innerHTML = `<b>(${basket.length}) לתשלום</b> <i class="fa fa-shopping-cart"></i>`;
}

function replaceImage() {
    const topImg = document.getElementById("topimg");
    const topImgContainer = topImg.parentElement;

    // Hide the image
    topImg.style.display = "none";

    // Create and insert the new paragraph
    const newParagraph = document.createElement('p');
    newParagraph.innerText = "המלאי בקטגוריה זו משתנה. יסופקו מחברות של חברות Uni/IQ/ קלסריקה בהתאם למלאי";
    newParagraph.id = 'notebooks-description';

    // Append the paragraph to the container where the image was
    topImgContainer.appendChild(newParagraph);
}

// Function to set the page based on the link clicked
function setPage(linkId) {
    const pageHeader = document.getElementById("top_header");
    const gridContainer = document.getElementById("page_grid");
    const topImg = document.getElementById("topimg");
    const notebooksDescription = document.getElementById("notebooks-description");

    // Remove the paragraph if it exists
    if (notebooksDescription) {
        notebooksDescription.remove();
    }

    let gridData = [];
    switch (linkId) {
        case "link_stationery":
            pageHeader.innerText = "כלי-כתיבה";
            topImg.style.display = "block"; // Show the image for "Stationery"
            gridData = data.craft;
            break;
        case "link_notebooks":
            pageHeader.innerText = "מחברות";
            replaceImage();  // Replace image with paragraph
            gridData = data.notebooks;
            break;
    }

    // Repopulate the grid with the selected category data
    populateGrid(gridData, gridContainer);
}

function myFunction() {
    var x = document.getElementById("mySiderBar");
    if (x.className === "sideBar") {
        x.className += " responsive";
    } else {
        x.className = "sideBar";
    }
}
