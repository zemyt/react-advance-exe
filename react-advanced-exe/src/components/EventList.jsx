import { EventItem } from "./EventItem";
import { Flex } from "@chakra-ui/react";

export const EventList = ({ events, categories }) => {
  return (
    <Flex
      paddingTop="2rem"
      flexWrap="wrap"
      justify="center"
      align="center"
      gap="1rem"
    >
      {events.map((event) => (
        <EventItem key={event.id} event={event} categories={categories} />
      ))}
    </Flex>
  );
};
