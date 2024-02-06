import axios from "axios";

const getAreas = async () => {
  try {
    const response = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default getAreas;
