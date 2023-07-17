import { React } from "react";
import { EditEventForm } from "../components/EditEventForm";
import {
  Flex,
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

  const { event, error } = useLoaderData();
  const toast = useToast();

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
    <Flex justify="center" marginTop="1.6rem">
      <Card
        h={{ base: "650px", sm: "650px", md: "650px", lg: "650px" }}
        w={{ base: "100%", sm: "100%", md: "100%", lg: "1000px" }}
        backgroundColor="white"
        borderRadius={{ base: "0px", lg: "lg" }}
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
          padding="32px 26px"
          fontFamily="sans-serif"
          backgroundColor="white"
          transition="width 0.3s ease, right 0.3s ease"
        >
          <Box>
            <Text fontSize="1.5rem" fontWeight="bolder" fontFamily="Caslon">
              {event.title}
            </Text>
            <Text color="gray.500">{event.description}</Text>
          </Box>
        </Box>
        <Button
          position="absolute"
          bottom="1rem"
          left="1rem"
          onClick={openFirstModal}
        >
          Actions
        </Button>
      </Card>

      {/* First Modal */}
      <Modal isOpen={isFirstModalOpen} onClose={closeFirstModal}>
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent top="10rem">
          <ModalHeader paddingTop="2rem" paddingBottom="5rem">
            What would you like to do?
          </ModalHeader>
          <ModalCloseButton paddingTop="2rem" />
          <ModalFooter
            style={{ display: "flex", justifyContent: "space-between" }}
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
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent top="10rem">
          <ModalHeader paddingTop="2rem">Delete Event</ModalHeader>
          <ModalCloseButton paddingTop="2rem" />
          <ModalBody paddingBottom="2rem">
            Are you sure you want to delete this event?
          </ModalBody>

          <ModalFooter
            style={{ display: "flex", justifyContent: "space-between" }}
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
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent>
          <ModalHeader paddingTop="2rem">Edit Event</ModalHeader>
          <ModalCloseButton paddingTop="2rem" />
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
