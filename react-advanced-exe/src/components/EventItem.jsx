import { Card, Text, Image, Flex, HStack, Tag, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const EventItem = ({ event, categories }) => {
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
    <Link to={`/event/${event.id}`}>
      <Card
        margin="5px"
        h="500px"
        w={{
          base: "370px",
          sm: "450px",
          md: "500px",
        }}
        backgroundColor="white"
        borderRadius="sm"
        borderColor="transparent"
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
              borderRadius="sm"
              objectFit="cover"
              src={event.image}
              alt={event.title}
            />
          </Box>

          <Flex
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

            <Box position="absolute" bottom="1.2rem">
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
                    colorScheme="red"
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
