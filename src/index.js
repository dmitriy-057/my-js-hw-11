// import { fetchPictures } from "./fetchPictures";
import axios from "axios";
import {Notify} from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = new SimpleLightbox('.gallery a');

const API_KEY = "29210870-5c756012ce316252fd55732c8";
const BASE_URL = "https://pixabay.com/api/";
let page = 1;
let getGallery;
let images = [];



const refs = {
    form: document.querySelector(".search-form"),
    input: document.querySelector("input"),
    button: document.querySelector('button'),
    gallery: document.querySelector(".gallery"),
    loadMoreBtn: document.querySelector('.load-more')
}

refs.loadMoreBtn.style.display = "none";
refs.form.addEventListener("submit", onSearchBtn);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function fetchPictures(name) {

  if(getGallery === "") {
    errorMessage()
    return;
  }
  
  return fetch(`${BASE_URL}?key=${API_KEY}&q=${name}&image-type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
  .then(response => {
      if(!response.ok) {
          throw new Error()
      }
      return response.json()
  })
  .then(data => {
      console.log('data',data);
      refs.loadMoreBtn.style.display = "block";
      return data;
  })
}

function onLoadMoreBtnClick(e) {
  e.preventDefault();
  page += 1;
  fetchPictures()
  .then(newData => {
    console.log('newData', newData);
    createGalleryMarkup(newData.hits)
  })
}

function onSearchBtn(e) {
    e.preventDefault();
    console.log('input value', refs.input.value);
    getGallery = refs.input.value;
    fetchPictures(getGallery)
    .then(data => {
      createGalleryMarkup(data.hits)
    })
    .catch(error => {
      console.log(error)
    });

}

function createGalleryMarkup(images) {
    const markupGallery = images.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads}) => {
      return `
          <div class="photo-card">
            <div class="img-thumb">
                <a class="gallery_link" href="${webformatURL}">
                <img  class="gallery__image" 
                 src="${largeImageURL}" alt="${tags} loading="lazy" 
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

  refs.gallery.insertAdjacentHTML('beforeend', markupGallery);
  lightbox.refresh();
  refs.input.value = "";
}


function errorMessage() {
  Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  
}