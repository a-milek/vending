// theme.ts or theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    disableTransitionOnChange: true,
  },
});

export default theme;
