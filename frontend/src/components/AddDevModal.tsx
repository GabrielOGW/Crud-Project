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

export default function AddDevModal() {
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
      const response = await fetch("http://localhost:3000/developers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          sexo,
          dataNascimento,
          idade,
          hobby,
          nivel_id,
        }),
      });
      if (response.ok) {
        toast({
          title: "Dev criado.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      } else {
        throw new Error("Failed to create dev");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao criar dev.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
        const response = await fetch("http://localhost:3000/nivel");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Button colorScheme="blue" size="sm" onClick={() => onOpen()} >
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
              <Input type="text" onChange={(e) => setNome(e.target.value)} />
              <FormLabel>Sexo</FormLabel>
              <Input type="text" onChange={(e) => setSexo(e.target.value)} />
              <FormLabel>Data de Nascimento</FormLabel>
              <Input
                type="date"
                onChange={(e) => setDataNascimento(e.target.value)}
              />
              <FormLabel>Idade</FormLabel>
              <Input type="number" onChange={(e) => setIdade(e.target.value)} />
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
