import axios from "axios";
import {Notify} from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = new SimpleLightbox('.gallery a');

const API_KEY = "29210870-5c756012ce316252fd55732c8";
const BASE_URL = "https://pixabay.com/api/";
let page = 1;
let getGallery;
let galleryData;


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
refs.loadMoreBtn.style.display = "none";

async function fetchPictures() {
  try {
    if(getGallery !== "") {
      let response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${refs.input.value}&image-type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
      galleryData = response.data.hits;
      console.log('galleryData', galleryData);
      createGalleryMarkup(galleryData);
      refs.loadMoreBtn.style.display = "block";
    } else {
      Notify.failure("Извините, нет изображений, соответствующих вашему поисковому запросу. Пожалуйста, попробуйте еще раз.");
    }
  } catch(error) {
    console.log(error);
    Notify.failure("Извините, больше нет картинок по Вашему запросу.");
    refs.loadMoreBtn.style.display = "none";
  }
}

function onSearchBtn(e) {
  e.preventDefault();
  page = 12;
  getGallery = refs.input.value;
  if(getGallery) {
    refs.gallery.innerHTML = "";
  }
  fetchPictures();
}

function onLoadMoreBtnClick() {
  page += 1;
  fetchPictures();
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
}

