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

export default function AddDevModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" size="sm">
        Add Dev
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Novo Desenvolvedor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input type="text" />
              <FormLabel>Sexo</FormLabel>
              <Input type="text" />
              <FormLabel>Data de Nascimento</FormLabel>
              <Input type="date" />
              <FormLabel>Idade</FormLabel>
              <Input type="number" />
              <FormLabel>Hobby</FormLabel>
              <Input type="text" />
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
                  title: "Dev criado.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                onClose();
              }}
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
