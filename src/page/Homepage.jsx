/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Heading, Image, Input, InputGroup, InputLeftElement, Text, useToast } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import getCategories from "../api/getCategories";
import { TitleSection } from "../components/TitleSection";
import getIngredients from "../api/getIngredients";
import getRandomMeal from "../api/getRandomMeal";
import { RecipeDetailModal } from "../components/RecipeDetailModal";
import { UserDataModal } from "../components/UserDataModal";
import { Link } from "react-router-dom";
import { Suggestion } from "../components/Suggestion";
import useSaveRecipe from "../hooks/useSaveRecipe";
import useRemoveSaveRecipe from "../hooks/useRemoveSaveRecipe";
import useLikeRecipe from "../hooks/useLikeRecipe";
import useRemoveLikeRecipe from "../hooks/useRemoveLikeRecipe";
import { Navigation } from "../components/Navigation";
import getMealByFirstLetter from "../api/getMealByFirstLetter";

export const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [randomMeal, setRandomMeal] = useState([]);
  const [recipeModal, setRecipeModal] = useState(false);
  const [showUserDataModal, setShowUserDataModal] = useState(false);
  const [menuBySearch, setMenuBySearch] = useState([]);
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userInfoRecipeApp")) || "";
  const [savedRecipeData, setSavedRecipeData] = useState(JSON.parse(localStorage.getItem("savedRecipe")) || []);
  const [isRecipeSaved, setIsRecipeSaved] = useState(false);
  const [likedRecipeData, setLikedRecipeData] = useState(JSON.parse(localStorage.getItem("likedRecipe")) || []);
  const [isRecipeLiked, setIsRecipeLiked] = useState(false);
  const saveRecipe = useSaveRecipe(randomMeal[0]);
  const removeRecipe = useRemoveSaveRecipe(randomMeal[0]);
  const likeRecipe = useLikeRecipe(randomMeal[0]);
  const removeLikeRecipe = useRemoveLikeRecipe(randomMeal[0]);

  const toast = useToast();

  const getAllCategories = async () => {
    try {
      const response = await getCategories();
      if (response.status === 200) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const getAllIngredients = async () => {
    try {
      const response = await getIngredients();
      if (response.status === 200) {
        setIngredients(response.data.meals);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const getSingleMeal = async () => {
    try {
      const response = await getRandomMeal();
      if (response.status === 200) {
        setRandomMeal(response.data.meals);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const handleCheckUsername = () => {
    if (userData.username) {
      setShowUserDataModal(false);
    } else {
      setShowUserDataModal(true);
    }
  };

  const handleSearchInputChange = async (e) => {
    try {
      setSearch(e.target.value);
      const response = await getMealByFirstLetter(search);
      setMenuBySearch(response.data.meals);
    } catch (error) {
      console.error(error);
    }
  };

  const memoizedIngredients = useMemo(() => ingredients.slice(0, 10), [ingredients]);

  const handleSearchInputFocus = () => setIsFocused(true);
  const handleSearchInputBlur = () => {
    setTimeout(() => {
      setIsFocused(false)
    }, 1000)
  };

  useEffect(() => {
    getAllCategories();
    getAllIngredients();
    getSingleMeal();
    handleCheckUsername();
  }, []);

  useEffect(() => {
    // Check if the current recipe is saved when savedRecipeData changes
    setIsRecipeSaved(savedRecipeData.find((savedRecipe) => savedRecipe?.idMeal === randomMeal[0]?.idMeal) !== undefined);

    // Check if the current recipe is liked when savedRecipeData changes
    setIsRecipeLiked(likedRecipeData.find((likedRecipe) => likedRecipe?.idMeal === randomMeal[0]?.idMeal) !== undefined);
  }, [savedRecipeData, likedRecipeData, randomMeal]);

  return (
    <Box bgColor={"#F7F7F7"} w={"100vw"} h={"100vh"}>
      <header className="px-5 py-3">
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
          <Text color={"#9F9F9F"}>Hello, {userData.username ? userData.username.charAt(0).toUpperCase() + userData.username.slice(1) : "Guest"}!</Text>
          {userData.username && (
            <Link to={"/profile"}>
              <Image src={`https://ui-avatars.com/api/?name=${userData.username}&background=44995F&color=FFF`} alt={userData.username} width={"30px"} borderRadius={"full"} cursor={"pointer"} />
            </Link>
          )}
        </Box>
        <Heading fontSize={"2xl"} w={"75%"}>
          What would you like to cook today?
        </Heading>
        <Box position={"relative"}>
          <InputGroup className="mt-3">
            <InputLeftElement pointerEvents="none">
              <ion-icon name="search-outline"></ion-icon>
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search any recipes"
              onChange={(e) => handleSearchInputChange(e)}
              variant={"filled"}
              transitionDuration={"0.7s"}
              _hover={{ borderColor: "#44995F" }}
              onFocus={handleSearchInputFocus}
              onBlur={handleSearchInputBlur}
              borderRadius={"full"}
              bgColor={"white"}
            />
          </InputGroup>
          <Suggestion suggestion={isFocused ? menuBySearch : []} />
        </Box>
      </header>

      <main className="px-5">
        <Box id="categories">
          <TitleSection title={"Categories"} id={"categories"} />
          <Box display={"flex"} w={"100%"} overflowX={"auto"} gap={2} py={2}>
            {categories.map((category) => (
              <Link key={category.idCategory} to={`/categories/${category.strCategory?.toLowerCase()}`} style={{ textDecoration: "none" }}>
                <Box p={2} minW={"5rem"} maxH={"5rem"} gap={2} bgColor={"white"} borderRadius={"md"} _hover={{ bgColor: "#44995F" }} transitionDuration={"0.7s"} cursor={"pointer"}>
                  <Image borderRadius={"full"} src={category.strCategoryThumb} alt={category.strCategory} />
                  <Text isTruncated color={"black"} textAlign={"center"} fontWeight={500} fontSize={"sm"}>
                    {category.strCategory}
                  </Text>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>

        <Box id="ingredients" mt={3}>
          <TitleSection title={"Popular Ingredients"} id={"ingredients"} />
          <Box display={"flex"} w={"100%"} overflowX={"auto"} gap={2} py={2}>
            {memoizedIngredients.slice(0, 10).map((ingredient) => (
              <Link key={ingredient.idIngredient} to={`/ingredients/${ingredient.strIngredient?.toLowerCase()}`} style={{ textDecoration: "none" }}>
                <Box p={2} minW={"5rem"} maxH={"5rem"} gap={2} bgColor={"white"} borderRadius={"md"} _hover={{ bgColor: "#44995F" }} transitionDuration={"0.7s"} cursor={"pointer"}>
                  <Text isTruncated color={"black"} textAlign={"center"} fontWeight={500} fontSize={"sm"}>
                    {ingredient.strIngredient}
                  </Text>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>

        <Box id="recommandation" w={"100%"} mt={3}>
          <TitleSection title={"Maybe you will like"} isShow={false} getRandomMeal={getSingleMeal} />
          <Box h={"20vh"} overflowY={"auto"} w={"100%"} bgColor={"white"} borderRadius={"md"} mt={2}>
            {randomMeal.map((meal) => (
              <Box key={meal.idMeal} display={"flex"} gap={2} alignItems={"center"}>
                <Image objectFit="cover" w={"50vw"} h={"20vh"} borderRadius={"md"} src={meal.strMealThumb} alt={meal.strMeal} />
                <Box>
                  <Heading size="sm" isTruncated>
                    {meal.strMeal}
                  </Heading>
                  <Text py="2">
                    From {meal.strArea}, {meal.strCategory} category
                  </Text>

                  <Box display={"flex"} justifyContent={{ base: "flex-end", md: "flex-start" }} alignItems={"center"} mr={{ base: 3, md: 0 }} gap={2}>
                    <Button onClick={() => setRecipeModal(true)} variant="solid" size={"sm"} bgColor="#44995F" color={"white"} _hover={{ bgColor: "#4B6352" }}>
                      View
                    </Button>

                    {isRecipeLiked ? (
                      <Button
                        onClick={() => {
                          removeLikeRecipe(meal);
                          setIsRecipeLiked(false);
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
                          likeRecipe();
                          setLikedRecipeData(JSON.parse(localStorage.getItem("likedRecipe")) || []);
                        }}
                        variant="solid"
                        size={"sm"}
                        bgColor="#44995F"
                        color={"white"}
                        _hover={{ bgColor: "#4B6352" }}>
                        <ion-icon name="heart-outline"></ion-icon>
                      </Button>
                    )}

                    {isRecipeSaved ? (
                      <Button
                        onClick={() => {
                          removeRecipe(randomMeal[0]);
                          setIsRecipeSaved(false);
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
                          saveRecipe();
                          setSavedRecipeData(JSON.parse(localStorage.getItem("savedRecipe")) || []);
                        }}
                        variant="solid"
                        size={"sm"}
                        bgColor="#44995F"
                        color={"white"}
                        _hover={{ bgColor: "#4B6352" }}>
                        <ion-icon name="bookmark-outline"></ion-icon>
                      </Button>
                    )}
                  </Box>
                </Box>
                <RecipeDetailModal data={meal} isOpen={recipeModal} onClose={() => setRecipeModal(false)} />
              </Box>
            ))}
          </Box>
        </Box>
        <UserDataModal isOpen={showUserDataModal} onClose={() => setShowUserDataModal(false)} />
      </main>
      <footer className="flex md:justify-center px-5">
        <Navigation activePage={0} />
      </footer>
    </Box>
  );
};
