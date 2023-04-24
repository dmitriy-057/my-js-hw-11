const API_KEY = "29210870-5c756012ce316252fd55732c8";
const BASE_URL = "https://pixabay.com/api/";
let page = 1;

export function fetchPictures(name) {
    return fetch(`${BASE_URL}?key=${API_KEY}&q=${name}&image-type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
    .then( response => {
        if(!response.ok) {
            throw new Error()
        }
        return response.json()
    }
    )
    .then(data=> {
        console.log('data',data);
        return data;
    })
}

