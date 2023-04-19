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
import { useEffect, useState } from "react";
import AddDevModal from "../components/AddDevModal";
import EditDevModal from "../components/EditDevModal";

interface Devs {
  id: number;
  nome: string;
  sexo: string;
  dataNascimento: string;
  idade: number;
  hobby: string;
  nivel: string;
}

function Devs() {
  const [data, setData] = useState<Devs[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/developers");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const [sortBy, setSortBy] = useState<{ key: keyof Devs; ascending: boolean }>(
    { key: "id", ascending: true }
  );

  const sortedData = [...data].sort((a, b) => {
    const compareResult =
      a[sortBy.key] < b[sortBy.key]
        ? -1
        : a[sortBy.key] > b[sortBy.key]
        ? 1
        : 0;
    return sortBy.ascending ? compareResult : -compareResult;
  });

  const handleSort = (key: keyof Devs) => {
    if (sortBy.key === key) {
      setSortBy({ ...sortBy, ascending: !sortBy.ascending });
    } else {
      setSortBy({ key, ascending: true });
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  return (
    <Container maxW="container.lg">
      <Heading size="lg" mb={5}>
        Devs
      </Heading>
      <Table variant="simple" colorScheme="gray">
        <Thead>
          <Tr>
            <Th _hover={{ cursor: "pointer" }} onClick={() => handleSort("id")}>
              ID
            </Th>
            <Th
              _hover={{ cursor: "pointer" }}
              onClick={() => handleSort("nome")}
            >
              Nome
            </Th>
            <Th
              _hover={{ cursor: "pointer" }}
              onClick={() => handleSort("sexo")}
            >
              Sexo
            </Th>
            <Th
              _hover={{ cursor: "pointer" }}
              onClick={() => handleSort("dataNascimento")}
            >
              Data de Nascimento
            </Th>
            <Th
              _hover={{ cursor: "pointer" }}
              onClick={() => handleSort("idade")}
            >
              Idade
            </Th>
            <Th
              _hover={{ cursor: "pointer" }}
              onClick={() => handleSort("hobby")}
            >
              Hobby
            </Th>
            <Th
              _hover={{ cursor: "pointer" }}
              onClick={() => handleSort("nivel")}
            >
              Nivel
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.map((devs) => (
            <Tr key={devs.id}>
              <Td>{devs.id}</Td>
              <Td>{devs.nome}</Td>
              <Td>{devs.sexo}</Td>
              <Td>{devs.dataNascimento}</Td>
              <Td>{devs.idade}</Td>
              <Td>{devs.hobby}</Td>
              <Td>{devs.nivel}</Td>
              <Td>
                <EditDevModal devId={devs.id} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Text mt={4}>
        <AddDevModal />
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

export default Devs;
