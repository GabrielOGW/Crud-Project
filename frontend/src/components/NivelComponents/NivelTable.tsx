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
import AddNivelModal from "../NivelComponents/AddNivelModal";
import DeleteNivelAlert from "./DeleteNivelAlert";
import { Nivel } from "../../interface/interfaces";
import { useEffect, useState } from "react";
import { SortNivelData } from "./SortNivelData";
import { api } from "../../services/api";
import useRefresh from "../../hook/useRefresh";

export default function NivelTable() {
  const [data, setData] = useState<Nivel[]>([]);
  const { sortedItems, handleSort } = SortNivelData(data);
  const [currentPage, setCurrentPage] = useState(0);
  const { refresh, handleRefresh } = useRefresh();
  const itemsPerPage = 4;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedItems.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/nivel");
        const jsonData = response.data;
        setData(jsonData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [refresh]);

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
              onClick={() => handleSort("devs")}
              _hover={{ cursor: "pointer" }}
            >
              Desenvolvedores associados
            </Th>
            <Th></Th>
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
                <EditNivelModal
                  nivelId={nivel.id}
                  nivelName={nivel.nivel}
                  onRefresh={handleRefresh}
                />
              </Td>
              <Td>
                <DeleteNivelAlert
                  nivelId={nivel.id}
                  onRefresh={handleRefresh}
                />
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
            Anterior
          </Button>
          <Button
            isDisabled={endIndex >= sortedItems.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Proximo
          </Button>
        </ButtonGroup>
      </Box>
      <AddNivelModal onRefresh={handleRefresh} />
    </>
  );
}
