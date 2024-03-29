import { useEffect, useState } from "react";
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
import { Nivel } from "../../interface/interfaces";
import { api } from "../../services/api";

export default function AddDevModal({ onRefresh }: { onRefresh: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [nome, setNome] = useState("");
  const [sexo, setSexo] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [idade, setIdade] = useState("");
  const [hobby, setHobby] = useState("");
  const [nivel_id, setNivel_id] = useState("");

  const handleSubmit = async () => {
    try {
      const payload = {
        nome: nome,
        sexo: sexo,
        dataNascimento: dataNascimento,
        idade: idade,
        hobby: hobby,
        nivel_id: nivel_id,
      };
      await api.post(`/developers`, payload);
      toast({
        title: "Dev criado.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      onRefresh();
    } catch (error: any) {
      toast({
        title: "Erro ao criar Dev.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  };

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
      <Button colorScheme="blue" size="sm" onClick={() => onOpen()}>
        Add Dev
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(1px)" />
        <ModalContent>
          <ModalHeader>Novo Desenvolvedor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input type="text" onChange={(e) => setNome(e.target.value)} />
              <FormLabel>Sexo</FormLabel>
              <Select
                placeholder="Informe o Sexo"
                onChange={(e) => setSexo(e.target.value)}
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
              <Input type="text" onChange={(e) => setHobby(e.target.value)} />
              <FormLabel>Nivel</FormLabel>
              <Select
                placeholder="Selecione o nível"
                onChange={(e) => setNivel_id(e.target.value)}
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
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
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
