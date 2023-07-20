import { React, useState, useContext } from "react";
import { Button, Box, Text, Flex } from "@chakra-ui/react";
import { EventSearch } from "../components/EventSearch";
import { Link } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import { EventItem } from "../components/EventItem";

export const EventsPage = () => {
  const { events, categories, scrollToTop } = useContext(MyContext);

  const [searchField, setSearchField] = useState("");
  const [searchValue, setSearchValue] = useState("all");

  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  const matchedEvents = events.filter((event) => {
    let isEventMatched = [];

    switch (searchValue) {
      case "all":
        isEventMatched =
          event.title.toLowerCase().includes(searchField.toLowerCase()) ||
          event.description.toLowerCase().includes(searchField.toLowerCase());

        return isEventMatched;

      case "sports":
        isEventMatched =
          (event.title.toLowerCase().includes(searchField.toLowerCase()) ||
            event.description
              .toLowerCase()
              .includes(searchField.toLowerCase())) &&
          event.categoryIds.includes(1);

        return isEventMatched;

      case "games":
        isEventMatched =
          (event.title.toLowerCase().includes(searchField.toLowerCase()) ||
            event.description
              .toLowerCase()
              .includes(searchField.toLowerCase())) &&
          event.categoryIds.includes(2);

        return isEventMatched;
      default:
        return isEventMatched;
    }
  });

  return (
    <Box
      className="event-page"
      backgroundColor="rgb(238, 242, 247)"
      minH="100vh"
      paddingBottom="2rem"
    >
      <Flex
        className="event-page-banner"
        flexDir="column"
        borderBottom="1px solid black"
        align="space-between"
        padding="2rem 5% 0"
      >
        <Text
          fontFamily="Proxima Nova"
          paddingBottom="1.5rem"
          fontWeight="bold"
          maxWidth="20ch"
          fontSize="clamp(1rem, 4vw, 3rem)"
        >
          AUCTOR QUIS RUTRUM TACTICI PLACERAT PORTTITOR LIBERTO VENENATIS
          FEUGIAT LAOREET LOREM.
        </Text>

        <Flex paddingBottom="2rem" flexDir="column" gap="1rem">
          <Text maxWidth="30ch" fontFamily="Proxima Nova">
            Lacus felis sit nullam. Per neque nec posuere non Pretium torquent.
          </Text>
          <Button
            as={Link}
            to="./createEvent"
            borderRadius="sm"
            w="160px"
            border="1px solid"
            borderColor="hsl(219, 29%, 14%)"
            color="rgb(238, 242, 247)"
            backgroundColor="hsl(219, 29%, 14%)"
            onClick={scrollToTop}
            _hover={{
              color: "rgba(242, 242, 242, 0.75)",
              transition: "all 0.4s ease 0s",
            }}
          >
            Create Event
          </Button>
        </Flex>
      </Flex>
      <Flex paddingTop="2rem" flexDir="column" align="center">
        <EventSearch
          handleChange={handleChange}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        ></EventSearch>
      </Flex>

      <Flex
        className="events-list-container"
        padding="2rem 5% 2rem"
        flexWrap="wrap"
        justify="center"
        align="center"
        gap="1rem"
      >
        {matchedEvents.length === 0 ? (
          <Text fontSize="1.5rem">No match results.</Text>
        ) : (
          matchedEvents.map((event) => (
            <EventItem key={event.id} event={event} categories={categories} />
          ))
        )}
      </Flex>
    </Box>
  );
};
