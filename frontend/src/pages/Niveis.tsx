import { Container, Heading, Text } from "@chakra-ui/react";
import NivelTable from "../components/NivelComponents/NivelTable";

function Niveis() {
  return (
    <>
      <Container maxW="container.lg">
        <Heading size="lg" mb={4}>
          Niveis
        </Heading>
        <NivelTable />
        <Text mt={4}></Text>
      </Container>
    </>
  );
}

export default Niveis;
