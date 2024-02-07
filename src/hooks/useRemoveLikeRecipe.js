import { useToast } from "@chakra-ui/react";

const useRemoveLikeRecipe = (recipe, likedRecipeData, setLikedRecipeData) => {
  const toast = useToast();

  const removeLikedRecipe = () => {
    const newLikedRecipe = likedRecipeData.filter((item) => item.idMeal !== recipe.idMeal);
    setLikedRecipeData(newLikedRecipe);
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
