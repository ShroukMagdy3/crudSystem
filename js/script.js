var productName = document.getElementById("productNameInput");
var productPrice = document.getElementById("productPriceInput");
var productCatogory = document.getElementById("productCategoryInput");
var productDesc = document.getElementById("productDescInput");
var productImgInput = document.getElementById("productImgInput");
var addButton = document.getElementById("add");
var productsRow = document.getElementById("productsRow");
var productImageGroup = document.getElementById("group");
var box = document.getElementById("image-box");
var img;

var mainIndex = 0;
var inAdd = true;
var searchInpt = document.getElementById("searchInpt");
var productsContainer = [];
// local storage
if (localStorage.getItem("products") != null) {
  productsContainer = JSON.parse(localStorage.getItem("products"));
  display();
}
// add
function addUpdateProduct() {
  const nameRegex = /^[a-zA-Z0-9\s\-_]{3,50}$/;
  const priceRegex = /^(?:\d{1,9}|\d{1,9}\.\d{1,2})$/;
  const categoryRegex = /^[a-zA-Z0-9\s\-]{3,30}$/;
  const descRegex = /^[\w\s.,;:!?'"()\-\n]{10,500}$/;
  if (
    nameRegex.test(productName.value) &&
    priceRegex.test(productPrice.value) &&
    categoryRegex.test(productCatogory.value) &&
    descRegex.test(productDesc.value)
  ) {
    // Create product object
    var product = {
      name: productName.value,
      price: productPrice.value,
      catogory: productCatogory.value,
      desc: productDesc.value,
      image:
        productImgInput.files.length > 0
          ? productImgInput.files[0]?.name
          : "R.png",
    };
    // Add or update the product
    if (inAdd) {
      addPro(product);
    } else {
      updatePro(product);
    }
    localStorage.setItem("products", JSON.stringify(productsContainer));
    display();
    clear();
  } else {
    alert("Enter valid inputs");
  }
}

function addPro(product) {
  productsContainer.push(product);
}
function updatePro(product) {
  if (product.image == undefined) {
    product.image = img;
  }
  productsContainer.splice(mainIndex, 1, product);
  addButton.innerHTML = "add product";
  inAdd = true;
  box.classList.replace("d-block", "d-none");
  group.classList.replace("d-none", "d-block");
}
function display() {
  var term = searchInpt.value;
  var cartoona = "";
  for (var i = 0; i < productsContainer.length; i++) {
    if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartoona += `
        <div class="col-xl-4 col-md-6">
            <div class="p-4 rounded text-center bg-white text-dark">
            <img src="images/${productsContainer[i].image}" class="w-100 img-fluid" >
                <h3><span class="fw-bolder text-warning">Index:</span> ${i}</h3>
                <h5><span class="fw-bolder">Name:</span> ${productsContainer[i].name}</h5>
                <h5><span class="fw-bolder">Price:</span> ${productsContainer[i].price}</h5>
                <h5><span class="fw-bolder">Category:</span> ${productsContainer[i].catogory}</h5>
                <h5><span class="fw-bolder">Description:</span> ${productsContainer[i].desc}</h5>
                <button  onclick =" patch(${i})" class="btn btn-outline-warning mt-2">Update</button>
                <button onclick ="deletePro(${i})" class="btn btn-outline-danger mt-2">Delete</button>
            </div>
        </div>`;
    }
  }
  productsRow.innerHTML = cartoona;
}
function clear() {
  productName.value = "";
  productPrice.value = "";
  productDesc.value = "";
  productCatogory.value = "";
}
// delete
function deletePro(index) {
  productsContainer.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productsContainer));
  display();
}
// update
function patch(productIndex) {
  mainIndex = productIndex;
  var product = productsContainer[productIndex];
  productName.value = product.name;
  productPrice.value = product.price;
  productCatogory.value = product.catogory;
  productDesc.value = product.desc;
  addButton.innerHTML = "update product";
  inAdd = false;
  productImageGroup.classList.add("d-none");
  box.classList.replace("d-none", "d-block");

  box.innerHTML = `
  <label  class=" mb-2 w-100 ">Product Image:</label>
  <label for="productImgInput"><img src="images/${productsContainer[productIndex].image}" class="w-100 rounded m-auto" style="max-width: 200px;" alt=""></label>`;
  img = productsContainer[productIndex].image;
}
function imageChanged() {
  var image = productImgInput.files[0]?.name;
  // console.log(image);

  box.innerHTML = `
  <label for="productImgInput"  class=" mb-2 w-100 "> Product Image:</label>
  <label  for="productImgInput"><img src="images/${image}" class="w-100 rounded m-auto" style="max-width: 200px;" alt=""></label>
  `;
  img = image;
}
