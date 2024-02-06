import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const useLikeRecipe = (recipe) => {
  const [likedRecipe, setlikedRecipe] = useState(JSON.parse(localStorage.getItem("likedRecipe")) || []);
  const toast = useToast();

  const likeRecipe = () => {
    const newLikedRecipe = [...likedRecipe, recipe];
    setlikedRecipe(newLikedRecipe);
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
