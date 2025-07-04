import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";

interface Props {
  lines: string[];

  sugar: number;
}

const LCD_Simulator = ({ lines, sugar }: Props) => {
  const TextStyle = {
    color: "white",
    fontSize: "xl",
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
      <Flex justifyContent="center" alignItems="center" paddingTop={4}>
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
            {sugar != 0 ? (
              Array.from({ length: 5 }).map((_, i) => (
                <Box
                  key={i}
                  boxSize="30px" // ← tweak size here if needed
                  bg={i < sugar ? "whiteAlpha.800" : "#0F4AFE"}
                  borderRadius="sm"
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
