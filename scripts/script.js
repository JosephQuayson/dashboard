let items = null;
let itemId = 0;

onLoad();


function onLoad() {
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        let stockCounter = 0;
        items = JSON.parse(localStorage.getItem("items"));

        for (let i = 0; i < items.length; i++) {
            stockCounter += Number(items[i].stock);
            buildItem(i, items[i].name, items[i].description, items[i].category, items[i].stock)
        }

        document.getElementById("numberOfItems").innerText = items.length;
        document.getElementById("totalStock").innerText = stockCounter;
    }
}

function addItemPopUp() {
    document.getElementById("addItemMain").style.display = "block";
}

function updateItemPopUp(id) {
    document.getElementById("updateItemMain").style.display = "block";
    itemId = String(id).split("_")[1];

    document.getElementById("updateItemName").value = items[itemId].name;
    document.getElementById("updateItemDescription").value = items[itemId].description;
    document.getElementById("updateCategorySelect").value = items[itemId].category;
    document.getElementById("updateItemStock").value = items[itemId].stock;
}

function removeAddItemPopUp() {
    document.getElementById("addItemMain").style.display = "none";
    removeAll();
}

function removeUpdateItemPopUp() {
    document.getElementById("updateItemMain").style.display = "none";
    removeAll();
}


function buildItem(id, itemName, itemDescription, itemCategory, itemStock) {
    let node = document.createElement("tr");
    node.classList.add("center")
    node.innerHTML = `
    <td>${itemName}</td>
    <td>${itemDescription}</td>
    <td>${itemCategory}</td>
    <td>${itemStock}</td>
    <td>
        <button id="update_${id}" onClick="updateItemPopUp(this.id)">Update</button>
        <button id="delete_${id}" onClick="deleteItem(this.id)">Delete</button>
    </td>
    `
    document.getElementById("tableMain").appendChild(node)
}

function save() {
    let itemName = document.getElementById("itemName").value;
    let itemDescription = document.getElementById("itemDescription").value;
    let itemStock = document.getElementById("itemStock").value;
    let categorySelect = document.getElementById("categorySelect").value;

    if (itemName !== "" && itemDescription !== "" && Number(itemStock)>0 && itemStock !== "" && categorySelect !== "") {
        let item = {
            name: itemName,
            description: itemDescription,
            stock: itemStock,
            category: categorySelect
        }
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));
        location.reload();
    } else {
        alert("Please enter all the details...")
    }
}

function update(){
    let itemName = document.getElementById("updateItemName").value;
    let itemDescription = document.getElementById("updateItemDescription").value;
    let itemStock = document.getElementById("updateItemStock").value;
    let categorySelect = document.getElementById("updateCategorySelect").value;

    if (itemName !== "" && itemDescription !== "" &&  Number(itemStock)>0 && itemStock !== "" && categorySelect !== "") {
        let item = {
            name: itemName,
            description: itemDescription,
            stock: itemStock,
            category: categorySelect
        }
        items[itemId] = item;
        localStorage.setItem("items", JSON.stringify(items));
        location.reload();
    } else {
        alert("Please enter all the details...");
    }
}

function deleteItem(id){
    let deleteId = String(id).split("_")[1];
    let item = items[deleteId]
    if (confirm(`Are you sure you want to delete "${item.name}" ?`)) {
        items.splice(deleteId,1);
        localStorage.setItem("items", JSON.stringify(items));
        alert('Item was deleted from the database.');
        location.reload();
      }
}

function removeAll() {
    document.getElementById("itemName").value = "";
    document.getElementById("itemDescription").value = "";
    document.getElementById("itemStock").value = "";
    document.getElementById("categorySelect").value = "";
}