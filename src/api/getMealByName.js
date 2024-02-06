import axios from "axios";

const getMealByName = async (name) => {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export default getMealByName;