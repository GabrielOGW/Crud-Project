import { Container, Heading, Text } from "@chakra-ui/react";
import AddNivelModal from "../components/NivelComponents/AddNivelModal";
import NivelTable from "../components/NivelComponents/NivelTable";

function Niveis() {
  return (
    <>
      <Container maxW="container.lg">
        <Heading size="lg" mb={4}>
          Niveis
        </Heading>
        <NivelTable />
        <Text mt={4}>
          <AddNivelModal />
        </Text>
      </Container>
    </>
  );
}

export default Niveis;
