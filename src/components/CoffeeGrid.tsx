import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import coffeeData from "../config/CoffeeData";
import PriceEditModal from "./PriceEditModal";
import NameEditModal from "./NameEditModal";
import PhotoEditModal from "./PhotoEditModal";

interface Props {
  onClick: (index: number) => void;
  tech: boolean;
}

const LOCAL_STORAGE_KEY = "coffee-prices";

const CoffeeGrid = ({ onClick, tech }: Props) => {
  const [coffeeList, setCoffeeList] = useState(coffeeData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingNameIndex, setEditingNameIndex] = useState<number | null>(null);
  const [editingPhotoIndex, setEditingPhotoIndex] = useState<number | null>(null);
  
  // Track selected (highlighted) coffee index:
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const photoModal = useDisclosure();
  const priceModal = useDisclosure();
  const nameModal = useDisclosure();

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

  useEffect(() => {
  if (selectedIndex !== null) {
    const timer = setTimeout(() => {
      setSelectedIndex(null);
    }, 3000); 

    return () => clearTimeout(timer); 
  }
}, [selectedIndex]);


  const updateStorage = (updated: typeof coffeeList) => {
    setCoffeeList(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const handlePriceChange = (index: number, newPrice: number) => {
    const updated = [...coffeeList];
    updated[index].price = newPrice;
    updateStorage(updated);
  };

  const handleNameChange = (index: number, newName: string) => {
    const updated = [...coffeeList];
    updated[index].name = newName;
    updateStorage(updated);
  };

  const handleSetPriceClick = (index: number) => {
    setEditingIndex(index);
    priceModal.onOpen();
  };

  const handleSetNameClick = (index: number) => {
    setEditingNameIndex(index);
    nameModal.onOpen();
  };

  const handleSetPicClick = (index: number) => {
    setEditingPhotoIndex(index);
    photoModal.onOpen();
  };

  // Handle click on coffee item: call parent onClick & set selected highlight
  const handleCoffeeClick = (index: number) => {
    setSelectedIndex(index);
    onClick(index);
  };

  return (
    <>
      <SimpleGrid
        columns={tech ? 4 : 3}
        gap={5}
        paddingY={5}
        height="100%"
        width={tech ? "50%" : "70%"}
        mx="auto"
      >
        {coffeeList.map((coffee, index) => (
          <Box key={index}>
            <Box
              position="relative"
              width="100%"
              onClickCapture={() => handleCoffeeClick(index)}
              
              borderWidth={selectedIndex === index ? "3px" : "1px"}
              borderColor={selectedIndex === index ? "blue.400" : "black"}
              borderRadius="lg"
              transition="border-color 0.3s ease"
              _hover={{ borderColor: "blue.300" }}
            >
              <Image
                src={coffee.image || "assets/icons/simplecoffee.png"}
                alt={coffee.name}
                width="100%"
                borderRadius="lg"
                draggable="false"
                userSelect="none"
              />
              <Text
                position="absolute"
                bottom={3}
                left={3}
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
                userSelect="none"
              >
                {coffee.price.toFixed(2).replace(".", ",")}zł
              </Text>

              <Text
                position="absolute"
                top={3}
                left={0}
                width="100%"
                color="white"
                fontSize="xl"
                fontWeight="bold"
                pointerEvents="none"
                userSelect="none"
                textAlign="center"
              >
                {coffee.name}
              </Text>
            </Box>
            {tech && (
              <>
                <Box mt={2}>
                  <Button
                    size="md"
                    width="100%"
                    onClick={() => handleSetPriceClick(index)}
                  >
                    Ustaw cenę
                  </Button>
                </Box>
                <Box mt={2}>
                  <Button
                    size="md"
                    width="100%"
                    onClick={() => handleSetNameClick(index)}
                  >
                    Ustaw nazwę
                  </Button>
                </Box>
                <Box mt={2}>
                  <Button
                    size="md"
                    width="100%"
                    onClick={() => handleSetPicClick(index)}
                  >
                    Ustaw obrazek
                  </Button>
                </Box>
              </>
            )}
          </Box>
        ))}
      </SimpleGrid>

      <PriceEditModal
        isOpen={priceModal.isOpen}
        onClose={priceModal.onClose}
        onSave={(price) => {
          if (editingIndex !== null) {
            handlePriceChange(editingIndex, price);
          }
        }}
      />

      <PhotoEditModal
        isOpen={photoModal.isOpen}
        onClose={photoModal.onClose}
        onSave={(newImageSrc) => {
          if (editingPhotoIndex !== null) {
            const updated = [...coffeeList];
            updated[editingPhotoIndex].image = newImageSrc;
            updateStorage(updated);
          }
        }}
      />

      <NameEditModal
        isOpen={nameModal.isOpen}
        onClose={nameModal.onClose}
        onSave={(name) => {
          if (editingNameIndex !== null) {
            handleNameChange(editingNameIndex, name);
          }
        }}
      />
    </>
  );
};

export default CoffeeGrid;
