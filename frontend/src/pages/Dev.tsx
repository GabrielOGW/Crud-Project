import { Container, Heading, Text } from "@chakra-ui/react";
import AddDevModal from "../components/AddDevModal";
import DevTable from "../components/DevTable";

function Dev() {
  return (
    <>
      <Container maxW="container.lg">
        <Heading size="lg" mb={5}>
          Devs
        </Heading>
        <DevTable />
        <Text mt={4}>
          <AddDevModal />
        </Text>
      </Container>
    </>
  );
}

export default Dev;