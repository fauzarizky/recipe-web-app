import { useToast } from "@chakra-ui/react";

const useSaveRecipe = (recipe, savedRecipeData, setSavedRecipeData) => {
  const toast = useToast();

  const saveRecipe = () => {
    const newSavedRecipe = [...savedRecipeData, recipe];
    setSavedRecipeData(newSavedRecipe);
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
