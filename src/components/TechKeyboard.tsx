import { Button, VStack, GridItem, SimpleGrid } from "@chakra-ui/react";

interface NumPadProps {
  onClick: (index: number) => void;
}

const TechKeyboard = ({ onClick }: NumPadProps) => {
  const ButtonStyle = {
    fontSize: "3xl",
    background: "#8C1C13",
    fontWeight: "semibold",
    color: "white",
    width: "100%",
    height: "100%",
    userSelect: "none" as const,
  };

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const errReset = async () => {
    onClick(11);
    await sleep(1000);
    onClick(10);
    await sleep(1000);
    onClick(1);
    await sleep(1000);
    onClick(10);
  };

  const priceLoad = () => {};

  return (
    <VStack gap={2}>
      <SimpleGrid columns={2} gap={3} height="100%" width="77%" mx="auto">
        <GridItem>
          <Button onClick={() => onClick(10)} {...ButtonStyle}>
            Enter
          </Button>
        </GridItem>
        <GridItem>
          <Button onClick={() => onClick(11)} {...ButtonStyle}>
            Escape
          </Button>
        </GridItem>
        <GridItem>
          <Button onClick={errReset} {...ButtonStyle}>
            Reset Blędów
          </Button>
        </GridItem>
        <GridItem>
          <Button onClick={priceLoad} {...ButtonStyle}>
            Wgraj ceny
          </Button>
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
};

export default TechKeyboard;
