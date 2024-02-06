import axios from "axios";

const getMealByCategory = async (category) => {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export default getMealByCategory