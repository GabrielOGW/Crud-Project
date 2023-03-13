import { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import AddNivelModal from "../components/AddNivelModal";
import EditNivelModal from "../components/EditNivelModal";

interface Nivel {
  id: number;
  nivel: string;
}

function Niveis() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const [sortingCriteria, setSortingCriteria] = useState<keyof Nivel | null>(
    null
  );
  const [sortingDirection, setSortingDirection] = useState(1);

  const data: Nivel[] = [
    { id: 1, nivel: "senior a" },
    { id: 2, nivel: "pleno a" },
    { id: 3, nivel: "junior a" },
    { id: 5, nivel: "pleno b" },
    { id: 6, nivel: "junior b" },
    { id: 7, nivel: "senior c" },
    { id: 4, nivel: "senior b" },
    { id: 8, nivel: "pleno c" },
    { id: 9, nivel: "junior c" },
  ];

  const handleSort = (criteria: keyof Nivel) => {
    if (sortingCriteria === criteria) {
      setSortingDirection(sortingDirection * -1);
    } else {
      setSortingCriteria(criteria);
      setSortingDirection(1);
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortingCriteria === "id") {
      return (a.id - b.id) * sortingDirection;
    } else if (sortingCriteria === "nivel") {
      return a.nivel.localeCompare(b.nivel) * sortingDirection;
    }
    return 0;
  });

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  return (
    <Container maxW="container.lg">
      <Heading size="lg" mb={4}>
        Niveis
      </Heading>
      <Table variant="simple" colorScheme="gray">
        <Thead>
          <Tr>
            <Th onClick={() => handleSort("id")} _hover={{ cursor: "pointer" }}>
              ID
            </Th>
            <Th
              onClick={() => handleSort("nivel")}
              _hover={{ cursor: "pointer" }}
            >
              Nivel
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.map((nivel) => (
            <Tr key={nivel.id}>
              <Td>{nivel.id}</Td>
              <Td>{nivel.nivel}</Td>
              <Td>
                <EditNivelModal />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Text mt={4}>
        <AddNivelModal />
      </Text>
      <Box display="flex" justifyContent="center" mt={4}>
        <ButtonGroup variant="outline" size="sm">
          <Button
            isDisabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            isDisabled={endIndex >= sortedData.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
}

export default Niveis;
