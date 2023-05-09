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
import EditDevModal from "./EditDevModal";
import { Devs } from "../interface/interfaces";
import { useEffect, useState } from "react";
import { useSortableData } from "./sortData";

export default function DevTable() {
  const [data, setData] = useState<Devs[]>([]);
  const { sortedItems, handleSort } = useSortableData(data);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedItems.slice(startIndex, endIndex);

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

  return (
    <>
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
              onClick={() => handleSort("nivel_id")}
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
              <Td>{devs.nivel_id}</Td>
              <Td>
                <EditDevModal
                  devId={devs.id}
                  devNome={devs.nome}
                  devSexo={devs.sexo}
                  devHobby={devs.hobby}
                  devNivel={devs.nivel_id}
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
            Previous
          </Button>
          <Button
            isDisabled={endIndex >= sortedItems.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
}
