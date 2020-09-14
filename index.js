const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280/";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = $("#main");
const form = $("#form");
const search = $("#search");

getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    // clear main
    main.empty();

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;


      var movieEl =`<div class='movie'><img
                src="${IMGPATH + poster_path}"
                alt="${title}"/>
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
                </div>
            </div>`;
main.append(movieEl);

    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.submit(function( event ) {
    event.preventDefault();

    const searchTerm = search.val();

    if (searchTerm) {
        getMovies(`${SEARCHAPI}${searchTerm}`);

        search.value = "";
    }
});
