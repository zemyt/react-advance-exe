import { Text, Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";

export const Footer = () => {
  const { scrollToTop } = useContext(MyContext);
  return (
    <Box
      className="footer"
      borderBottom="1px solid black"
      backgroundColor="hsl(219, 29%, 14%)"
      padding="3rem 5% 3rem"
      display={{ base: "flex", md: "grid" }}
      justifyContent="center"
      gridTemplateRows="repeat(1, 1fr)"
      gridTemplateColumns="repeat(2, 1fr)"
    >
      <Flex
        className="footer-links"
        fontSize="sm"
        color="white"
        flexDir={{ base: "row", md: "column" }}
        gap="1rem"
        gridArea="1/1/2/2"
      >
        <Link to="/">
          <Text
            onClick={scrollToTop}
            textDecoration="underline"
            _hover={{
              color: "rgba(242, 242, 242, 0.75)",
              transition: "all 0.4s ease 0s",
            }}
          >
            Events
          </Text>
        </Link>
        <Link to="/createEvent">
          <Text
            onClick={scrollToTop}
            borderLeft={{ base: "1px solid white", md: "none" }}
            paddingLeft={{ base: "1rem", md: "0" }}
            textDecoration="underline"
            _hover={{
              color: "rgba(242, 242, 242, 0.75)",
              transition: "all 0.4s ease 0s",
            }}
          >
            Create Event
          </Text>
        </Link>
      </Flex>

      <Flex className="footer-text" gridArea="1/2/2/3">
        <Text
          color="white"
          fontSize="sm"
          borderLeft="1px solid white"
          paddingLeft="1rem"
          display={{ base: "none", md: "flex" }}
        >
          Eu in est, morbi. Aenean ridiculus blandit, maecenas phasellus
          Molestie auctor quis potenti odio mauris Tortor laoreet consequat.
          Sapien etiam taciti cum ipsum, sem dictum nisi nec quam nibh Metus
          parturient amet eget purus placerat hendrerit erat quam vehicula vel
          id dui. Justo enim metus penatibus suscipit donec fringilla urna.
        </Text>
      </Flex>
    </Box>
  );
};
