
import data from "../json/data.json" with {type: 'json'}
document.addEventListener("DOMContentLoaded", () => {

    const gridContainer = document.getElementById("page_grid");

    for (let i = 0; i <= data.craft.length; i++) {

        const cell = document.createElement('div');
        cell.classList.add('grid-item');

        // Create a title element
        const title = document.createElement('p');
        title.innerText = data.craft[i].title;

        // Create an image element
        const img = document.createElement('img');
        img.src = data.craft[i].image;  // Set the image source
        img.classList.add('grid-item-image'); // Optional: Add a class for styling


        // Create a price element
        const price = document.createElement('p');
        price.innerText = `Price: $${data.craft[i].price.toFixed(2)}`; // Format price

        const addToCartButton = document.createElement('button');
        addToCartButton.innerText = "הוספה לסל";
        addToCartButton.classList.add('add-to-cart-button');
        addToCartButton.addEventListener('click', () => {
            // You can handle the add-to-cart logic here
            alert(`${data.craft[i].title} added to cart!`);
        });

        // Append image, title, and price to the cell
        cell.appendChild(title);
        cell.appendChild(img);
        cell.appendChild(price);
        cell.appendChild(addToCartButton);

        gridContainer.appendChild(cell);
    }
});
function myFunction() {
    var x = document.getElementById("mySiderBar");
    if (x.className === "sideBar") {
        x.className += " responsive";
    } else {
        x.className = "sideBar";
    }
}
