import { useEffect, useState } from "react";
import LCD_Simulator from "./LCD_Simulator";

interface Props {
  lines: string[];
  setTech: (value: boolean) => void;
  setProgress: (value: number) => void;
  setReady: (vlue: boolean) => void;
}

const ScreenInterpreter = ({
  lines,
  setTech,
  setProgress,
  setReady,
}: Props) => {
  const [sugar, setSugar] = useState(0);
  const [interpretedLines, setInterpretedLines] = useState<string[]>([]);

  useEffect(() => {
    interpretLines(lines);
  }, [lines]);

  function interpretLines(rawLines: string[]) {
    const newLines = [...rawLines];
    let foundProgress = false;

    for (let i = 0; i < newLines.length; i++) {
      let line = newLines[i];

      // Cukier
      if (line.startsWith("Cukier") || line.startsWith("Bez cukru")) {
        const count01 = [...line].filter((ch) => ch === "\x01").length;
        setSugar(count01);

        newLines[i] = "\u00A0";
        continue;
      }

      // Postęp
      const codes = [...line].map((ch) => ch.charCodeAt(0));
      const progressCodes = codes.filter(
        (code) => code >= 0x03 && code <= 0x07
      );

      if (progressCodes.length > 0) {
        const sum = progressCodes.reduce((a, b) => a + b, 0);
        const percent = Math.round((sum / 126) * 100);
        setProgress(percent);
        foundProgress = true;
      }

      // Włączanie klawiatury technicznej
      if (line.startsWith("TECH") || line.startsWith("NAPE")) {
        setTech(true);
      }
      if (line.startsWith("WYBIERZ")) {
        setTech(false);
        setProgress(0);
        setReady(false);
      }
      if (line.startsWith("NAPOJ")) {
        setReady(true);
      }
    }

    if (!foundProgress) setProgress(0);
    setInterpretedLines(newLines);
  }

  return (
    <>
      <LCD_Simulator lines={interpretedLines} sugar={sugar} />
    </>
  );
};

export default ScreenInterpreter;
