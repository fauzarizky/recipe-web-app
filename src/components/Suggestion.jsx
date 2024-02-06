/* eslint-disable react/prop-types */
import { Box, List, ListItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Suggestion = ({ suggestion }) => {
  if (suggestion.length === 0) return null;
  return (
    <Box mt={2} bgColor={"white"} borderRadius={"md"} boxShadow={"md"} position={"absolute"} width={"100%"} zIndex={5}>
      <List>
        {suggestion.map((menu, i) => (
          <Link to={`/menu/${menu.strMeal}`} key={i} style={{ textDecoration: "none" }}>
            <ListItem key={i} _hover={{ bgColor: "gray.100" }} cursor={"pointer"}>
              {menu.strMeal}
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
};
