import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { api } from "../../services/api";

export default function DeleteDevAlert({ devId }: { devId: number }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await api.delete(`/developers/${devId}`);
      toast({
        title: "Dev excluido.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error: any) {
      {
        toast({
          title: "Erro ao excluir Dev.",
          description: "Ocorreu um erro ao excluir o desenvolvedor.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      }
    }
  };

  return (
    <>
      <Button
        colorScheme="red"
        borderColor="red.700"
        variant="outline"
        mr={3}
        size="sm"
        onClick={onOpen}
      >
        Excluir
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir Desenvolvedor
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza? Após confirmar você não pode reverter essa
              operação.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme="red"
                borderColor="red.700"
                variant="solid"
                mr={3}
                onClick={handleDelete}
                ml={3}
              >
                Excluir
              </Button>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
