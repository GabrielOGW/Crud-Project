import { Container, Heading, Text } from "@chakra-ui/react";
import DevTable from "../components/DevComponents/DevTable";

function Dev() {
  return (
    <>
      <Container maxW="container.lg">
        <Heading size="lg" mb={5}>
          Devs
        </Heading>
        <DevTable />
        <Text mt={4}></Text>
      </Container>
    </>
  );
}

export default Dev;
