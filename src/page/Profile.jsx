/* eslint-disable react/prop-types */
import { Box, Button, Heading, Image, Text, useCallbackRef, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { EditProfileModal } from "../components/EditProfileModal";
import { Navigation } from "../components/Navigation";

export const Profile = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [userData, setUserData] = useState({});
  const toast = useToast();

  const handleGetUserData = useCallbackRef(() => {
    const userInfo = localStorage.getItem("userInfoRecipeApp");
    if (userInfo) {
      setUserData(JSON.parse(userInfo));
    } else {
      toast({
        title: "Error.",
        description: "Please Input Your Username first.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  }, []);

  useEffect(() => {
    handleGetUserData();
  }, [handleGetUserData]);
  return (
    <Box bgColor={"#F7F7F7"} w={"100vw"} h={"100vh"}>
      <header className="px-5 py-3">
        <Heading>Profile</Heading>
      </header>
      <main className="px-5">
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} bgColor={"white"} h={"60vh"} rounded={"xl"} gap={5} position={"relative"}>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2}>
            <Image src={`https://ui-avatars.com/api/?name=${userData.username}&background=44995F&color=FFF`} alt={userData.username} w={"100px"} h={"100px"} rounded={"full"} />
            <Heading>{userData.username}</Heading>
          </Box>
          <Box>
            <Text>Firstname: {userData.firstName ? userData.firstName : "Not Available"}</Text>
            <Text>Lastname: {userData.lastName ? userData.lastName : "Not Available"}</Text>
          </Box>
          <Button bgColor={"#44995F"} _hover={{ bgColor: "#4B6352" }} transitionDuration={"0.7s"} textColor={"white"} w={"25vw"} onClick={() => setShowEditModal(true)} isDisabled={!userData.username}>
            Edit
          </Button>
          <Text position={"absolute"} bottom={3} right={3} fontSize={"x-small"} fontStyle={"italic"}>
            Updated at: {userData.updatedAt ? userData.updatedAt : "Not Available"}
          </Text>
        </Box>
        <EditProfileModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} userData={userData} />
      </main>
      <footer className="px-5">
        <Navigation activePage={3} />
      </footer>
    </Box>
  );
};
