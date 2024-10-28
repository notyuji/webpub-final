
const navButtons = document.querySelectorAll('.nav-button');
const contentSections = document.querySelectorAll('.header-for-choices');

const selectedItems = [];

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar');
    const items = document.querySelectorAll('.item');

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();

        items.forEach(item => {
            const title = item.querySelector('.item-title, .item-title1, .item-title2, .item-title3, .item-title4, .item-title5, .item-title6, .item-title7, .item-title8');
            const description = item.querySelector('.item-description');
            if (title && description) {
                const titleText = title.textContent.toLowerCase();
                const descriptionText = description.textContent.toLowerCase();
                if (titleText.includes(query) || descriptionText.includes(query)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    });
});

function onItemClick() {
    const itemTitle = document.querySelector('.item-title').textContent;
    const itemPrice = parseFloat(document.querySelector('.item-price').textContent.replace('$', ''));

    selectedItems.push({ title: itemTitle, price: itemPrice });

    updateClickedItemsContainer();

    updateTotals();
}
function onItemClick1() {
    const itemTitle = document.querySelector('.item-title1').textContent;
    const itemPrice = parseFloat(document.querySelector('.item-price1').textContent.replace('$', ''));

    selectedItems.push({ title: itemTitle, price: itemPrice });

    updateClickedItemsContainer();

    updateTotals();
}
function onItemClick2() {
    const itemTitle = document.querySelector('.item-title2').textContent;
    const itemPrice = parseFloat(document.querySelector('.item-price2').textContent.replace('$', ''));

    selectedItems.push({ title: itemTitle, price: itemPrice });

    updateClickedItemsContainer();

    updateTotals();
}
function onItemClick3() {
    const itemTitle = document.querySelector('.item-title3').textContent;
    const itemPrice = parseFloat(document.querySelector('.item-price3').textContent.replace('$', ''));

    selectedItems.push({ title: itemTitle, price: itemPrice });

    updateClickedItemsContainer();

    updateTotals();
}
function onItemClick4() {
    const itemTitle = document.querySelector('.item-title4').textContent;
    const itemPrice = parseFloat(document.querySelector('.item-price4').textContent.replace('$', ''));

    selectedItems.push({ title: itemTitle, price: itemPrice });

    updateClickedItemsContainer();

    updateTotals();
}
function onItemClick5() {
    const itemTitle = document.querySelector('.item-title5').textContent;
    const itemPrice = parseFloat(document.querySelector('.item-price5').textContent.replace('$', ''));

    selectedItems.push({ title: itemTitle, price: itemPrice });

    updateClickedItemsContainer();

    updateTotals();
}
function onItemClick6() {
    const itemTitle = document.querySelector('.item-title6').textContent;
    const itemPrice = parseFloat(document.querySelector('.item-price6').textContent.replace('$', ''));

    selectedItems.push({ title: itemTitle, price: itemPrice });

    updateClickedItemsContainer();

    updateTotals();
}
function onItemClick7() {
    const itemTitle = document.querySelector('.item-title7').textContent;
    const itemPrice = parseFloat(document.querySelector('.item-price7').textContent.replace('$', ''));

    selectedItems.push({ title: itemTitle, price: itemPrice });

    updateClickedItemsContainer();

    updateTotals();
}
function onItemClick8() {
    const itemTitle = document.querySelector('.item-title8').textContent;
    const itemPrice = parseFloat(document.querySelector('.item-price8').textContent.replace('$', ''));

    selectedItems.push({ title: itemTitle, price: itemPrice });

    updateClickedItemsContainer();

    updateTotals();
}
function openStore() {
    var showCart = document.querySelector('.cart-icon');
    var showLeft = document.querySelector('.left-container');
    var hideStore = document.querySelector('.store-icon');
    var hideRight = document.querySelector('.right-container');
    showCart.classList.toggle('active');
    showCart.classList.remove('hide');
    showLeft.classList.remove('active');
    hideStore.classList.remove('active');
    hideRight.classList.toggle('active');
}
function openCart() {
    var divRight = document.querySelector('.right-container');
    var divLeft = document.querySelector('.left-container');
    var showStore = document.querySelector('.store-icon');
    var hideCart = document.querySelector('.cart-icon');
    showStore.classList.toggle('active');
    divRight.classList.toggle('active');
    divLeft.classList.toggle('active');
    hideCart.classList.toggle('hide');
}
function checkout() {
    // checkout
}
function updateClickedItemsContainer() {
    const clickedItemsContainer = document.getElementById('clickedItemsContainer');
    clickedItemsContainer.innerHTML = '';

    const itemQuantities = {};

    selectedItems.forEach(item => {
        itemQuantities[item.title] = (itemQuantities[item.title] || 0) + 1;
    });

    for (const itemTitle in itemQuantities) {
        const quantity = itemQuantities[itemTitle];
        
        const selectedItem = document.createElement('div');
        selectedItem.classList.add('selected-item');

        // Create a span for item details (title, quantity, total)
        const itemDetails = document.createElement('span');
        itemDetails.textContent = `${itemTitle} - Quantity: ${quantity} | Total: $${(quantity * getItemPrice(itemTitle)).toFixed(2)}`;

        // Create a dash icon for removing the item
        const removeIcon = document.createElement('i');
        removeIcon.addEventListener('click', () => removeItem(itemTitle));
        removeIcon.classList.add('fas', 'fa-minus-circle', 'remove-icon');

        // Create a plus icon for adding the item
        const plusIcon = document.createElement('i');
        plusIcon.addEventListener('click', () => addItem(itemTitle));
        plusIcon.classList.add('fas', 'fa-plus-circle', 'plus-icon');

        selectedItem.appendChild(itemDetails);
        selectedItem.appendChild(removeIcon);
        selectedItem.appendChild(plusIcon);

        clickedItemsContainer.appendChild(selectedItem);
    }
}

// Function to add the selected item
function addItem(title) {
    const index = selectedItems.findIndex(item => item.title === title);
    if (index !== -1) {
        selectedItems.push(selectedItems[index]);
        updateClickedItemsContainer();
        updateTotals();
    }
}

// Function to remove the selected item
function removeItem(title) {
    const index = selectedItems.findIndex(item => item.title === title);
    if (index !== -1) {
        selectedItems.splice(index, 1);
        updateClickedItemsContainer();
        updateTotals();
    }
}

function getItemPrice(title) {
    return selectedItems.find(item => item.title === title)?.price || 0;
}
function updateTotals() {
    const subtotalValue = document.querySelector('.subtotal-value');
    const totalValue = document.querySelector('.total-value');

    const subtotal = selectedItems.reduce((sum, item) => sum + item.price, 0);

    const taxRate = 0.10;
    const total = subtotal * (1 + taxRate);

    subtotalValue.textContent = `$${subtotal.toFixed(2)}`;
    totalValue.textContent = `$${total.toFixed(2)}`;
}

function goBack() {
    window.history.back();
}

navButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        contentSections[index].scrollIntoView({ behavior: 'smooth' });

        navButtons.forEach((btn) => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    });
});