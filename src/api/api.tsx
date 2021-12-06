const BASE_URL = 'https://api.spaceflightnewsapi.net/v3/articles';

export const loadArticles = async () => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    return new Error(`Error: ${error}`);
  }
}