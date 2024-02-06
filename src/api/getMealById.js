import axios from "axios";

const getMealById = async (id) => {
  try {
    const response = axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default getMealById;
