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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

export default function EditNivelModal({ nivelId }: { nivelId: number }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [newNivel, setNewNivel] = useState("");

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/nivel/${nivelId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nivel: newNivel,
        }),
      });
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
      const response = await fetch(`http://localhost:3000/nivel/${nivelId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
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
      <Button onClick={onOpen} size="sm" >
        Visualizar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay /> 
        <ModalContent>
          <ModalHeader>Alterar Nivel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nivel</FormLabel>
              <Input
                type="text"
                value={newNivel}
                onChange={(e) => setNewNivel(e.target.value)}
              />
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
