import axios from 'axios';

const baseURL = `https://pixabay.com/api/?per_page=15`;


export async function backendData(searchWord, currentPage = 1) {
    const params = {
            key: "49367974-1ddb9c95ea8d865fcbee88608",
            q: searchWord,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page: currentPage,
    }; 

   try {
    const response = await axios.get(baseURL, { params });
        return response.data;
   } catch (error) {
    console.log("Помилка при отриманні даних:", error);
   }

}

