import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const useRemoveSaveRecipe = (recipe) => {
  const [savedRecipe, setSavedRecipe] = useState(JSON.parse(localStorage.getItem("savedRecipe")) || []);
  const toast = useToast();

  const removeRecipe = () => {
    const newSaveRecipe = savedRecipe.filter((item) => item.idMeal !== recipe.idMeal);
    setSavedRecipe(newSaveRecipe);
    localStorage.setItem("savedRecipe", JSON.stringify(newSaveRecipe));
    toast({
      title: "Success",
      description: "Your recipe has been removed.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return removeRecipe;
};

export default useRemoveSaveRecipe;
