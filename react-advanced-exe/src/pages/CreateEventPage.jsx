import { useState, useContext } from "react";
import {
  Flex,
  Input,
  Button,
  FormLabel,
  Select,
  Checkbox,
  Stack,
  useToast,
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
    <Flex className="new-event" justify="center">
      <form onSubmit={handleSubmit} id="new-event-form" name="new-event-form">
        <FormLabel htmlFor="createdBy">Event creator:</FormLabel>
        <Select id="createdBy" name="createdBy">
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Select>

        <FormLabel htmlFor="title">Title:</FormLabel>
        <Input type="text" id="title" name="title" required />

        <FormLabel htmlFor="description">Description:</FormLabel>
        <Input type="text" id="description" name="description" required />

        <FormLabel htmlFor="image">Image URL:</FormLabel>
        <Input
          type="text"
          id="image"
          name="image"
          required
          defaultValue="https://i.pinimg.com/736x/3d/2f/af/3d2faf4e3188d34a9fcdc00df59e77b0.jpg"
        />

        <FormLabel htmlFor="categoryIds">Categories:</FormLabel>
        <Stack
          spacing={5}
          direction="row"
          name="categoryIds"
          id="categoryIds"
          required
        >
          {categories.map((cat) => (
            <Checkbox
              key={cat.id}
              value={cat.id}
              onChange={(e) => handleCategoryChange(e, cat.id)}
              isChecked={selectedCategories.includes(cat.id)}
            >
              {cat.name}
            </Checkbox>
          ))}
        </Stack>

        <FormLabel htmlFor="location">Location:</FormLabel>
        <Input type="text" id="location" name="location" required />

        <FormLabel htmlFor="startTime">Start Time:</FormLabel>
        <Input
          type="datetime-local"
          id="startTime"
          name="startTime"
          required
          defaultValue={getCurrentTime()}
        />

        <FormLabel htmlFor="endTime">End Time:</FormLabel>
        <Input
          type="datetime-local"
          id="endTime"
          name="endTime"
          required
          defaultValue={getCurrentTime()}
        />

        {isLoading === "true" ? (
          <Button type="submit" isLoading>
            Create Event
          </Button>
        ) : (
          <Button type="submit">Create Event</Button>
        )}
      </form>
    </Flex>
  );
};
