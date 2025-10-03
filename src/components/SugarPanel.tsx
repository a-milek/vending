import {
  Box,
  Button,
  Flex,
  GridItem,
  HStack,
  Image,
  SimpleGrid,
  VStack,
  Text,
} from "@chakra-ui/react";
import ScreenInterpreter from "./ScreenInterpreter";

interface Props {
  onClick: (index: number) => void;
  lines: string[];
  setTech: (value: boolean) => void;
  setProgress: (value: number) => void;
  setReady: (vlue: boolean) => void;
  setCurrentPrice: (price: number | null) => void;
  setIsTimedOut: (value: boolean) => void;
  setLoading: (value: boolean) => void; // dodaj to
  tech: boolean;
  setHasCredit: (value: boolean) => void;
  clearAutoResumeTimer: () => void;
}

const ButtonStyle = {
  fontSize: "3xl",
  background: "#55461B",
  fontWeight: "semibold",
  color: "white",
  width: "100%",
  height: "100%",
  variant: "subtle",
  userSelect: "none" as const,
};
const SugarPanel = ({
  onClick,
  lines,
  setTech,
  setProgress,
  setReady,
  setCurrentPrice,
  setLoading,
  tech,
  setIsTimedOut,
  setHasCredit,
  clearAutoResumeTimer,
}: Props) => {
  return (
    <>
      <HStack gap={5} py={2} paddingTop="40px" width="70%" mx="auto">
        <Box
          width="33%"
          style={
            {
              touchAction: "none",
              userSelect: "none",
              WebkitUserDrag: "none",
              WebkitTouchCallout: "none",
            } as any
          }
        >
          <Image
            src="assets/less_sugar.png"
            width="100%"
            borderWidth="1px"
            borderRadius="lg"
            onClick={() => onClick(0)}
            draggable="false"
            userSelect="none"
          />
        </Box>

        <Flex
          justify="center"
          align="center"
          width={"33%"}
          style={
            {
              touchAction: "none",
              userSelect: "none",
              WebkitUserDrag: "none",
              WebkitTouchCallout: "none",
            } as any
          }
        >
          <ScreenInterpreter
            lines={lines}
            setTech={setTech}
            setProgress={setProgress}
            setReady={setReady}
            setCurrentPrice={setCurrentPrice}
            setLoading={setLoading}
            tech={tech}
            setIsTimedOut={setIsTimedOut}
            setHasCredit={setHasCredit}
            clearAutoResumeTimer={clearAutoResumeTimer}
          />
        </Flex>

        <Box
          width="33%"
          style={
            {
              touchAction: "none",
              userSelect: "none",
              WebkitUserDrag: "none",
              WebkitTouchCallout: "none",
            } as any
          }
        >
          <Image
            src="assets/more_sugar.png"
            width="100%"
            borderWidth="1px"
            borderRadius="lg"
            onClick={() => onClick(1)}
            draggable="false"
            userSelect="none"
          />
        </Box>
      </HStack>
      <VStack gap={2} paddingY={2} height="7vh">
        <SimpleGrid columns={2} gap={3} height="100%" width="65%" mx="auto">
          <GridItem>
            <Button
              onClick={() => onClick(2)}
              {...ButtonStyle}
              flexDirection="column"
            >
              <Text fontSize="2xl" color="whiteAlpha.800" paddingBottom={2}>
                wciśnij przed wyborem
              </Text>
              <Text fontSize="3xl" color="white" fontWeight="bold">
                DODATKOWY CUKIER
              </Text>
            </Button>
          </GridItem>
          <GridItem>
            <Button
              onClick={() => onClick(11)}
              {...ButtonStyle}
              flexDirection="column"
              alignItems="center"
            >
              <Text fontSize="2xl" color="whiteAlpha.800" paddingBottom={2}>
                wciśnij przed wyborem
              </Text>
              <Text fontSize="3xl" color="white" fontWeight="bold">
                KAWA ZBOŻOWA
              </Text>
            </Button>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default SugarPanel;
