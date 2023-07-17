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
        h="500px"
        w={{
          base: "300px",
          sm: "450px",
          md: "500px",
        }}
        backgroundColor="white"
        borderRadius="lg"
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
              borderTopRadius="lg"
              objectFit="cover"
              src={event.image}
              alt={event.title}
            />
          </Box>

          <Flex
            flexDir="column"
            padding="32px 26px"
            fontFamily="sans-serif"
            w="100%"
            h="50%"
          >
            <Box>
              <Text fontSize="1.5rem" fontWeight="bolder" fontFamily="Caslon">
                {event.title}
              </Text>
              <Text color="gray.500">{event.description}</Text>
            </Box>

            <Box mt="auto">
              <Text fontSize="sm">Start Time: {startTimeString}</Text>
              <Text fontSize="sm">End Time: {endTimeString}</Text>
            </Box>
          </Flex>

          {event.categoryIds[0] !== null ? (
            <Box position="absolute" top="8px" left="8px">
              <HStack spacing={4}>
                {eventCategoryNames.map((categoryName) => (
                  <Tag
                    key={categoryName}
                    variant="solid"
                    colorScheme="red"
                    color="black"
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
