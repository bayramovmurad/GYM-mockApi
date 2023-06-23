let burgerMenu = document.querySelector(".burger-menu");
let menuIcon = document.querySelector(".fa-bars");
let row = document.querySelector(".offer-row");
let search = document.querySelector(".search");
let sort = document.querySelector(".sort");
let showMore = document.querySelector("#showmore");
let lessMore = document.querySelector("#lessmore");
const MAIN_URL = "http://localhost:3666/offers";


menuIcon.addEventListener("click", function () {
    burgerMenu.classList.toggle("show");
    this.classList.contains("fa-bars")
        ? (this.classList = "fa-solid fa-xmark")
        : (this.classList = "fa-solid fa-bars");
});

let max = 3;
let allData = [];
let searcedData = [];

function drawCards(arr) {
    row.innerHTML = "";
    arr.forEach((item) => {
        row.innerHTML += `
          <div class="col-12 col-md-6 col-lg-4 my-3">
          <div class="card">
            <div class="img">
              <img src="${item.img}" alt="" />
            </div>
            <div class="content">
              <h5>${item.title}</h5>
              <p>
          ${item.info}
              </p>
              <p>
        Price: ${item.price}
              </p>
            </div>
            <div class="icons">
              <a class="fa-solid fa-circle-info" href="details.html?id=${item.id}"></a>
              <a class="fa-solid fa-basket-shopping" onclick=addBasket(${item.id})></a>
              <a class="fa-solid fa-trash" onclick=deleteCard(${item.id})></a>
              <a class="fa-regular fa-pen-to-square" href="form.html?id=${item.id}"></a>
            </div>
          </div>
        </div>
          `;
    });
}

async function getAllData() {
    const res = await axios.get(MAIN_URL);
    const data = res.data
    allData = data
    searcedData = search.value ? searcedData : allData
    drawCards(searcedData.slice(0, max))

}
getAllData()





showMore.addEventListener("click", function () {
    max += searcedData.length;
    if (max >= searcedData.length) {
        showMore.style.display = "none";
        lessMore.style.display = "block";
    }
    if (searcedData.length) {
        drawCards(searcedData.slice(0, max));
    } else {
        getAllData();
    }
});

lessMore.addEventListener("click", function () {
    max -= searcedData.length;
    if (max <= searcedData.length) {
        showMore.style.display = "block";
        lessMore.style.display = "none";
    }
    if (searcedData.length) {
        drawCards(searcedData.slice(0, max));
    } else {
        getAllData();
    }
});

sort.addEventListener("click", function () {
    if (sort.innerHTML == "Sort") {
      searcedData = searcedData.sort((a, b) => a.price - b.price);
      sort.innerHTML = "Ascending";
    } else if (sort.innerHTML == "Ascending") {
      searcedData = searcedData.sort((a, b) => b.price - a.price);
      sort.innerHTML = "Descending";
    } else {
      sort.innerHTML = "Sort";
    }
    drawCards(searcedData.slice(0, max));
  });
  
  search.addEventListener("input", function (e) {
    searcedData = allData;
    searcedData = searcedData.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    drawCards(searcedData.slice(0, max));
  });
  
  async function deleteCard(id) {
    await axios.delete(`${BASE_URL}/${id}`);
    await axios.delete(`${BASE_URL2}/${id}`);
  }
