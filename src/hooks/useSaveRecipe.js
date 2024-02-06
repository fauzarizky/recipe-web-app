import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const useSaveRecipe = (recipe) => {
  const [savedRecipe, setSavedRecipe] = useState(JSON.parse(localStorage.getItem("savedRecipe")) || []);
  const toast = useToast();

  const saveRecipe = () => {
    const newSavedRecipe = [...savedRecipe, recipe];
    setSavedRecipe(newSavedRecipe);
    localStorage.setItem("savedRecipe", JSON.stringify(newSavedRecipe));
    toast({
      title: "Success",
      description: "Your recipe has been saved.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return saveRecipe;
};

export default useSaveRecipe;
