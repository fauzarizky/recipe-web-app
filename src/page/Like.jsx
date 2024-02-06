/* eslint-disable react/prop-types */
import { Box, Button, Heading, Image, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import { RecipeDetailModal } from "../components/RecipeDetailModal";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal";
import { Navigation } from "../components/Navigation";

export const Like = () => {
  const savedData = JSON.parse(localStorage.getItem("likedRecipe")) || [];
  const [recipeModal, setRecipeModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(savedData);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);

    if (e.target.value === "") {
      setFilteredData(savedData);
    } else {
      const filtered = savedData.filter((data) => data.strMeal.toLowerCase().includes(search.toLowerCase()));
      setFilteredData(filtered);
    }
  };

  const handleOpenDeleteConfirmationModal = (recipe) => {
    setSelectedRecipe(recipe);
    setShowDeleteConfirmationModal(true);
  };

  return (
    <Box bgColor={"#F7F7F7"} w={"100vw"} h={"100vh"}>
      <header className="px-5 py-3">
        <Heading fontSize={"xl"}>Like</Heading>
      </header>

      <main className="px-5">
        <Box h={"8vh"}>
          <InputGroup className="mt-3">
            <InputLeftElement pointerEvents="none">
              <ion-icon name="search-outline"></ion-icon>
            </InputLeftElement>
            <Input placeholder="Search Recipe" onChange={handleSearchChange} variant={"filled"} transitionDuration={"0.7s"} _hover={{ borderColor: "#44995F" }} borderRadius={"full"} bgColor={"white"} />
          </InputGroup>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={2} alignItems={"center"} h={"67vh"} w={"100%"} overflowY={"auto"} borderRadius={"lg"} pr={2}>
          {savedData.length > 0 ? (
            filteredData.map((meal) => (
              <Box key={meal.idMeal} display={"flex"} gap={2} alignItems={"center"} borderRadius={"md"} h={"20vh"} minW={"100%"} overflow={"hidden"} bgColor={"white"}>
                <Box w={"40%"}>
                  <Image w={"100%"} h={"100%"} objectFit={"cover"} src={meal.strMealThumb} alt={meal.strMeal} />
                </Box>
                <Box w={"60%"}>
                  <Heading size="sm" isTruncated>
                    {meal.strMeal}
                  </Heading>
                  <Text py="2">
                    From {meal.strArea}, {meal.strCategory} category
                  </Text>

                  <Box display={"flex"} justifyContent={{ base: "flex-end", md: "flex-start" }} alignItems={"center"} mr={3} gap={2}>
                    <Button onClick={() => setRecipeModal(true)} variant="solid" size={"sm"} bgColor="#44995F" color={"white"} _hover={{ bgColor: "#4B6352" }}>
                      View
                    </Button>

                    <Button onClick={() => handleOpenDeleteConfirmationModal(meal)} variant="solid" size={"sm"} bgColor="#44995F" color={"white"} _hover={{ bgColor: "#4B6352" }}>
                      <ion-icon name="trash-outline"></ion-icon>
                    </Button>
                  </Box>
                </Box>
                <RecipeDetailModal data={meal} isOpen={recipeModal} onClose={() => setRecipeModal(false)} />
              </Box>
            ))
          ) : (
            <Text>No liked recipe</Text>
          )}
        </Box>
        <DeleteConfirmationModal isOpen={showDeleteConfirmationModal} onClose={() => setShowDeleteConfirmationModal(false)} selectedRecipe={selectedRecipe} deleteFor={"like"} />
      </main>

      <footer className="px-5">
        <Navigation activePage={1} />
      </footer>
    </Box>
  );
};
