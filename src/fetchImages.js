import axios from 'axios';

export async function fetchImages(inputData, page) {
  const searchParams = new URLSearchParams({
    key: '34783600-4c4882faf47dfa22b7423406f',
    q: inputData,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page,
  });
  const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);

  return images.data;
}
