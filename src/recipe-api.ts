import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;

export const searchRecipes = async (searchTerm: string, page: number) => {
  if (!apiKey) {
    throw Error("API Key not found");
  }

  const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
  const queryParams = {
    apiKey,
    query: searchTerm,
    number: "10",
    offset: (page * 10).toString(),
  };
  url.search = new URLSearchParams(queryParams).toString();
  try {
    const searchResponse = await fetch(url);
    const resultsJson = await searchResponse.json();
    return resultsJson;
  } catch (error) {
    console.log(error);
  }
};

export const getRecipeSummary = async (recipeId: string) => {
  if (!apiKey) {
    throw Error("API Key not found");
  }

  const url = new URL(
    `https://api.spoonacular.com/recipes/${recipeId}/summary`
  );
  const queryParams = {
    apiKey,
  };
  url.search = new URLSearchParams(queryParams).toString();

  try {
    const response = await fetch(url);
    const resultsJson = await response.json();
    return resultsJson;
  } catch (error) {
    console.log(error);
  }
};

export const getFavouriteRecipesByIds = async (ids: string[]) => {
  if (!apiKey) {
    throw Error("API Key not found");
  }
  const url = new URL("https://api.spoonacular.com/recipes/informationBulk");
  const queryParams = {
    apiKey,
    ids: ids.join(","),
  };
  url.search = new URLSearchParams(queryParams).toString();
  try {
    const response = await fetch(url);
    const resultsJson = await response.json();
    return {results: resultsJson};
  } catch (error) {
    console.log(error);
  }
};
