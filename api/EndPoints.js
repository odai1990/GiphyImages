import { API_KEY } from "@env";

export const endPoints = {
  StickerTrendingUrl: `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`,
  StickerSearchUrl: `https://api.giphy.com/v1/stickers/search?api_key=${API_KEY}`,
  GifTrendingUrl: `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=20`,
  GifSearchUrl: `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=20`,
};
