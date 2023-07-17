import React from "react";
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Image,
  IconButton,
  Divider,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
} from "@chakra-ui/react";

export const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      width="100vw"
      display="inline-flex"
      padding={{ base: "1rem", sm: "1rem", md: "1rem 2rem" }}
      alignItems="center"
      justifyContent="space-between"
      maxH="100px"
      borderBottom="1px solid"
      borderColor="blackAlpha.200"
    >
      <Box>
        <Link to="/">
          <Image
            width="100px"
            borderRadius="5px"
            backgroundColor="blackAlpha.700"
            src="../../images/svg_logo_logo.png"
            alt="logo"
          />
        </Link>
      </Box>
      <Flex
        color="blackAlpha.900"
        fontWeight="bolder"
        dir="column"
        margin="10px"
        gap="1rem"
        display={{ base: "none", sm: "flex" }}
      >
        <Link to="/">Events</Link>
        <Link to="/createEvent">Create Event</Link>
      </Flex>
      <IconButton
        aria-label="Open Menu"
        icon={<HamburgerIcon />}
        display={{ base: "flex", sm: "none" }}
        onClick={onOpen}
      ></IconButton>
      <Drawer onClose={onClose} isOpen={isOpen} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Flex
              flexDir="column"
              alignItems="center"
              justifyContent="space-between"
              height="100%"
            >
              <Flex
                marginTop="1rem"
                flexDir="column"
                alignItems="center"
                gap="1rem"
                fontSize="xx-large"
              >
                <Link to="/" onClick={onClose}>
                  Events
                </Link>
                <Divider />

                <Link to="/createEvent" onClick={onClose}>
                  Create Event
                </Link>
              </Flex>
              <Flex justifyContent="center" marginBottom="1rem">
                <IconButton
                  size="md"
                  onClick={onClose}
                  icon={<CloseIcon fontSize="xs" />}
                  borderRadius={5}
                  width={100}
                />
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
