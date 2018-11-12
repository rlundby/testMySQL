let allProducts;

// Shows all of the products so you can filter by id
function renderProducts(data) {
    allProducts = data[0];
    let products = data[0];
    for(let product of products) {
        $('#item-list').append(`
        
          <li value="${product.id}">
            SKU: ${product.SKU}
          </li>
        `)
    }
}

// Show all categories available
function renderCateg(data){
    let categories = data[0];
    for(let cat of categories) {
        $('#cat-list').append(`
        
          <li value="${cat.id}">
            <input type="checkbox" id="check-${cat.id}" name="check-${cat.name}">
             <label for="check-${cat.name}"> ${cat.name}</label>
          </li>
        `)
    }
}

// If filter by item id, show that item
function showProducts(number) {
    if(number.length >= 0){
        if(number.length === 0) {
            $('#result-list').html(`
                <p>Sorry, no products found for that category.</p>
             `)
        } else if(number.length === 1){
            let productId = number[0].id;
            showProducts(productId);
        } else {
            $('#result-list').html(` `);
            for(let product of number) {
                $('#result-list').append(`
                    <div class="found-item">
                        <p>Name: ${product.name}</p>
                        <p>SKU: ${product.SKU}</p>
                        <p>Reviews:</p>
                    </div>
                `);
            }
        }

    } else {
        let foundProduct = allProducts.filter( x => x.id === number);
        $('#result-list').html(`
    
        <div class="found-item">
            <p>Name: ${foundProduct[0].name}</p>
            <p>SKU: ${foundProduct[0].SKU}</p>
            <p>Reviews:</p>
        </div>
    `)
    }
}

function getSingleCategoryproducts (id){
    fetch('http://localhost:4001/api/getProducts/cat'+ id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json() )
        .then(response => showProducts(response[0]));
}


// Get all products on start
fetch('http://localhost:4001/api/getProducts/', {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})
.then(response => response.json() )
.then(response => renderProducts(response));

//Get all categories on start
fetch('http://localhost:4001/api/getProducts/cat', {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})
    .then(response => response.json() )
    .then(response => renderCateg(response));

$('#item-list').on('click','li', (event) => {
    let number = event.target.value;
    showProducts(number)
});

$('#cat-list').on("click", "input[type=checkbox]", (event) => {
    let currentlyChecked = $('input:checkbox:checked');
    let itemsId = [];

    // Only one item
    if(currentlyChecked.length === 1) {
        let item = currentlyChecked[0].attributes[1].value;
        let id = item.split('-');
        let catNumber = id[1];
        getSingleCategoryproducts(catNumber);
        console.log('One category select with the id: ' + catNumber)
    } else if (currentlyChecked.length > 1) {
        for(let object of currentlyChecked) {
            let item = object.attributes[1].value;
            let id = item.split('-');
            itemsId.push(id[1]);
        }
        console.log('Multiple categories selected with ids ' + itemsId);
    } else {
        console.log('No categories selected');
    }
});