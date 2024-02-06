/* eslint-disable react/prop-types */
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Text, Input, Box, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const EditProfileModal = ({ isOpen, onClose, userData }) => {
  const [username, setUsername] = useState(userData.username);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const toast = useToast();

  const time = Date.now();
  const currentDate = new Date(time);
  const convertToUTC7 = currentDate.toLocaleString("en-US", { timeZone: "Asia/Jakarta" });

  const dataUser = {
    username: username?.charAt(0).toUpperCase() + username?.slice(1),
    firstName: firstName?.charAt(0).toUpperCase() + firstName?.slice(1),
    lastName: lastName?.charAt(0).toUpperCase() + lastName?.slice(1),
    updatedAt: convertToUTC7,
  };

  const isSubmitDisabled = !username?.trim() || !firstName?.trim() || !lastName?.trim()
  const handleSubmit = () => {
    localStorage.setItem("userInfoRecipeApp", JSON.stringify(dataUser));
    toast({
      title: "Success.",
      description: "Your profile has been updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  useEffect(() => {
    setUsername(userData.username ||"");
    setFirstName(userData.firstName ||"");
    setLastName(userData.lastName ||"");
  }, [userData, isOpen]);
  return (
    <Modal closeOnOverlayClick={false} onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Input Username</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Text>Username:</Text>
            <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Box>

          <Box>
            <Text>Firstname:</Text>
            <Input placeholder="Firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </Box>

          <Box>
            <Text>Lastname:</Text>
            <Input placeholder="Lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </Box>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={handleSubmit} isDisabled={isSubmitDisabled}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
