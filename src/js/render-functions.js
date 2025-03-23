// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";




function createPhoto(imag) {

    return imag.map(item => {
        return `<li class="gallery-item">
    <a class="gallery-link" href=${item.largeImageURL}>
        <img class="gallery-image" src=${item.webformatURL} alt=${item.tags} />
    </a>
    <div class="info">
        <p class="gallery-info">Likes: <span class="galery-info-span">${item.likes}</span></p>
        <p class="gallery-info">Views: <span class="galery-info-span">${item.views}</span></p>
        <p class="gallery-info">Comments: <span class="galery-info-span">${item.comments}</span></p>
        <p class="gallery-info">Downloads: <span class="galery-info-span">${item.downloads}</span></p>
    </div>
</li>`
    }).join("");
    
}



export function renderPhotos(images) {
    const galleryUl = document.querySelector('.gallery');

     galleryUl.insertAdjacentHTML("beforeend", createPhoto(images));

    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
    
}


export function clearGallery() {
    document.querySelector('.gallery').innerHTML = "";
}
