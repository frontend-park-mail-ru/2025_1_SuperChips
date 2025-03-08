// import {API} from '../../../shared/api/api';
//
// let isLoading;
//
// export const loadImages = async (numPage) => {
//     if (isLoading) return;
//     isLoading = true;
//
//     const response = await API.get(`/api/v1/feed?page${numPage}`);
//     const images = JSON.parse(await response.text());
//
//     isLoading = false;
//     return images;
// };