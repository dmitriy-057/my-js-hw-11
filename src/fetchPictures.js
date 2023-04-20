const API_KEY = "29210870-5c756012ce316252fd55732c8";
const BASE_URL = "https://pixabay.com/api/";

export function fetchPictures(getGallery) {
    return fetch(`${BASE_URL}?key=${API_KEY}&q=${getGallery}&image-type=photo&orientation=horizontal&safesearch=true`)
    .then(response => {
        return response.json()
    })
}

