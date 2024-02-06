import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const useRemoveLikeRecipe = (recipe) => {
  const [likedRecipe, setlikedRecipe] = useState(JSON.parse(localStorage.getItem("likedRecipe")) || []);
  const toast = useToast();

  const removeLikedRecipe = () => {
    const newLikedRecipe = likedRecipe.filter((item) => item.idMeal !== recipe.idMeal);
    setlikedRecipe(newLikedRecipe);
    localStorage.setItem("likedRecipe", JSON.stringify(newLikedRecipe));
    toast({
      title: "Success",
      description: "Your recipe has been removed.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return removeLikedRecipe;
};

export default useRemoveLikeRecipe;
