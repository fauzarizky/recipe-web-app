import { useToast } from "@chakra-ui/react";

const useRemoveSaveRecipe = (recipe, savedRecipeData, setSavedRecipeData) => {
  const toast = useToast();

  const removeRecipe = () => {
    const newSaveRecipe = savedRecipeData.filter((item) => item.idMeal !== recipe.idMeal);
    setSavedRecipeData(newSaveRecipe);
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
