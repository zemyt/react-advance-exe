import { React, useContext, useEffect, useState } from "react";
import { EditEventForm } from "../components/EditEventForm";
import {
  Flex,
  HStack,
  Tag,
  Card,
  Box,
  Text,
  Image,
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { MyContext } from "../context/MyContext";
// Form, redirect

export const loader = async ({ params }) => {
  try {
    const event = await fetch(`http://localhost:3000/events/${params.id}`);
    if (!event.ok) {
      throw new Error("Failed to fetch event data.");
    }
    return { event: await event.json() };
  } catch (error) {
    return { error: error.message };
  }
};

export const EventPage = () => {
  const { users, categories } = useContext(MyContext);
  const { event, error } = useLoaderData();
  const [eventCreator, setEventCreator] = useState(null);
  const toast = useToast();
  const {
    isOpen: isFirstModalOpen,
    onOpen: openFirstModal,
    onClose: closeFirstModal,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
  } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: openEditModal,
    onClose: closeEditModal,
  } = useDisclosure();

  // Gets the creator of the event
  useEffect(() => {
    const findEventCreator = async () => {
      const creator = users.find((user) => user.id === event.createdBy);
      if (creator) {
        setEventCreator(creator);
      }
    };

    findEventCreator();
  }, [users, event]);
  if (!eventCreator) {
    return null;
  }

  // Return the category names for the event
  const eventCategoryNames = event.categoryIds.map((categoryId) => {
    const matchingCategory = categories.find(
      (category) => category.id === categoryId
    );
    return matchingCategory ? matchingCategory.name : "";
  });

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

  const handleDeleteSubmit = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to create event.");
      }
      if (response.ok) {
        toast({
          title: "Event deleted",
          description: "Event has been deleted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      setTimeout(() => {
        window.location.href = `/`;
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (error) {
    return <div>{error}</div>;
  }
  if (!event) {
    return null;
  }

  return (
    <Flex
      justify="center"
      paddingTop="5rem"
      backgroundColor="rgb(238, 242, 247)"
      minH="100vh"
    >
      <Card
        h={{ base: "650px", sm: "650px", md: "650px", lg: "650px" }}
        w={{ base: "100%", sm: "100%", md: "100%", lg: "1000px" }}
        backgroundColor="white"
        borderRadius={{ base: "0px", lg: "sm" }}
        borderColor="transparent"
        shadow="lg"
        overflow="hidden"
      >
        <Image
          position="absolute"
          zIndex={0}
          w="100%"
          h="100%"
          objectFit="cover"
          src={event.image}
          alt={event.title}
        />

        <Box
          position="absolute"
          top="50px"
          right={{
            base: "clamp(20px, 35px, 50px)",
            sm: "clamp(20px, 50px, 50px)",
            md: "clamp(50px, 50px, 70px)",
            lg: "50px",
          }}
          zIndex={1}
          h="60%"
          w={{
            base: "clamp(50%, 80%, 600px)",
            sm: "clamp(50%, 80%, 600px)",
            md: "clamp(50%, 600px, 600px)",
            lg: "600px",
          }}
          padding="2rem 1.6rem"
          fontFamily="sans-serif"
          backgroundColor="whiteAlpha.800"
          borderRadius="sm"
          transition="width 0.3s ease, right 0.3s ease"
        >
          <Box fontFamily="Proxima Nova">
            <Text fontSize="2rem" textTransform="uppercase">
              {event.title}
            </Text>
            <Text fontSize="1.2rem" paddingTop="1rem">
              {event.description}
            </Text>
          </Box>

          <Box position="absolute" bottom="2rem">
            <Text color="gray.600" fontSize="12px">
              Location:
            </Text>
            <Text>{event.location}</Text>

            <Text color="gray.600" fontSize="12px">
              Start time:
            </Text>
            <Text>{startTimeString}</Text>
            <Text color="gray.600" fontSize="12px">
              End time:
            </Text>
            <Text fontWeight="">{endTimeString}</Text>
          </Box>
        </Box>

        {/* User that created event box */}
        <Flex
          className="event-creator"
          position="absolute"
          right="1rem"
          bottom="1rem"
          backgroundColor="whiteAlpha.800"
          padding="0.8rem"
          borderRadius="sm"
        >
          <Flex flexDir="column" justifyContent="center" paddingRight="0.8rem">
            <Text color="gray.600" fontSize="12px">
              Created by:
            </Text>
            <Text fontWeight="bold">{eventCreator.name}</Text>
          </Flex>
          <Image
            src={eventCreator.image}
            alt={eventCreator.name}
            w="50px"
            h="50px"
            borderRadius="50"
            border="1px solid black"
          ></Image>
        </Flex>

        {/* Action button */}
        <Button
          borderRadius="sm"
          position="absolute"
          bottom="1rem"
          left="1rem"
          onClick={openFirstModal}
        >
          Actions
        </Button>

        {/* Category tags */}
        {event.categoryIds[0] !== null ? (
          <Box position="absolute" top="1rem" left="1rem">
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
      </Card>

      {/* Modals from action button */}
      {/* First Modal */}
      <Modal
        isOpen={isFirstModalOpen}
        onClose={closeFirstModal}
        size={{ base: "full", sm: "md" }}
      >
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent
          top={{ base: "0", sm: "10rem" }}
          justifyContent={{ base: "space-around" }}
        >
          <ModalHeader paddingBottom="5rem" paddingTop="2rem">
            What would you like to do?
          </ModalHeader>
          <ModalCloseButton />
          <ModalFooter
            gap={16}
            display={{ base: "flex", sm: "flex" }}
            flexDir={{ base: "column-reverse", sm: "row" }}
          >
            <Button colorScheme="red" onClick={closeFirstModal}>
              Return
            </Button>
            <Button variant="solid" onClick={openEditModal}>
              Edit Event
            </Button>
            <Button variant="solid" onClick={openDeleteModal}>
              Delete Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Confirm Delete Event Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        size={{ base: "full", sm: "md" }}
      >
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent top={{ base: "0", sm: "10rem" }}>
          <ModalHeader paddingTop="2rem">Delete Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingBottom="2rem">
            Are you sure you want to delete this event?
          </ModalBody>

          <ModalFooter
            display={{ base: "flex", sm: "flex" }}
            flexDir={{ base: "row", sm: "row" }}
            justifyContent="space-between"
          >
            <Button colorScheme="red" onClick={closeDeleteModal}>
              Nope, Go Back
            </Button>

            <Button
              variant="solid"
              onClick={() => handleDeleteSubmit(event.id)}
            >
              Yes, Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Event Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        size={{ base: "full", sm: "md" }}
      >
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent>
          <ModalHeader paddingTop="2rem">Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingBottom="2rem">
            <EditEventForm
              event={event}
              closeModal={closeEditModal}
            ></EditEventForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

// The event page shows the following details:  title, description, image, startTime, endTime, categories and by who it’s created (display their name and image).
