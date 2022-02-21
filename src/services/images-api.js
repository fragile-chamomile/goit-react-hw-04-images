// const BASE_URL = 'https://pixabay.com/api';
// const API_KEY = '24851735-b0fcd138c2c9cb1c1e6315031';

// const fetchImages = (image, page) => {
//   const url = `${BASE_URL}/?q=${image}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
//   return fetch(url).then(response => response.json());
// };

// const api = { fetchImages };

// export default api;

//-----------------------------------------Асинхронная функция. Синтаксис async/await
const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '24851735-b0fcd138c2c9cb1c1e6315031';

const fetchImages = async (image, page, perPage) => {
  const response = await fetch(
    `${BASE_URL}/?q=${image}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
  const images = response.json();
  return images;
};

export default fetchImages;

//-------------------------------------------Библиотека axios
// import axios from 'axios';

// const AUTH_TOKEN = '24851735-b0fcd138c2c9cb1c1e6315031';

// axios.defaults.baseURL = 'https://pixabay.com/api';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// export const fetchImages = (image, page) => {
//   return axios
//     .get(
//       `/?q=${image}&page=${page}&key=your_key&image_type=photo&orientation=horizontal&per_page=12`
//     )
//     .then(response => {
//       return response.data;
//     });
// };
