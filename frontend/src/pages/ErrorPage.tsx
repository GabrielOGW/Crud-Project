import { Button, Center, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };
  return (
    <>
      <Center height="65vh">
        <Text fontSize="3xl" fontWeight="bold" color="red.500">
          Houve um erro inesperado, ou a pagina que você tentou acessar não
          existe.
        </Text>
      </Center>
      <Center>
        <Button mt={4} onClick={handleReturn}>
          Retornar
        </Button>
      </Center>
    </>
  );
}

export default ErrorPage;
