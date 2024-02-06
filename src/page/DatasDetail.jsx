/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Heading, Image, Input, InputGroup, InputLeftElement, Text, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import getCategories from "../api/getCategories";
import getIngredients from "../api/getIngredients";
import { Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";

export const DatasDetail = ({ data }) => {
  const datasRef = useRef([]);
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const toast = useToast();

  const getAllData = useCallback(async () => {
    try {
      if (data === "categories" && datasRef.current.length === 0) {
        const response = await getCategories();
        if (response.status === 200) {
          datasRef.current == response.data.categories;
          setDatas(response.data.categories);
        }
      } else if (data === "ingredients" && datasRef.current.length === 0) {
        const response = await getIngredients();
        if (response.status === 200) {
          datasRef.current == response.data.meals;
          setDatas(response.data.meals);
          setFilteredData(response.data.meals);
        }
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [data, toast]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);

    const filtered = datas.filter((ingredient) => ingredient.strIngredient.toLowerCase().includes(search.toLowerCase()));
    setFilteredData(filtered);
  };

  const memoizedFilteredData = useMemo(() => filteredData, [filteredData]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  return (
    <Box w={"100vw"} h={"100vh"} bgColor={"#F7F7F7"}>
      <header className="px-5 py-3">
        <Heading>{data.charAt(0).toUpperCase() + data.slice(1)}</Heading>
        <Text fontSize={"xs"} fontStyle={"italic"}>
          *Click on the {data.charAt(0).toUpperCase() + data.slice(1)} you want
        </Text>
      </header>

      <main className="px-5">
        {data === "ingredients" && (
          <InputGroup className="mt-3">
            <InputLeftElement pointerEvents="none">
              <ion-icon name="search-outline"></ion-icon>
            </InputLeftElement>
            <Input placeholder="Search an ingredient" type="text" mb={3} onChange={(e) => handleSearchChange(e)} variant={"filled"} transitionDuration={"0.7s"} _hover={{ borderColor: "#44995F" }} borderRadius={"full"} bgColor={"white"} />
          </InputGroup>
        )}
        <Box h={data === "categories" ? "74vh" : "65vh"} display={"grid"} gridTemplateColumns={"repeat(3, 1fr)"} flexWrap={"wrap"} overflowY={"auto"} alignItems={"center"} gap={3}>
          {data === "categories" &&
            datas.map((category) => (
              <Link key={category.idCategory} to={`/categories/${category.strCategory.toLowerCase()}`}>
                <Box minW={"6rem"} p={2} bgColor={"white"} display={"flex"} flexDirection={"column"} alignItems={"center"} borderRadius={"md"} cursor={"pointer"} _hover={{ bgColor: "#44995F", color: "white" }} transitionDuration={"0.7s"}>
                  <Image borderRadius={"full"} src={category.strCategoryThumb} alt={category.strCategory} boxSize={"3rem"} />
                  <Text textAlign={"center"} fontSize={"sm"} fontWeight={"medium"} borderRadius={"md"}>
                    {category.strCategory}
                  </Text>
                </Box>
              </Link>
            ))}

          {data === "ingredients" &&
            memoizedFilteredData.map((category) => (
              <Link key={category.idIngredient} to={`/ingredients/${category.strIngredient.toLowerCase().replace(/\s+/g, "_")}`}>
                <Box
                  p={2}
                  bgColor={"white"}
                  minW={"7rem"}
                  minH={"7rem"}
                  borderRadius={"md"}
                  cursor={"pointer"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  _hover={{ bgColor: "#44995F", color: "white" }}
                  transitionDuration={"0.7s"}>
                  <Text>{category.strIngredient}</Text>
                </Box>
              </Link>
            ))}
        </Box>
      </main>
      <footer className="px-5">
        <Navigation activePage={0} />
      </footer>
    </Box>
  );
};
