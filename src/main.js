import { backendData } from "./js/pixabay-api";
import { renderPhotos } from "./js/render-functions";
import { clearGallery } from "./js/render-functions";


// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const loader = document.querySelector(".loader");
const form = document.querySelector(".form");
const input = document.querySelector("input");
const loadBtn = document.querySelector('.load-btn');


let query = null;
let currentPage = 1;
let totalHits = 0;

form.addEventListener("submit", formSubmit);

loadBtn.addEventListener("click", clickLoadMoreBtn);




// Function formSubmit //

async function formSubmit(event) {

    event.preventDefault();
    
if (input.value.trim() === "") {
    return iziToast.show(
    {
        message: `❌ Eter a search word`,
        position: "topRight",
        color: "red",
    }) ;
    } 

    
    clearGallery();
    loader.style.display = "block"; // Показуємо лоадер
    query = input.value;

    currentPage = 1;
    try {
        const hitsInfo = await backendData(query, currentPage);
        totalHits = hitsInfo.totalHits;
        if (hitsInfo.hits.length === 0) {
            loadBtn.style.display = "none";
                iziToast.show({
                    message: `❌ Sorry, there are no images matching your search query. Please try again!`,
                    position: "topRight",
                    color: "red",
                });
            }  else {
                    renderPhotos(hitsInfo.hits); 
            loadBtn.classList.remove("visually-hidden");
    
            if (totalHits > 15) {
                loadBtn.style.display = "block"; // Показуємо кнопку, якщо є ще сторінки
            } else {
                loadBtn.style.display = "none"; // ховаємо кнопку, якщо менше 15
                
            }
                
            }
    } catch (error) {
         console.log("Помилка при отриманні даних:", error);
    } finally {
        loader.style.display = "none"; // Ховаємо лоадер після запиту  
    }
    form.reset();
}



// Function clickBtn //

async function clickLoadMoreBtn() {

    currentPage += 1;
    loader.style.display = "block"; // Показуємо лоадер
    loader.style.top = "100%"
   
    try {
    const hitsInfo = await backendData(query, currentPage);
        renderPhotos(hitsInfo.hits); 

        // Отримуємо висоту першої карточки
            const firstCard = document.querySelector(".gallery-item");
            if (firstCard) {
                const cardHeight = firstCard.getBoundingClientRect().height;
                window.scrollBy({
                    top: cardHeight * 2,
                    behavior: "smooth"
                });
            }
   
        const totalLoadedImages = currentPage * 15; 
        // console.log(`Total hits: ${totalHits}, Total loaded images: ${totalLoadedImages}`);

        if (totalLoadedImages >= totalHits) {
            loadBtn.style.display = "none"; // Ховаємо кнопку, якщо всі зображення завантажені
            iziToast.show({
                message: `❌ We're sorry, but you've reached the end of search results.`,
                position: "topRight",
                color: "blue",
            });
        } else {
            loadBtn.style.display = "block"; // Повертаємо кнопку, якщо є ще сторінки
        }
    } catch (error) {
         console.log("Помилка при отриманні даних:", error);
    } finally {
        loader.style.display = "none"; // Ховаємо лоадер після запиту  
    }
    

   
}


