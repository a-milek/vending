import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { RiSquareFill } from "react-icons/ri";

interface Props {
  lines: string[];

  sugar: number;
}

const LCD_Simulator = ({ lines, sugar }: Props) => {
  const TextStyle = {
    color: "white",
    fontSize: "clamp(0.8rem, 2vw, 1.5rem)",
    fontWeight: "bold",
  };

  return (
    <Box
      width="100%"
      height="100%"
      borderWidth="1px"
      borderRadius="lg"
      bg="#1952FF"
      aspectRatio={1}
      userSelect="none"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p={2}
    >
      <Flex justifyContent="center" alignItems="center" py={4}>
        <Box w="100%" h="100%" textAlign="center" userSelect="none">
          <VStack gap={2} paddingTop={1}>
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <Text key={i} {...TextStyle}>
                  {lines[i] || "\u00A0"}
                </Text>
              ))}
          </VStack>

          <HStack justify="center" alignSelf="flex-end">
            {sugar > 0 ? (
              Array.from({ length: 5 }).map((_, i) => (
                <RiSquareFill
                  key={i}
                  size="100%"
                  color={i < sugar ? "lightgray" : "#0F4AFE"}
                />
              ))
            ) : (
              <Text paddingY={2} {...TextStyle}>
                Brak cukru
              </Text>
            )}
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default LCD_Simulator;
