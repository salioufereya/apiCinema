//functions
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}
//htmlJs
let body = document.querySelector('body')
let container = document.createElement('div')
body.append(container)

let header = document.createElement('div')
container.append(header)
header.classList.add('class', 'header')
//form
let form = createNode('form')
form.setAttribute('id', 'form')
append(header, form)
//search
let search = document.createElement('input')

form.append(search)
search.classList.add('class', 'search')
search.setAttribute('placeholder', 'Rechercher un film')
search.setAttribute('id', 'search')
container.classList.add('class', 'container')

//contenu
let contenu = document.createElement('div')

container.append(contenu)
contenu.classList.add('class', 'contenu')

let forme = document.getElementById('form')
let searche = document.getElementById('search')


url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
let SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="
const IMGPATH = "https://image.tmdb.org/t/p/w1280";











getMovies(url)



async function getMovies() {
    let page = 1
    let films = []
    while (films.length < 500) {
        let response = await fetch(url + page);
        let data = await response.json();
        let res = data.results
        films = [...films, ...res]
        page++
    }

    getFilms(films)
}




function getFilms(data) {
    contenu.innerHTML = ""
    data.forEach(movie => {
        let film = createNode('div')
        append(contenu, film)
        film.classList.add('class', 'film')

        //images
        let image = createNode('div')
        append(film, image)
        image.classList.add('class', 'image')

        image.classList.add('class', 'skeleton')
        setTimeout(() => {
            image.classList.remove('skeleton')
        }, 1500);
        let img = createNode('img')
        append(image, img)
        
        img.src = `${IMGPATH + movie.poster_path}`
        img.alt = `${movie.id}`


        //title
        let title = createNode('p')
        title.classList.add('class', 'title')

        append(film, title)
        title.innerHTML = `${movie.original_title}`
        //vote
        let vote = createNode('span')
        vote.classList.add('class', 'span')
        append(film, vote)
        vote.innerHTML = `<span class="${couleur(movie.vote_average)}">   ${movie.vote_average} </span>      `
        //overview
        let overwiew = createNode('p')
        overwiew.classList.add('class', 'p')
        append(film, overwiew)
        overwiew.innerHTML = `${movie.overview}`
    })

}


searche.addEventListener('input', (e) => {
    e.preventDefault();
    const searchTerm = searche.value;
    if (searchTerm) {
        async function getMovies() {
            let response = await fetch(SEARCHAPI + searchTerm);
            let data = await response.json();
            let res = data.results
            getFilms(res)
        }
        getMovies(SEARCHAPI + searchTerm)

    } else {
        getMovies(url)

    }

})

function couleur(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

