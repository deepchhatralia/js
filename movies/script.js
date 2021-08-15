const APIURL = 'https://api.themoviedb.org/3/movie/popular?api_key=67fa31cca59e9d01e89827ba875b387f&language=en-US&page=1';
const IMGURL = 'https://image.tmdb.org/t/p/w500';

const row2 = document.querySelector('.row2');
const search = document.getElementById('search');

async function loadMovies() {
    let resp = await fetch(APIURL);
    resp = await resp.json();

    if (resp.results) {
        row2.innerHTML = '';
        resp.results.forEach(element => {

            if (IMGURL + element.poster_path !== null) {

                const col = document.createElement('div');
                col.classList.add('col-md-2');
                col.classList.add('movie-container');

                col.innerHTML = `
                <div class="movie">
                    <img src="${IMGURL + element.poster_path}" alt="">
                    <div class="movie-info">
                        <h6>${element.original_title}</h6>
                        <span>${element.vote_average}</span>
                    </div>
                    <div class="overview">
                        <h4>Overview</h4>
                        <p>${element.overview}</p>
                    </div>
                </div>
                `;

                row2.appendChild(col);
            }
        });
    }
}

async function loadSearchResult(searchTerm) {
    let resp2 = await fetch('https://api.themoviedb.org/3/search/movie?api_key=67fa31cca59e9d01e89827ba875b387f&query=' + searchTerm);
    resp2 = await resp2.json();

    row2.innerHTML = '';
    resp2.results.forEach(element => {
        if (element.poster_path !== null) {

            const col2 = document.createElement('div');
            col2.classList.add('col-md-2');
            col2.classList.add('movie-container');

            col2.innerHTML = `
                    <div class="movie">
                        <img src="${IMGURL + element.poster_path}" alt="">
                        <div class="movie-info">
                            <h6>${element.original_title}</h6>
                            <span>${element.vote_average}</span>
                        </div>
                        <div class="overview">
                            <h4>Overview</h4>
                            <p>${element.overview}</p>
                        </div>
                    </div>
                `;
            row2.appendChild(col2);
        }

    });
}

window.addEventListener('DOMContentLoaded', () => {
    loadMovies();
});

search.addEventListener('keyup', () => {
    const searchTerm = search.value;
    if (searchTerm !== '') {
        loadSearchResult(searchTerm);
    } else {
        loadMovies();
    }
});