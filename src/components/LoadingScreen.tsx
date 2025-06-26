import { Flex, Image, Box, Progress, Heading } from "@chakra-ui/react";

interface Props {
  progress: number;
  ready: boolean;
}

export default function LoadingScreen({ progress, ready }: Props) {
  return (
    <>
      <Flex
        minW="100vw"
        minH="100vh"
        justify="center"
        align="center"
        bg="black"
        position="relative"
        direction="column"
        color="white"
      >
        <Image
          src="assets/coffee-2.gif"
          alt="Brewing coffee..."
          objectFit="cover"
          width="100%"
          height="100%"
          position="absolute"
          top="0"
          left="0"
          zIndex={0}
        />

        <Box
          position="relative"
          zIndex={1}
          width="70%"
          textAlign="center"
          height="20%"
        >
          {ready ? (
            <Heading color="white" fontSize={"xl"} fontWeight="bold">
              ODBIERZ PRODUKT
            </Heading>
          ) : (
            <Progress
              value={progress}
              colorScheme="whiteAlpha" // "white" nie jest standardowym schematem; "whiteAlpha" działa lepiej
              size="lg"
              height="5vh"
              variant="outline"
            />
          )}
        </Box>
      </Flex>
    </>
  );
}
