/* eslint-disable react/prop-types */
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Image, Text, Box } from "@chakra-ui/react";

export const RecipeDetailModal = ({ data, isOpen, onClose }) => {
  const ingredients = Object.values(data).filter((value, index) => index >= 9 && index <= 26 && value?.trim() !== "");

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{data.strMeal}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image width={"100%"} height={"300px"} src={data.strMealThumb} alt={data.strMeal} />
          <Box mt={"10px"} display={"flex"} flexDirection={"column"} gap={"10px"}>
            <Text>
              <span className="font-bold">Category: </span> {data.strCategory}
            </Text>
            <Text>
              <span className="font-bold"> From: </span> {data.strArea}
            </Text>
            <Text>
              <span className="font-bold"> Watch Youtube: </span>
              {data?.strYoutube ? (
                <a href={data.strYoutube} target="_blank" rel="noreferrer" className="text-blue-500">
                  Video
                </a>
              ) : (
                "Not Available"
              )}
            </Text>
            <Text>
              <span className="font-bold"> Ingredients: </span> {ingredients.join(",")}
            </Text>
            <Text h={"100px"} overflow={"auto"}>
              <span className="font-bold"> Instructions: </span> {data.strInstructions}
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
