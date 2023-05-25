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

export default function DeleteNivelAlert({
  nivelId,
  onRefresh,
}: {
  nivelId: number;
  onRefresh: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await api.delete(`/nivel/${nivelId}`);
      toast({
        title: "Nivel excluido.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      onRefresh();
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast({
          title: "Erro ao excluir nivel.",
          description: `Nivel com o id: ${nivelId} possui desenvolvedores vinculados.`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      } else {
        toast({
          title: "Erro ao excluir nivel.",
          description: "Ocorreu um erro ao excluir o nivel.",
          status: "error",
          duration: 3000,
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
              Excluir Nivel
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
