import { Box, Flex, HStack, Image } from "@chakra-ui/react";
import ScreenInterpreter from "./ScreenInterpreter";

interface Props {
  onClick: (index: number) => void;
  lines: string[];
  setTech: (value: boolean) => void;
  setProgress: (value: number) => void;
  setReady: (vlue: boolean) => void;
  setCurrentPrice: (price: number | null) => void;
setIsTimedOut:(value:boolean)=>void;
  setLoading: (value: boolean) => void; // dodaj to
  tech: boolean;
  setHasCredit:(value:boolean)=>void;
   clearAutoResumeTimer: () => void;
}

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
  setHasCredit, clearAutoResumeTimer
}: Props) => {
  return (
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
  );
};

export default SugarPanel;
