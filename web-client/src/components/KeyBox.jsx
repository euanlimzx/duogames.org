import { Kbd, SlideFade } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export function KeyBox({ inputKey, boxIdentifier, setKeys }) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => {
        setKeys((prev) => prev.filter(({ id }) => id != boxIdentifier));
      }, 100);
    }, 350);

    // remove key entry from state
  }, [boxIdentifier, setKeys]);

  return (
    <SlideFade in={isOpen} unmountOnExit>
      <Kbd fontSize={"2xl"} padding={6}>
        {inputKey}
      </Kbd>
    </SlideFade>
  );
}
