/* eslint-disable react/prop-types */
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";

export const DeleteConfirmationModal = ({ isOpen, onClose, selectedRecipe, deleteFor }) => {
  const savedData = deleteFor === "bookmark" ? JSON.parse(localStorage.getItem("savedRecipe")) : deleteFor === "like" ? JSON.parse(localStorage.getItem("likedRecipe")) || [] : [];
  const [savedRecipe, setSavedRecipe] = useState(savedData);
  const toast = useToast();
  const handleSubmit = () => {
    const newSaveRecipe = savedRecipe.filter((item) => item.idMeal !== selectedRecipe.idMeal);
    setSavedRecipe(newSaveRecipe);

    if (deleteFor === "bookmark") {
      localStorage.setItem("savedRecipe", JSON.stringify(newSaveRecipe));
    } else {
      localStorage.setItem("likedRecipe", JSON.stringify(newSaveRecipe));
    }
    toast({
      title: "Success",
      description: "Your recipe has been removed.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setTimeout(() => {
      onClose();
      window.location.reload();
    }, 1200);
  };

  return (
    <Modal closeOnOverlayClick={false} onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete this recipe?</Text>
          <Text>Recipe Name: {selectedRecipe?.strMeal}</Text>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={handleSubmit} bgColor={"#44995F"} _hover={{ bgColor: "#4B6352" }} transitionDuration={"0.7s"} textColor={"white"} cursor={"pointer"}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
