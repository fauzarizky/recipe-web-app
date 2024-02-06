/* eslint-disable react/prop-types */
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button, Text, Input } from "@chakra-ui/react";
import { useState } from "react";

export const UserDataModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");

  const time = Date.now();
  const currentDate = new Date(time);
  const convertToUTC7 = currentDate.toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
  const dataUser = {
    username: username?.charAt(0).toUpperCase() + username?.slice(1),
    firstName: "",
    lastName: "",
    updatedAt: convertToUTC7,
  };

  const isSubmitDisabled = !username.trim();
  const handleSubmit = () => {
    localStorage.setItem("userInfoRecipeApp", JSON.stringify(dataUser));
    onClose();
  };
  return (
    <Modal closeOnOverlayClick={false} onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Input Username</ModalHeader>
        <ModalBody>
          <Text>Username:</Text>
          <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit} isDisabled={isSubmitDisabled}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
