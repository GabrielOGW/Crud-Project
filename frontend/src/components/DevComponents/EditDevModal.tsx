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
import { api } from "../../services/api";

export default function EditDevModal({
  devId,
  devNome,
  devSexo,
  devHobby,
  devNivel,
}: {
  devId: number;
  devNome: string;
  devSexo: string;
  devHobby: string;
  devNivel: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [newNome, setNewNome] = useState<string>(devNome);
  const [newSexo, setNewSexo] = useState<string>(devSexo);
  const [dataNascimento, setDataNascimento] = useState("");
  const [idade, setIdade] = useState("");
  const [newHobby, setNewHobby] = useState<string>(devHobby);
  const [newNivel, setNewNivel] = useState<string>(devNivel);

  const handleUpdate = async () => {
    try {
      const payload = {
        nome: newNome,
        sexo: newSexo,
        nasci: dataNascimento,
        idade: idade,
        hobby: newHobby,
        nivel_id: newNivel,
      };

      await api.patch(`/developers/${devId}`, payload);
      toast({
        title: "Dev alterado.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao alterar dev.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      onClose();
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
        const response = await api.get("/nivel");
        const jsonData = response.data;
        setData(jsonData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const calcularIdade = (dataNascimento: string) => {
    const dataNascimentoObj = new Date(dataNascimento);
    const dataAtualObj = new Date();

    const diferencaEmMilissegundos =
      dataAtualObj.getTime() - dataNascimentoObj.getTime();
    const idadeEmAnos = Math.floor(
      diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 365)
    );

    setIdade(idadeEmAnos.toString());
  };

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
              <Select
                placeholder={newSexo}
                onChange={(e) => setNewSexo(e.target.value)}
              >
                <option value="Masc">Masc </option>
                <option value="Fem">Fem </option>
              </Select>
              <FormLabel>Data de Nascimento</FormLabel>
              <Input
                type="date"
                value={dataNascimento}
                onChange={(e) => {
                  setDataNascimento(e.target.value);
                  calcularIdade(e.target.value);
                }}
              />
              <FormLabel>Idade</FormLabel>
              <Input type="number" value={idade} readOnly />

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
              onClick={onClose}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
