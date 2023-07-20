import {
  FormLabel,
  Stack,
  Input,
  Checkbox,
  Button,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "../context/MyContext";

export const EditEventForm = ({ event, closeModal }) => {
  const { categories } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState("false");
  const toast = useToast();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleCategoryChange = (event, categoryId) => {
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    }
  };

  // Sets the selected categories
  useEffect(() => {
    setSelectedCategories(event.categoryIds);
  }, []);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));
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
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...formData,
          createdBy: event.createdBy,
          categoryIds: selectedCategories,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to Edit event. ${response.message}`);
      }

      if (response.ok) {
        toast({
          title: "Event edited",
          description: "Event has been edited successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }

      setIsLoading("true");
      const data = await response.json();

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
    <form onSubmit={handleEditSubmit}>
      <FormLabel htmlFor="title">Title:</FormLabel>
      <Input
        type="text"
        id="title"
        name="title"
        required
        defaultValue={event.title}
      />

      <FormLabel htmlFor="description" paddingTop="0.25rem">
        Description:
      </FormLabel>
      <Input
        type="text"
        id="description"
        name="description"
        required
        defaultValue={event.description}
      />

      <FormLabel htmlFor="image" paddingTop="0.25rem">
        Image URL:
      </FormLabel>
      <Input
        type="text"
        id="image"
        name="image"
        required
        defaultValue={event.image}
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
      </Stack>

      <FormLabel htmlFor="location" paddingTop="0.25rem">
        Location:
      </FormLabel>
      <Input
        type="text"
        id="location"
        name="location"
        required
        defaultValue={event.location}
      />

      <FormLabel htmlFor="startTime" paddingTop="0.25rem">
        Start Time:
      </FormLabel>
      <Input
        type="datetime-local"
        id="startTime"
        name="startTime"
        required
        defaultValue={event.startTime}
      />

      <FormLabel htmlFor="endTime" paddingTop="0.25rem">
        End Time:
      </FormLabel>
      <Input
        type="datetime-local"
        id="endTime"
        name="endTime"
        required
        defaultValue={event.endTime}
      />

      <ButtonGroup
        paddingTop="1rem"
        variant="outline"
        spacing="6"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {isLoading === "true" ? (
          <>
            <Button colorScheme="red" variant="solid" isLoading>
              Return
            </Button>
            <Button type="submit" variant="solid" isLoading>
              Edit Event
            </Button>
          </>
        ) : (
          <>
            <Button colorScheme="red" variant="solid" onClick={closeModal}>
              Return
            </Button>
            <Button type="submit" variant="solid">
              Edit Event
            </Button>
          </>
        )}
      </ButtonGroup>
    </form>
  );
};
