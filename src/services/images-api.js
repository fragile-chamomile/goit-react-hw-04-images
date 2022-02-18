const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '24851735-b0fcd138c2c9cb1c1e6315031';

function fetchImages(image, page) {
  const url = `${BASE_URL}/?q=${image}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url).then(response => response.json());
}

const api = { fetchImages };

export default api;
