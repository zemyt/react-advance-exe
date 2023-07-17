import { InputRightElement, Input, Select, InputGroup } from "@chakra-ui/react";

export const EventSearch = ({ handleChange, setSearchValue, searchValue }) => {
  return (
    <>
      {/* Input for event search field */}
      <InputGroup
        marginTop="1rem"
        position="relative"
        maxW={{ base: "80%", sm: "400px" }}
      >
        <Input
          size="lg"
          variant="outline"
          placeholder="Search for event..."
          backgroundColor="white"
          onChange={handleChange}
          borderRadius="sm"
          shadow="lg"
        />
        <InputRightElement
          width={{ base: "2rem", sm: "auto" }}
          pointerEvents="auto"
          position="absolute"
          right={{ base: "22px", sm: "4px" }}
          top="50%"
          transform="translateY(-50%)"
        >
          <Select
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            backgroundColor="white"
            borderRadius="sm"
          >
            <option value="all">All</option>
            <option value="sports">Sports</option>
            <option value="games">Games</option>
          </Select>
        </InputRightElement>
      </InputGroup>
    </>
  );
};
