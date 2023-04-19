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
import { useState } from "react";

export default function EditDevModal({ devId }: { devId: number }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [newNome, setNewNome] = useState("");
  const [newSexo, setNewSexo] = useState("");
  const [newDataNascimento, setNewDataNascimento] = useState("");
  const [newIdade, setNewIdade] = useState("");
  const [newHobby, setNewHobby] = useState("");
  const [newNivel, setNewNivel] = useState("");

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
            nivel: newNivel,
          }),
        }
      );
      if (response.ok) {
        console.log(response);
        toast({
          title: "Nivel alterado.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      } else {
        throw new Error("Failed to update nivel");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao alterar nivel.",
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
          title: "Nivel excluido.",
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
        title: "Erro ao excluir nivel.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen} size="sm">
        Visualizar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
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
                onChange={(e) => setNewIdade(e.target.value)}
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
                {/* {niveis.map((nivel) => (
        <option key={nivel.id} value={nivel.id}>
          {nivel.descricao}
        </option>))} */}
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
