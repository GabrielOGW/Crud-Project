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

export default function EditNivelModal({
  nivelId,
  nivelName,
  onRefresh,
}: {
  nivelId: number;
  nivelName: string;
  onRefresh: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [newNivel, setNewNivel] = useState<string>(nivelName);

  const handleUpdate = async () => {
    try {
      const payload = {
        nivel: newNivel,
      };

      await api.patch(`/nivel/${nivelId}`, payload);
      toast({
        title: "Nivel alterado.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      onRefresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao alterar nivel.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  };

  return (
    <>
      <Button onClick={onOpen} size="sm">
        Visualizar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(1px)" />
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
              onClick={onClose}
            >
              cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
