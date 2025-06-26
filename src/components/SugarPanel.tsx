import { Box, Flex, HStack, Image } from "@chakra-ui/react";
import ScreenInterpreter from "./ScreenInterpreter";

interface Props {
  onClick: (index: number) => void;
  lines: string[];
  setTech: (value: boolean) => void;
  setProgress: (value: number) => void;
  setReady: (vlue: boolean) => void;
}

const SugarPanel = ({
  onClick,
  lines,
  setTech,
  setProgress,
  setReady,
}: Props) => {
  return (
    <HStack gap={5} py={2} paddingTop="40px" width="70%" mx="auto">
      <Box width="33%">
        <Image
          src="assets/less_sugar.png"
          width="100%"
          borderWidth="1px"
          borderRadius="lg"
          onClick={() => onClick(0)}
          draggable={false}
          userSelect="none"
        />
      </Box>

      <Flex justify="center" align="center" width={"33%"}>
        <ScreenInterpreter
          lines={lines}
          setTech={setTech}
          setProgress={setProgress}
          setReady={setReady}
        />
      </Flex>

      <Box width="33%">
        <Image
          src="assets/more_sugar.png"
          width="100%"
          borderWidth="1px"
          borderRadius="lg"
          onClick={() => onClick(1)}
          draggable={false}
          userSelect="none"
        />
      </Box>
    </HStack>
  );
};

export default SugarPanel;
