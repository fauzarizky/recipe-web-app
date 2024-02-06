import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getMealByName from "../api/getMealByName";
import { Box, Button, Heading, Image, Text, useToast } from "@chakra-ui/react";

export const SingleMenu = () => {
  const { name } = useParams();
  const [menu, setMenu] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const toast = useToast();

  const handleGetSingleMenu = async () => {
    try {
      const response = await getMealByName(name);

      if (response.status === 200) {
        setMenu(response.data.meals[0]);

        const extractedIngredients = Object.values(response.data.meals[0]).filter((value, index) => index >= 9 && index <= 26 && value.trim() !== "");
        setIngredients(extractedIngredients);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    handleGetSingleMenu();
  }, []);
  return (
    <Box bgColor={"#F7F7F7"} w={"100vw"} minH={"100vh"} overflow={"auto"}>
      <header className="px-5 py-3">
        <Heading>{menu.strMeal}</Heading>
      </header>

      <main className="px-5">
        {menu ? (
          <Box display={"flex"} flexDirection={"column"} gap={{base: "5px", md: "10px"}}>
            <Image width={"150px"} src={menu.strMealThumb} alt={menu.strMeal} />
            <Text mt={3}>
              <span className="font-bold">From: </span> {menu.strArea} <span className="font-bold"> Category: </span> {menu.strCategory}
            </Text>
            <Text>
              <span className="font-bold"> Watch Youtube: </span>
              {menu?.strYoutube ? (
                <a href={menu.strYoutube} target="_blank" rel="noreferrer" className="text-blue-500">
                  Video
                </a>
              ) : (
                "Not Available"
              )}
            </Text>
            <Text>
              <span className="font-bold">Ingredients: </span> {ingredients.join(",")}
            </Text>
            <Text h={{ base: "150px", md: "200px", lg: "220px" }} overflow={"auto"}>
              <span className="font-bold">Instructions: </span> {menu.strInstructions}
            </Text>
            <Button mt={3} bgColor={"#44995F"} _hover={{ bgColor: "#4B6352" }} transitionDuration={"0.7s"} textColor={"white"} onClick={() => window.history.back()}>
              Back
            </Button>
          </Box>
        ) : (
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
            <Heading>Not Found</Heading>
            <Text>Sorry menu that you are looking for is not found!</Text>
          </Box>
        )}
      </main>
    </Box>
  );
};
