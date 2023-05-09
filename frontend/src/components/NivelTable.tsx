import {
  Box,
  Button,
  ButtonGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import EditNivelModal from "./EditNivelModal";
import { Nivel } from "../interface/interfaces";
import { useEffect, useState } from "react";

export default function NivelTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const [data, setData] = useState<Nivel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/nivel");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const [sortBy, setSortBy] = useState<{
    key: keyof Nivel;
    ascending: boolean;
  }>({ key: "id", ascending: true });

  const sortedData = [...data].sort((a, b) => {
    const compareResult =
      a[sortBy.key] < b[sortBy.key]
        ? -1
        : a[sortBy.key] > b[sortBy.key]
        ? 1
        : 0;
    return sortBy.ascending ? compareResult : -compareResult;
  });

  const handleSort = (key: keyof Nivel) => {
    if (sortBy.key === key) {
      setSortBy({ ...sortBy, ascending: !sortBy.ascending });
    } else {
      setSortBy({ key, ascending: true });
    }
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  return (
    <>
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
            <Th
              onClick={() => handleSort("nivel")}
              _hover={{ cursor: "pointer" }}
            >
              Desenvolvedores associados
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.map((nivel) => (
            <Tr key={nivel.id}>
              <Td>{nivel.id}</Td>
              <Td>{nivel.nivel}</Td>
              <Td>{nivel.devs.length}</Td>
              <Td>
                <EditNivelModal nivelId={nivel.id} nivelName={nivel.nivel} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
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
    </>
  );
}
