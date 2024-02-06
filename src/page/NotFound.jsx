import { Box, Button, Image, Text } from "@chakra-ui/react";
import notFoundImg from "../assets/404.png";

export const NotFound = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>
      <Image src={notFoundImg} width={"300px"} />
      <Text color={"black"} fontWeight={"bold"} fontSize={"xl"} mt={"20px"}>
        Page Not Found
      </Text>
      <Button mt={"20px"} bgColor={"#44995F"} _hover={{ bgColor: "#4B6352" }} transitionDuration={"0.7s"} textColor={"white"} onClick={() => window.history.back()}>
        Go Back
      </Button>
    </Box>
  );
};
