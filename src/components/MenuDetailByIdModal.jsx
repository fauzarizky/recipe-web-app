/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Text, Image, Box } from "@chakra-ui/react";
import getMealById from "../api/getMealById";
import { useEffect, useState } from "react";
export const MenuDetailByIdModal = ({ menuId, isOpen, onClose }) => {
  const [menu, setMenu] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const handleGetMenuById = async () => {
    const response = await getMealById(menuId);

    if (response?.status === 200) {
      setMenu(response?.data?.meals[0]);

      const extractedIngredients = Object.values(response.data.meals[0]).filter((value, index) => index >= 9 && index <= 26 && value.trim() !== "");
      setIngredients(extractedIngredients);
    }
  };

  useEffect(() => {
    handleGetMenuById();
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{menu?.strMeal}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image width={"100%"} height={"300px"} src={menu?.strMealThumb} alt={menu?.strMeal} />
          <Box mt={"10px"} display={"flex"} flexDirection={"column"} gap={"10px"}>
            <Text>
              <span className="font-bold"> Category: </span> {menu?.strCategory}
            </Text>
            <Text>
              <span className="font-bold">From: </span> d {menu?.strArea}
            </Text>
            <Text>
              <span className="font-bold"> Watch Youtube: </span>
              {menu?.strYoutube ? (
                <a href={menu.strYoutube} target="_blank" rel="noreferrer" className="text-blue-500 ml-1">
                  Video
                </a>
              ) : (
                "Not Available"
              )}
            </Text>
            <Text>
              <span className="font-bold"> Ingredients: </span> {ingredients.join(", ")}
            </Text>
            <Text h={"100px"} overflow={"auto"}>
              <span className="font-bold"> Instructions: </span> {menu?.strInstructions}
            </Text>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose} bgColor={"#44995F"} _hover={{ bgColor: "#4B6352" }} transitionDuration={"0.7s"} textColor={"white"}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
