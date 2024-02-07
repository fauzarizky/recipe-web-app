/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import getMealByCategory from "../api/getMealByCategory";
import getMealByIngredients from "../api/getMealByIngredients";
import { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";
import { MenuDetailByIdModal } from "../components/MenuDetailByIdModal";
import { Navigation } from "../components/Navigation";
import useRemoveLikeRecipe from "../hooks/useRemoveLikeRecipe";
import useLikeRecipe from "../hooks/useLikeRecipe";
import useRemoveSaveRecipe from "../hooks/useRemoveSaveRecipe";
import useSaveRecipe from "../hooks/useSaveRecipe";

export const ListMenuBySelectedType = ({ filterBy }) => {
  const [menuBySelectedFilter, setMenuBySelectedFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailMenuModal, setShowDetailMenuModal] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  // const [likedRecipeData, setLikedRecipeData] = useState(JSON.parse(localStorage.getItem("likedRecipe")) || []);
  // const [savedRecipeData, setSavedRecipeData] = useState(JSON.parse(localStorage.getItem("savedRecipe")) || []);
  const { category, ingredient } = useParams();
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = menuBySelectedFilter?.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const likeRecipe = useLikeRecipe();
  // const saveRecipe = useSaveRecipe();
  // const removeLikeRecipe = useRemoveLikeRecipe();
  // const removeSaveRecipe = useRemoveSaveRecipe();

  const handleOpenDetailMenuModal = (id) => {
    setShowDetailMenuModal(!showDetailMenuModal);
    setSelectedMenuId(id);
  };

  const handleCloseDetailMenuModal = () => {
    setShowDetailMenuModal(!showDetailMenuModal);
    setSelectedMenuId(null);
  };

  const handleGetMenuByCategory = async () => {
    try {
      if (filterBy === "category") {
        const response = await getMealByCategory(category);
        if (response.status === 200) {
          setMenuBySelectedFilter(response.data.meals);
        }
      }

      if (filterBy === "ingredients") {
        const response = await getMealByIngredients(ingredient);
        if (response.status === 200) {
          setMenuBySelectedFilter(response.data.meals);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const checkSavedAndLikeStatus = (menuItems, savedData, likedData) => {
  //   const updatedMenuItems = menuItems?.map((menu) => {
  //     const isSaved = savedData?.find((savedRecipe) => savedRecipe?.idMeal === menu?.idMeal);
  //     const isLiked = likedData?.find((likedRecipe) => likedRecipe?.idMeal === menu?.idMeal);
  //     const isSavedValue = isSaved ? true : false;
  //     const isLikedValue = isLiked ? true : false;

  //     return { ...menu, isSaved: isSavedValue, isLiked: isLikedValue };
  //   });
  //   setMenuBySelectedFilter(updatedMenuItems);
  // };

  useEffect(() => {
    handleGetMenuByCategory();
    // setTimeout(() => {
    //   checkSavedAndLikeStatus(menuBySelectedFilter, savedRecipeData, likedRecipeData);
    // }, 500);
  }, [category]);
  return (
    <Box bgColor={"#F7F7F7"} w={"100vw"} h={"100vh"}>
      <header className="px-5 py-3">
        <Heading fontSize={"xl"}>
          List Menu By{" "}
          {filterBy === "category"
            ? category
              ? category.replace(/_/g, " ").charAt(0).toUpperCase() + category.slice(1)
              : "Unknown Category"
            : ingredient
            ? ingredient.replace(/_/g, " ").charAt(0).toUpperCase() + ingredient.slice(1)
            : "Unknown Ingredient"}
        </Heading>
      </header>
      <main className="px-5">
        {menuBySelectedFilter.length === 0 ? (
          <Text>No data found</Text>
        ) : (
          <Box display={"grid"} gridTemplateColumns={"repeat(2, 1fr)"} gap={3} h={"73vh"} overflowY={"auto"} pe={2}>
            {currentItems?.map((menu) => (
              <Card maxW="sm" key={menu.idMeal}>
                <CardBody>
                  <Image src={menu.strMealThumb} alt={menu.strMeal} borderRadius="lg" />
                  <Stack mt="6" spacing="3">
                    <Heading size="sm">{menu.strMeal}</Heading>
                  </Stack>
                </CardBody>
                <ButtonGroup display={"flex"} flexWrap={"wrap"} justifyContent={"center"} px={"5px"} pb={"10px"}>
                  <Button size={"sm"} bgColor="#44995F" color={"white"} _hover={{ bgColor: "#4B6352" }} onClick={() => handleOpenDetailMenuModal(menu.idMeal)}>
                    View
                  </Button>
{/* 
                  {menu?.isLiked ? (
                    <Button
                      onClick={() => {
                        removeLikeRecipe(menu, likedRecipeData, setLikedRecipeData);
                      }}
                      variant="solid"
                      size={"sm"}
                      bgColor="#44995F"
                      color={"white"}
                      _hover={{ bgColor: "#4B6352" }}>
                      <ion-icon name="trash-outline"></ion-icon>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        likeRecipe(menu, likedRecipeData, setLikedRecipeData);
                      }}
                      variant="solid"
                      size={"sm"}
                      bgColor="#44995F"
                      color={"white"}
                      _hover={{ bgColor: "#4B6352" }}>
                      <ion-icon name="heart-outline"></ion-icon>
                    </Button>
                  )}

                  {menu?.isSaved ? (
                    <Button
                      onClick={() => {
                        removeSaveRecipe(menu, savedRecipeData, setSavedRecipeData);
                      }}
                      variant="solid"
                      size={"sm"}
                      bgColor="#44995F"
                      color={"white"}
                      _hover={{ bgColor: "#4B6352" }}>
                      <ion-icon name="trash-outline"></ion-icon>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        saveRecipe(menu, savedRecipeData, setSavedRecipeData);
                      }}
                      variant="solid"
                      size={"sm"}
                      bgColor="#44995F"
                      color={"white"}
                      _hover={{ bgColor: "#4B6352" }}>
                      <ion-icon name="bookmark-outline"></ion-icon>
                    </Button>
                  )} */}
                </ButtonGroup>
              </Card>
            ))}
          </Box>
        )}
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} w={"100%"} mt={"20px"}>
          <Button onClick={() => paginate(currentPage - 1)} isDisabled={currentPage === 1} bgColor={"#44995F"} color={"white"} _hover={{ bgColor: "#4B6352" }} size={"sm"}>
            Prev
          </Button>
          <Text>Page {currentPage}</Text>
          <Button onClick={() => paginate(currentPage + 1)} isDisabled={indexOfLastItem >= menuBySelectedFilter.length} bgColor={"#44995F"} color={"white"} _hover={{ bgColor: "#4B6352" }} size={"sm"}>
            Next
          </Button>
        </Box>

        <MenuDetailByIdModal menuId={selectedMenuId} isOpen={showDetailMenuModal} onClose={handleCloseDetailMenuModal} />
      </main>
      <footer className="px-5">
        <Navigation activePage={0} />
      </footer>
    </Box>
  );
};
