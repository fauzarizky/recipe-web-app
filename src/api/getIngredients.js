import axios from "axios";

const getIngredients = async () => {
  try {
    const response = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default getIngredients;
