import { Card, Text, Image, Flex, HStack, Tag, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";

export const EventItem = ({ event, categories }) => {
  const { scrollToTop } = useContext(MyContext);
  // startTime and endTime to a readable string
  const startDateTime = new Date(event.startTime);
  const endDateTime = new Date(event.endTime);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const startTimeString = startDateTime.toLocaleString("en-US", options);
  const endTimeString = endDateTime.toLocaleString("en-US", options);

  // Return the category names for the event
  const eventCategoryNames = event.categoryIds.map((categoryId) => {
    const matchingCategory = categories.find(
      (category) => category.id === categoryId
    );
    return matchingCategory ? matchingCategory.name : "";
  });

  return (
    <Link to={`/event/${event.id}`} onClick={scrollToTop}>
      <Card
        h="500px"
        w={{
          base: "clamp(300px, 98vw, 400px)",
          sm: "400px",
          md: "400px",
        }}
        border="1px solid hsl(219, 29%, 14%)"
        backgroundColor="white"
        borderRadius="sm"
        shadow="lg"
        cursor="pointer"
        overflow="hidden"
        _hover={{
          "& > div > div > img": {
            transform: "scale(1.05)",
            transition: "transform 0.4s ease",
          },
        }}
      >
        <Box position="relative" w="100%" h="100%">
          <Box w="100%" h="50%" overflow="hidden">
            <Image
              w="100%"
              h="100%"
              objectFit="cover"
              src={event.image}
              alt={event.title}
            />
          </Box>

          <Flex
            borderTop="1px solid hsl(219, 29%, 14%)"
            flexDir="column"
            padding="1.2rem 1.4rem"
            fontFamily="sans-serif"
            w="100%"
            h="50%"
          >
            <Box fontFamily="Proxima Nova">
              <Text fontSize="1.3rem" textTransform="uppercase">
                {event.title}
              </Text>
              <Text fontSize="1rem">{event.description}</Text>
            </Box>

            <Box
              position="absolute"
              bottom="1.2rem"
              borderLeft="1px solid hsl(219, 29%, 14%)"
              paddingLeft="8px"
            >
              <Text color="gray.600" fontSize="12px">
                Start time:
              </Text>
              <Text>{startTimeString}</Text>
              <Text color="gray.600" fontSize="12px">
                End time:
              </Text>
              <Text fontWeight="">{endTimeString}</Text>
            </Box>
          </Flex>

          {event.categoryIds[0] !== null ? (
            <Box position="absolute" top="8px" left="8px">
              <HStack spacing={4}>
                {eventCategoryNames.map((categoryName) => (
                  <Tag
                    borderRadius="sm"
                    key={categoryName}
                    variant="solid"
                    backgroundColor="hsl(219, 29%, 14%)"
                    border="1px solid white"
                    color="white"
                    fontWeight="extrabold"
                    style={{ textTransform: "capitalize" }}
                  >
                    {categoryName}
                  </Tag>
                ))}
              </HStack>
            </Box>
          ) : (
            <Box display="hidden"></Box>
          )}
        </Box>
      </Card>
    </Link>
  );
};
