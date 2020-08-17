var uid = new ShortUniqueId();

const form = document.getElementById("formProduct");
newIdProduct();

function newIdProduct() {
  var idProduct = document.getElementById("idProduct");
  idProduct.value = uid();
}

function validate(productName, price) {
  if (productName === "" || price === "") {
    return false;
  }
  return true;
}

function newProduct(idProduct, productName, url, price) {
  let data = {
    idProduct,
    productName,
    url,
    price,
  };

  if (
    localStorage.getItem("products") === null ||
    localStorage.getItem("products") === ""
  ) {
    let products = [];
    products.push(data);
    localStorage.setItem("products", JSON.stringify(products));
  } else {
    let newProduct = JSON.parse(localStorage.getItem("products"));
    newProduct.push(data);
    localStorage.setItem("products", JSON.stringify(newProduct));
  }
  let table = document.getElementById("containerTable");
  table.classList = "min-w-full divide-y divide-gray-200";
  
      const productList = document.getElementById("tableProduct");
      const element = document.createElement("tr");
      if (url === "") {
        url = "../image/present.svg";
      }
      element.innerHTML = `    
        <td
          class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
        >
          <div class="text-sm leading-5 text-gray-900">
            ${idProduct}
          </div>
        </td>
        <!-- image in name product -->
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div class="flex items-center">
            <div class="flex-shrink-0 h-10 w-10">
              <img class="h-10 w-10 rounded-full" src="${url}" alt="">
            </div>
            <div class="ml-4">
              <div class="text-sm leading-5 font-medium text-gray-900">
                ${productName}
              </div>
            </div>
          </div>
        </td>
        <td
          class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
        >
          <div class="text-sm leading-5 text-gray-900">
            $ ${price}
          </div>
        </td>
      `;

      productList.appendChild(element);

}

function cleanForm() {
  form.reset();
  newIdProduct();
  document.getElementById("productName").focus();
}

// listen event submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let idProduct = document.getElementById("idProduct").value;
  let productName = document.getElementById("productName").value;
  let url = document.getElementById("idImage").value;
  let price = document.getElementById("idPrice").value;

  //validate the inputs
  if (validate(productName, price)) {
    
    //add product
    newProduct(idProduct, productName, url, price);
    
    //clean form and id generated
    cleanForm();

    // listProduct();
  }


});
listProduct();

function listProduct() {
  let products = JSON.parse(localStorage.getItem("products"));
  
  if (products === null) {
    let table = document.getElementById("containerTable");
    table.classList = "hidden min-w-full divide-y divide-gray-200";

  } else {
    let table = document.getElementById("containerTable");
    table.classList = "min-w-full divide-y divide-gray-200";
    
    products.map((item) => {
      const productList = document.getElementById("tableProduct");
      const element = document.createElement("tr");
      let url = item.url;
      if (item.url === "") {
        url = "../image/present.svg";
      }
      element.innerHTML = `    
        <td
          class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
        >
          <div class="text-sm leading-5 text-gray-900">
            ${item.idProduct}
          </div>
        </td>
        <!-- image in name product -->
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div class="flex items-center">
            <div class="flex-shrink-0 h-10 w-10">
              <img class="h-10 w-10 rounded-full" src="${url}" alt="">
            </div>
            <div class="ml-4">
              <div class="text-sm leading-5 font-medium text-gray-900">
                ${item.productName}
              </div>
            </div>
          </div>
        </td>
        <td
          class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
        >
          <div class="text-sm leading-5 text-gray-900">
            $ ${item.price}
          </div>
        </td>
      `;

      productList.appendChild(element);
    });
  }
}
