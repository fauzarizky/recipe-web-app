/* eslint-disable react/prop-types */
import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const TitleSection = ({ title, isShow = true, id, getRandomMeal }) => {
  return (
    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
      <Text color={"black"} fontWeight={"bold"} fontSize={"xl"}>
        {title}
      </Text>
      {isShow ? (
        <Link to={`/${id}`} style={{ textDecoration: "none" }}>
          <Text color={"#44995F"} _hover={{ color: "#4B6352" }} transitionDuration={"0.7s"} fontWeight={"medium"} fontSize={"sm"} cursor={"pointer"}>
            See All
          </Text>
        </Link>
      ) : (
        <Text color={"#44995F"} _hover={{ color: "#4B6352" }} transitionDuration={"0.7s"} fontWeight={"medium"} fontSize={"sm"} cursor={"pointer"} onClick={() => getRandomMeal()}>
          Refresh
        </Text>
      )}
    </Box>
  );
};
