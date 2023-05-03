import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function EditDevModal({
  devId,
  devNome,
  devSexo,
  devIdade,
  devHobby,
  devNivel,
}: {
  devId: number;
  devNome: string;
  devSexo: string;
  devIdade: number;
  devHobby: string;
  devNivel: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [newNome, setNewNome] = useState<string>(devNome);
  const [newSexo, setNewSexo] = useState<string>(devSexo);
  const [newDataNascimento, setNewDataNascimento] = useState("");
  const [newIdade, setNewIdade] = useState<number>(devIdade);
  const [newHobby, setNewHobby] = useState<string>(devHobby);
  const [newNivel, setNewNivel] = useState<string>(devNivel);

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/developers/${devId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: newNome,
            sexo: newSexo,
            dataNascimento: newDataNascimento,
            idade: newIdade,
            hobby: newHobby,
            nivel_id: newNivel,
          }),
        }
      );
      if (response.ok) {
        console.log(response);
        toast({
          title: "Desenvolvedor alterado.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      } else {
        throw new Error("Failed to update dev");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao alterar Dev.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/developers/${devId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log(response);
        toast({
          title: "Desenvolvedor excluido.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      } else {
        throw new Error("Failed to delete nivel");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao excluir Dev.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  interface Nivel {
    id: number;
    nivel: string;
  }

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

  return (
    <>
      <Button onClick={onOpen} size="sm">
        Visualizar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(1px)" />
        <ModalContent>
          <ModalHeader>Editar Desenvolvedor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                value={newNome}
                onChange={(e) => setNewNome(e.target.value)}
              />
              <FormLabel>Sexo</FormLabel>
              <Input
                type="text"
                value={newSexo}
                onChange={(e) => setNewSexo(e.target.value)}
              />
              <FormLabel>Data de Nascimento</FormLabel>
              <Input
                type="date"
                value={newDataNascimento}
                onChange={(e) => setNewDataNascimento(e.target.value)}
              />

              <FormLabel>Idade</FormLabel>
              <Input
                type="number"
                value={newIdade}
                onChange={(e) => setNewIdade(parseInt(e.target.value))}
              />

              <FormLabel>Hobby</FormLabel>
              <Input
                type="text"
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
              />
              <FormLabel>Nivel</FormLabel>
              <Select
                value={newNivel}
                onChange={(e) => setNewNivel(e.target.value)}
              >
                {data.map((nivel) => (
                  <option key={nivel.id} value={nivel.id}>
                    {nivel.nivel}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Alterar
            </Button>
            <Button
              colorScheme="red"
              borderColor="red.700"
              variant="outline"
              mr={3}
              onClick={handleDelete}
            >
              Excluir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
