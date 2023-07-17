import { React, useState, useContext } from "react";
import { Button, Box, Text, Flex } from "@chakra-ui/react";
import { EventSearch } from "../components/EventSearch";
import { Link } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import { EventItem } from "../components/EventItem";

export const EventsPage = () => {
  const { events, categories } = useContext(MyContext);

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
    <Box className="event-page">
      <Flex paddingTop="2rem" flexDir="column" align="center">
        <Text paddingBottom="1.5rem" fontSize="3rem" fontWeight="bold">
          Events
        </Text>
        <Link to="./createEvent">
          <Button borderRadius="md" w="160px">
            Create Event
          </Button>
        </Link>

        <EventSearch
          handleChange={handleChange}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        ></EventSearch>
      </Flex>

      {/* return all events that match search criteria on EventsPage */}
      <Flex
        paddingTop="2rem"
        flexWrap="wrap"
        justify="center"
        align="center"
        gap="1rem"
      >
        {matchedEvents.map((event) => (
          <EventItem key={event.id} event={event} categories={categories} />
        ))}
      </Flex>
    </Box>
  );
};
