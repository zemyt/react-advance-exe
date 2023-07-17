import { InputRightElement, Input, Select, InputGroup } from "@chakra-ui/react";

export const EventSearch = ({ handleChange, setSearchValue, searchValue }) => {
  return (
    <>
      {/* search field */}
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
          >
            <option value="all">All</option>
            <option value="sports">Sports</option>
            <option value="games">Games</option>
          </Select>
        </InputRightElement>
      </InputGroup>

      {/* <Box marginLeft="10px" marginRight="10px" justify="center">
        <Select
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        >
          <option value="all">All</option>
          <option value="sports">Sports</option>
          <option value="games">Games</option>
        </Select>
      </Box> */}
    </>
  );
};

{
  /* <Box marginLeft="10px" marginRight="10px" justify="center">
  <Select value={searchValue} onChange={(e) => setSearchValue(e.target.value)}>
    <option value="all">All</option>
    <option value="sports">Sports</option>
    <option value="games">Games</option>
  </Select>
</Box>; */
}

{
  /* <RadioGroup  value={searchValue}>
<Wrap marginLeft="10px" marginRight="10px" justify="center">
  <Radio value="all">All</Radio>
  <Radio value="sports">Sports</Radio>
  <Radio value="games">Games</Radio>
</Wrap>
</RadioGroup> */
}
