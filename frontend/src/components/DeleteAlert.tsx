import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup,
  Button,
} from '@chakra-ui/react'

export default function DeleteAlert() {
  return (
    <Popover
      placement='bottom'
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button>Excluir</Button>
      </PopoverTrigger>
      <PopoverContent borderColor='red.700'>
        <PopoverHeader pt={4} fontWeight='bold' border='0'>
          Confirmar Ação
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Deseja confirmar a ação? após confirmar não será possivel reverter.
        </PopoverBody>
        <PopoverFooter
          border='0'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          pb={4}
        >
          <ButtonGroup size='sm'>
            <Button colorScheme='red'>Excluir</Button>
            <Button>
              Cancelar
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}