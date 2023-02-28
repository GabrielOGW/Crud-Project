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
import DeleteAlert from "./DeleteAlert";

export default function EditNivelModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <>
      <Button onClick={onOpen} size="sm">
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
              <Input type="text" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                toast({
                  title: "Nivel alterado.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                onClose();
              }}
            >
              Alterar
            </Button>
            <DeleteAlert />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
