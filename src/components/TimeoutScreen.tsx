import { useEffect, useState } from "react";
import { Flex, Image } from "@chakra-ui/react";
const TimeoutScreen = () => {
  const [selectedAd, setSelectedAd] = useState<string>("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 4);
    setSelectedAd(`assets/ads/ad${randomIndex + 1}.png`);
  }, []);

  return (
    <>
      {selectedAd && (
        <Flex
          minW="100vw"
          minH="100vh"
          justify="center"
          align="center"
          bg="black" // opcjonalnie tło
        >
          <Image
            src={selectedAd}
            alt="Advertisement"
            objectFit="contain"
            width="100%"
            height="100%"
          />
        </Flex>
      )}
    </>
  );
};

export default TimeoutScreen;
