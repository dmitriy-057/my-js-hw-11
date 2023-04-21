import { fetchPictures } from "./fetchPictures";
// import axios from "axios";
import {Notify} from "notiflix";

let getGallery;

const refs = {
    form: document.querySelector(".search-form"),
    input: document.querySelector("input"),
    button: document.querySelector('button'),
    gallery: document.querySelector(".gallery")

}

refs.form.addEventListener("submit", onSearchBtn)

function onSearchBtn(e) {
    e.preventDefault();
    console.log('input value', refs.input.value);
    getGallery = refs.input.value;
    fetchPictures(getGallery)
    .then(images => {
      createGalleryMarkup(images.hits)
    })
    .catch(error => {
      console.log(error)
    });

}

function createGalleryMarkup(images) {

  if(getGallery === "") {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    return;
  }
    const markupGallery = images.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads}) => {
      return `
          <div class="photo-card">
            <div class="img-thumb">
                <a class="gallery_link" href="${webformatURL}">
                <img  class="gallery__image" 
                 src="${largeImageURL}" alt="${tags}  loading="lazy" 
                />
              </a>
            </div>
              <div class="info">
                <p class="info-item">
                  <b>likes:${likes}</b>
                </p>
                <p class="info-item">
                  <b>views:${views}</b>
                </p>
                <p class="info-item">
                  <b>comments:${comments}</b>
                </p>
                <p class="info-item">
                  <b>downloads:${downloads}</b>
                </p>
              </div>
          </div>
      `;
    })
    .join('')

  refs.gallery.innerHTML = markupGallery;
  refs.input.value = "";
}

