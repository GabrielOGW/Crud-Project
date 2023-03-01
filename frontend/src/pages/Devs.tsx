import {
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
import AddDevModal from "../components/AddDevModal";
import EditDevModal from "../components/EditDevModal";

interface Devs {
  id: number;
  nome: string;
  sexo: string;
  data_nascimento: string;
  idade: number;
  hobby: string;
  nivel: string;
}

function Devs() {

  const data: Devs[] = [
    {
      id: 1,
      nome: "John",
      sexo: "masc",
      data_nascimento: "18/02/1998",
      idade: 25,
      hobby: "Jogar Bola",
      nivel: "senior a",
    },
    {
      id: 2,
      nome: "Jane",
      sexo: "masc",
      data_nascimento: "18/02/1997",
      idade: 26,
      hobby: "Assistir Filmes",
      nivel: "pleno b",
    },
    {
      id: 3,
      nome: "Bob",
      sexo: "masc",
      data_nascimento: "18/02/1996",
      idade: 27,
      hobby: "Jogar videogame",
      nivel: "junior a",
    },
    {
      id: 6,
      nome: "Maria",
      sexo: "fem",
      data_nascimento: "12/05/1990",
      idade: 32,
      hobby: "Ler",
      nivel: "senior b",
    },
    {
      id: 5,
      nome: "David",
      sexo: "masc",
      data_nascimento: "03/11/1985",
      idade: 37,
      hobby: "Cozinhar",
      nivel: "Junior b",
    },
    {
      id: 4,
      nome: "Ana",
      sexo: "fem",
      data_nascimento: "22/07/2001",
      idade: 21,
      hobby: "Dançar",
      nivel: "Junior c",
    },
    {
      id: 8,
      nome: "Pedro",
      sexo: "masc",
      data_nascimento: "14/09/1995",
      idade: 27,
      hobby: "Tocar Violão",
      nivel: "Junior a",
    },
    {
      id: 7,
      nome: "Carla",
      sexo: "fem",
      data_nascimento: "07/03/1989",
      idade: 33,
      hobby: "Fotografia",
      nivel: "Pleno c",
    },
  ];

  return (
    <Container maxW="container.lg">
      <Heading size="lg" mb={5}>
        Devs
      </Heading>
      <Table variant="simple" colorScheme="gray">
        <Thead>
          <Tr>
            <Th _hover={{ cursor: "pointer" }}>ID</Th>
            <Th _hover={{ cursor: "pointer" }}>Nome</Th>
            <Th _hover={{ cursor: "pointer" }}>Sexo</Th>
            <Th _hover={{ cursor: "pointer" }}>Data de Nascimento</Th>
            <Th _hover={{ cursor: "pointer" }}>Idade</Th>
            <Th _hover={{ cursor: "pointer" }}>Hobby</Th>
            <Th _hover={{ cursor: "pointer" }}>Nivel</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((dev) => (
            <Tr key={dev.id}>
              <Td>{dev.id}</Td>
              <Td>{dev.nome}</Td>
              <Td>{dev.sexo}</Td>
              <Td>{dev.data_nascimento}</Td>
              <Td>{dev.idade}</Td>
              <Td>{dev.hobby}</Td>
              <Td>{dev.nivel}</Td>
              <Td>
                <EditDevModal />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Text mt={4}>
        <AddDevModal />
      </Text>
    </Container>
  );
}

export default Devs;
