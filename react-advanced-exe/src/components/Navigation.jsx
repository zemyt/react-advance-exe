import React from "react";
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
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
      className="navbar"
      width="100vw"
      display="inline-flex"
      alignItems="center"
      justifyContent="space-between"
      maxH="100px"
      borderBottom="1px solid black"
      backgroundColor="hsl(219, 29%, 14%)"
      padding="1rem 5% 1rem"
    >
      <Box className="nav-logo">
        <Link to="/">
          <Image
            width="100px"
            borderRadius="sm"
            src="../../images/svg_logo_logo.png"
            alt="logo"
          />
        </Link>
      </Box>
      <Flex
        className="nav-links"
        color="white"
        fontWeight="bolder"
        dir="column"
        margin="10px"
        gap="1rem"
        display={{ base: "none", sm: "flex" }}
      >
        <Link to="/">
          <Text
            paddingRight="1rem"
            borderRight="1px solid white"
            _hover={{
              color: "rgba(242, 242, 242, 0.75)",
              transition: "all 0.4s ease 0s",
            }}
          >
            Events
          </Text>
        </Link>
        <Link to="/createEvent">
          <Text
            _hover={{
              color: "rgba(242, 242, 242, 0.75)",
              transition: "all 0.4s ease 0s",
            }}
          >
            Create Event
          </Text>
        </Link>
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
