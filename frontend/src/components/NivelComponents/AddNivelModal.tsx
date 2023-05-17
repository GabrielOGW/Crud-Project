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
import { api } from "../../services/api";

export default function AddNivelModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [nivel, setNivel] = useState("");

  const handleSubmit = async () => {
    try {
      const payload = {
        nivel: nivel,
      };

      await api.post(`/nivel`, payload);
      toast({
        title: "Nivel criado.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Erro ao criar nivel.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" size="sm">
        Add Nivel
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(1px)" />
        <ModalContent>
          <ModalHeader>Novo Nivel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nivel</FormLabel>
              <Input type="text" onChange={(e) => setNivel(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
            >
              Adicionar
            </Button>
            <Button colorScheme="red" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
