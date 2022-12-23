import { API_KEY } from "@env";

export const endPoints = {
  StickerTrendingUrl: `api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`,
  GifTrendingUrl: `api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`,
  StickerSearchUrl: `api.giphy.com/v1/stickers/search?api_key=${API_KEY}`,
  GifSearchUrl: `api.giphy.com/v1/gifs/search?api_key=${API_KEY}`,
};
