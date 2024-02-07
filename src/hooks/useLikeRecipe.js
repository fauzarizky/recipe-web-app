import { useToast } from "@chakra-ui/react";

const useLikeRecipe = (recipe, likedRecipeData, setLikedRecipeData) => {
  const toast = useToast();

  const likeRecipe = () => {
    const newLikedRecipe = [...likedRecipeData, recipe];
    setLikedRecipeData(newLikedRecipe);
    localStorage.setItem("likedRecipe", JSON.stringify(newLikedRecipe));
    toast({
      title: "Success",
      description: "Your recipe has been liked.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return likeRecipe;
};

export default useLikeRecipe;
