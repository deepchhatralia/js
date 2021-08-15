const random = document.getElementById('random');
const searchByName = document.getElementById('searchByName');
const searchBtn = document.getElementById('searchBtn');
const ul = document.getElementById('ul');

const popupContainer = document.querySelector('.popup-container');
const popup = document.getElementById('popup');

getRandomMeal();
showFavMeal();

async function getRandomMeal() {
    let resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    resp = await resp.json();
    resp = resp.meals[0];

    loadRandom(resp);
}

async function getMealById(id) {
    let mealResp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
    mealResp = await mealResp.json();
    mealResp = mealResp.meals[0];

    return mealResp;
}

async function showFavMeal() {
    const mealId = JSON.parse(localStorage.getItem('mealId'));
    ul.innerHTML = '';

    for (let i = 0; i < mealId.length; i++) {
        let a = await getMealById(mealId[i]);
        let li = document.createElement('li');
        li.classList.add('fav-recipe');
        li.setAttribute('data-id', `${a.idMeal}`);
        li.setAttribute('onclick', 'favItemClick()');

        li.innerHTML = `<img src="${a.strMealThumb}" style="height: 10vh; width: 10vh; border-radius: 2rem;" alt="">
                        <p>${a.strMeal}</p>`;

        ul.appendChild(li);

        li.addEventListener('click', () => {
            showFavMealRecipe(mealId[i]);
        });
    }
}

async function showFavMealRecipe(id) {
    let x = await getMealById(id);

    popupContainer.classList.remove('hidden');
    popup.innerHTML = `<div class="close-popup" id="close-popup"><i class="fa fa-times"></i></div>
        <h3>${x.strMeal}</h3>
        <img src="${x.strMealThumb}" alt="">
        <p>${x.strInstructions}</p>`;

    const closePopup = document.getElementById('close-popup');

    closePopup.addEventListener('click', () => {
        popupContainer.classList.add('hidden');
    });
}

function favItemClick() {

}

function loadRandom(resp) {
    let randomContainer = document.createElement('div');
    randomContainer.id = 'randomContainer';
    randomContainer.innerHTML = `<div class="randomHeader" id="random-header">
                                    <img src="${resp.strMealThumb}" alt="">
                                </div>
                                <div class="randomBody">
                                    <h5>${resp.strMeal}</h5>
                                    <i class="fa fa-heart" id="heart"></i>
                                </div>`;

    random.appendChild(randomContainer);

    showRecipe(resp);

    heart(resp);
}

function removeMealFromLS(idMeal) {
    const mealIds = getMealFromLS();

    localStorage.setItem("mealId", JSON.stringify(mealIds.filter((id) => id !== idMeal)));
    showFavMeal();
}

function setMealToLS(idMeal) {
    const mealIds = getMealFromLS();
    localStorage.setItem("mealId", JSON.stringify([...mealIds, idMeal]));

    // Show favourite items 
    showFavMeal();
}

function getMealFromLS() {
    const mealId = JSON.parse(localStorage.getItem('mealId'));
    return mealId === null ? [] : mealId;
}

searchBtn.addEventListener('click', function(e) {
    if (searchByName.value == '') {
        e.preventDefault();
    } else {
        getSearchResult(searchByName.value);
    }
});

async function getSearchResult(searchTerm) {
    var searchResp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchTerm);
    searchResp = await searchResp.json();
    searchResp = searchResp.meals[0];

    loadBySearchTerm(searchResp);
}


// Load the recipe when user search 
function loadBySearchTerm(searchResp) {
    randomContainer.innerHTML = `<div class="randomHeader" id="random-header">
                                    <img src="${searchResp.strMealThumb}" alt="">
                                </div>
                                <div class="randomBody">
                                    <h5>${searchResp.strMeal}</h5>
                                    <i class="fa fa-heart" id="heart"></i>
                                </div>`;

    random.appendChild(randomContainer);

    showRecipe(searchResp);

    heart(searchResp);
}

function heart(resp) {
    const heart = document.getElementById('heart');
    heart.addEventListener('click', function() {
        if (heart.classList.contains('active')) {
            heart.classList.remove('active');
            removeMealFromLS(resp.idMeal);
        } else {
            heart.classList.add('active');
            setMealToLS(resp.idMeal);
        }
    });
}


// Show recipe in popup 
function showRecipe(resp) {
    console.log(resp);
    const randomHeader = document.getElementById('random-header');

    randomHeader.addEventListener('click', () => {
        popupContainer.classList.remove('hidden');
        popup.innerHTML = `<div class="close-popup" id="close-popup"><i class="fa fa-times"></i></div>
        <h3>${resp.strMeal}</h3>
        <img src="${resp.strMealThumb}" alt="">
        <p>${resp.strInstructions}</p>`;

        const closePopup = document.getElementById('close-popup');

        closePopup.addEventListener('click', () => {
            popupContainer.classList.add('hidden');
        });
    });
}