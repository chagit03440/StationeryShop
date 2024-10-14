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

        // Create an image element for the grid
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
        } else {
            quantity.innerText = `Quantity: 0`;
        }
        quantity.id = `quantity-${gridData[i].catalogId}`;

        // Create a price element
        const price = document.createElement('p');
        price.innerText = `Price: $${gridData[i].price.toFixed(2)}`; // Format price

        // Create a button for adding to cart
        const addToCartButton = document.createElement('button');
        addToCartButton.innerText = "הוספה לסל";
        addToCartButton.classList.add('add-to-cart-button');

        // Create a wrapper for modal content
        const modalContentWrapper = document.createElement('div');
        modalContentWrapper.classList.add('modal-content-wrapper'); // New wrapper class

        // Create the modal container div
        const modal = document.createElement('div');
        modal.id = "myModal";
        modal.classList.add('modal');

        const poptitle = document.createElement('div');
        poptitle.id = "poptitle";
        poptitle.classList.add('poptitle');

        const header = document.createElement('div');
        header.id = "popHeader";
        header.classList.add('header');
        header.innerText = title.innerText;


        // Create the close button (span) for the modal
        const closebtn = document.createElement('btn');
        closebtn.classList.add('close');
        closebtn.innerHTML = "X";  // X button to close modal
        closebtn.fdprocessedid = "whwffp";

        poptitle.appendChild(closebtn);
        poptitle.appendChild(header);

        // Create the modal image element
        const modalImg = document.createElement('img');
        modalImg.classList.add('modal-content');
        modalImg.id = "myImg";  // Same as your intended ID for the modal image

        // const description = document.createElement('p');
        // description.id = "description";
        // caption.innerText = gridData[i].title;

        // Create the bottom for the modal (optional)
        const bottom = document.createElement('div');
        bottom.classList.add('bottom');
        bottom.id = "bottom";

        bottom.appendChild(price);
        bottom.appendChild(quantity);
        bottom.appendChild(addToCartButton);


        // Append the close button, image, and caption to the wrapper container
        modalContentWrapper.appendChild(poptitle);
        modalContentWrapper.appendChild(modalImg);
        modalContentWrapper.appendChild(bottom);

        // Append the wrapper to the modal
        modal.appendChild(modalContentWrapper);

        // Add click event listener for the image to open the modal
        img.onclick = function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            // Ensure price, quantity, and addToCartButton are visible in the modal
            bottom.innerHTML = ''; // Clear previous content
            bottom.appendChild(price.cloneNode(true));  // Clone and append the price element
            bottom.appendChild(quantity.cloneNode(true));  // Clone and append the quantity element
            // Clone the button and reapply the event listener
            const clonedAddToCartButton = addToCartButton.cloneNode(true);
            clonedAddToCartButton.addEventListener('click', () => {
                addToBasket(gridData[i]);
            });
            bottom.appendChild(clonedAddToCartButton);
        };

        // Close the modal when the close button (X) is clicked
        closebtn.onclick = function () {
            modal.style.display = "none";
        };

        // Close the modal when clicking outside the image
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };

        // Add event listener to the button
        addToCartButton.addEventListener('click', () => {
            addToBasket(gridData[i]);
        });

        // Append elements to the cell
        cell.appendChild(title);
        cell.appendChild(img);
        cell.appendChild(modal);
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
    let count = 0;
    for (let i = 0; i < basket.length; i++) {
        count += basket[i].quantity;
    }
    payingLink.innerHTML = `<b>(${count}) לתשלום</b> <i class="fa fa-shopping-cart"></i>`;
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
