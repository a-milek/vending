import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import coffeeData from "../config/CoffeeData";

interface Props {
  onClick: (index: number) => void;
  tech: boolean;
}

const LOCAL_STORAGE_KEY = "coffee-prices";

const CoffeeGrid = ({ onClick, tech }: Props) => {
  const [coffeeList, setCoffeeList] = useState(coffeeData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setCoffeeList(JSON.parse(stored));
      } catch (e) {
        console.error("Błąd odczytu localStorage:", e);
      }
    }
  }, []);

  const handlePriceChange = (index: number, newPrice: number) => {
    const updated = [...coffeeList];
    updated[index].price = newPrice;
    setCoffeeList(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSetPriceClick = (index: number) => {
    setEditingIndex(index);
    setInputValue("");
    toast({
      title: `Ustaw cenę dla: ${coffeeList[index].name}`,
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    onOpen();
  };

  const handleNumpadClick = (value: string) => {
    if (value === "C") {
      setInputValue("");
    } else if (value === "←") {
      setInputValue((prev) => prev.slice(0, -1));
    } else {
      setInputValue((prev) => prev + value);
    }
  };

  const handleSave = () => {
    const parsed = parseFloat(inputValue.replace(",", "."));
    if (!isNaN(parsed) && editingIndex !== null) {
      handlePriceChange(editingIndex, parsed);
    }
    onClose();
  };

  const Numpad = () => {
    const buttons = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      ",",
      "0",
      "←",
    ];
    return (
      <SimpleGrid columns={3} spacing={2}>
        {buttons.map((b) => (
          <Button key={b} onClick={() => handleNumpadClick(b)}>
            {b}
          </Button>
        ))}
      </SimpleGrid>
    );
  };

  return (
    <>
      <SimpleGrid
        columns={3}
        gap={5}
        paddingY={5}
        height="100%"
        width={tech ? "50%" : "77%"}
        mx="auto"
      >
        {coffeeList.map((coffee, index) => (
          <Box key={index}>
            <Box
              position="relative"
              width="100%"
              onClickCapture={() => onClick(index)}
            >
              <Image
                src={`assets/${index}.png`}
                alt={coffee.name}
                width="100%"
                borderWidth="1px"
                borderRadius="lg"
                draggable={false}
                userSelect="none"
              />
              <Text
                position="absolute"
                bottom={3}
                left={6}
                bg="white"
                color="#242424"
                width="30%"
                height="30%"
                borderRadius="full"
                fontSize="l"
                fontWeight="bold"
                display="flex"
                alignItems="center"
                justifyContent="center"
                pointerEvents="none"
              >
                {coffee.price.toFixed(2).replace(".", ",")}zł
              </Text>
            </Box>
            {tech && (
              <Box mt={2}>
                <Button
                  size="md"
                  width="100%"
                  onClick={() => handleSetPriceClick(index)}
                >
                  Ustaw cenę
                </Button>
              </Box>
            )}
          </Box>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nowa cena</ModalHeader>
          <ModalBody>
            <Input
              mb={4}
              value={inputValue}
              readOnly
              textAlign="right"
              fontSize="2xl"
            />
            <Numpad />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Anuluj
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Zapisz
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CoffeeGrid;
