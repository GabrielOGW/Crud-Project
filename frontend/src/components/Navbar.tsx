import { Box, Flex, Link, useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Link as RouterLink, Outlet } from "react-router-dom";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={4}
        bg={isDarkMode ? "gray.700" : "gray.200"}
        color={isDarkMode ? "white" : "black"}
      >
        <Flex align="center">
          <Link as={RouterLink} to={`/pages/Devs.tsx`} mr={8}>
            Devs
          </Link>
          <Link as={RouterLink} to={`/pages/Niveis.tsx`} mr={8}>
            Niveis
          </Link>
          <Link as={RouterLink} to={`/pages/About.tsx`} mr={8}>
            Sobre
          </Link>
        </Flex>
        <Box>
          <IconButton
            aria-label="Toggle dark mode"
            icon={isDarkMode ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            mr={4}
          />
        </Box>
      </Flex>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Navbar;
