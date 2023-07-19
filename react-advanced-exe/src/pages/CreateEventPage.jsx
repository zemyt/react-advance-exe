import { useState, useContext } from "react";
import {
  Flex,
  Box,
  Input,
  Button,
  FormLabel,
  Select,
  Checkbox,
  Stack,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { MyContext } from "../context/MyContext";

export const CreateEventPage = () => {
  const { getCurrentTime, categories, users } = useContext(MyContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState("false");
  const toast = useToast();

  const handleCategoryChange = (event, categoryId) => {
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.target));
    formData.createdBy = Number(formData.createdBy);

    // checks if startTime is before endTime
    const startTime = new Date(formData.startTime);
    const endTime = new Date(formData.endTime);
    if (startTime >= endTime) {
      toast({
        title: "Error",
        description: "End time must be after start time.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/events`, {
        method: "POST",
        body: JSON.stringify({ ...formData, categoryIds: selectedCategories }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to create event.");
      }

      if (response.ok) {
        toast({
          title: "Event Created",
          description: "Event has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }

      const data = await response.json();
      setIsLoading("true");
      setTimeout(() => {
        window.location.href = `/event/${data.id}`;
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

  return (
    <Flex
      minH="100vh"
      justify="center"
      backgroundImage="https://i.pinimg.com/736x/3d/2f/af/3d2faf4e3188d34a9fcdc00df59e77b0.jpg"
    >
      <Box
        m={{ base: "2rem", md: "3rem" }}
        mb={{ baser: "2rem", md: "5rem" }}
        className="new-event"
        padding="2rem"
        w={{ base: "90%", md: "750px" }}
        h="fit-content"
        backgroundColor="white"
        borderRadius="sm"
      >
        <form onSubmit={handleSubmit} id="new-event-form" name="new-event-form">
          <Heading textAlign="center" fontFamily="Proxima Nova">
            Create Event
          </Heading>
          <FormLabel htmlFor="title" paddingTop="0.25rem">
            Title:
          </FormLabel>
          <Input type="text" id="title" name="title" required />

          <FormLabel htmlFor="description" paddingTop="0.25rem">
            Description:
          </FormLabel>
          <Input type="text" id="description" name="description" required />

          <FormLabel htmlFor="location" paddingTop="0.25rem">
            Location:
          </FormLabel>
          <Input type="text" id="location" name="location" required />

          <FormLabel htmlFor="image" paddingTop="0.25rem">
            Image URL:
          </FormLabel>
          <Input
            type="text"
            id="image"
            name="image"
            required
            defaultValue="https://i.pinimg.com/736x/3d/2f/af/3d2faf4e3188d34a9fcdc00df59e77b0.jpg"
          />

          <FormLabel paddingTop="0.25rem">Categories:</FormLabel>
          <Stack spacing={5} direction="row">
            {categories.map((cat) => (
              <Checkbox
                id={cat.id}
                name="categoryIds"
                key={cat.id}
                value={cat.id}
                onChange={(e) => handleCategoryChange(e, cat.id)}
                isChecked={selectedCategories.includes(cat.id)}
              >
                {cat.name}
              </Checkbox>
            ))}
            2
          </Stack>

          <FormLabel htmlFor="createdBy" paddingTop="0.25rem">
            Event creator:
          </FormLabel>
          <Select id="createdBy" name="createdBy">
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>

          <Flex
            display={{ base: "block", md: "flex" }}
            justify={{ base: "flex-start", md: "space-between" }}
            gap={{ base: "0", md: "2rem" }}
          >
            <Box>
              <FormLabel htmlFor="startTime" paddingTop="0.25rem">
                Start Time:
              </FormLabel>
              <Input
                type="datetime-local"
                id="startTime"
                name="startTime"
                required
                defaultValue={getCurrentTime()}
              />
            </Box>

            <Box>
              <FormLabel htmlFor="endTime" paddingTop="0.25rem">
                End Time:
              </FormLabel>
              <Input
                type="datetime-local"
                id="endTime"
                name="endTime"
                required
                defaultValue={getCurrentTime()}
              />
            </Box>
          </Flex>

          <Flex justify="center" paddingTop="1rem">
            {isLoading === "true" ? (
              <Button type="submit" borderRadius="sm" isLoading>
                Create Event
              </Button>
            ) : (
              <Button type="submit" borderRadius="sm">
                Create Event
              </Button>
            )}
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};
