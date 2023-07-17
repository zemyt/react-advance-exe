import { React, useState, useContext } from "react";
import { Button, Text, Flex } from "@chakra-ui/react";
import { EventSearch } from "../components/EventSearch";
import { EventList } from "../components/EventList";
import { Link } from "react-router-dom";
import { MyContext } from "../context/MyContext";

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
        isEventMatched = event.title
          .toLowerCase()
          .includes(searchField.toLowerCase());

        return isEventMatched;

      case "sports":
        isEventMatched =
          event.title.toLowerCase().includes(searchField.toLowerCase()) &&
          event.categoryIds.includes(1);

        return isEventMatched;

      case "games":
        isEventMatched =
          event.title.toLowerCase().includes(searchField.toLowerCase()) &&
          event.categoryIds.includes(2);

        return isEventMatched;
      default:
        return isEventMatched;
    }
  });

  return (
    <div className="event-page">
      <Flex paddingTop="2rem" flexDir="column" align="center">
        <Text paddingBottom="1.5rem" fontSize="3rem" fontWeight="bold">
          Events
        </Text>
        <Link to="./createEvent">
          <Button w="200px">Add Event</Button>
        </Link>

        <EventSearch
          handleChange={handleChange}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        ></EventSearch>
      </Flex>
      <EventList events={matchedEvents} categories={categories}></EventList>
    </div>
  );
};
