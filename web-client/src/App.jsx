import { VStack, HStack, Text, Image, Box, Button } from "@chakra-ui/react";
import { LandingPageTitle } from "./components/LandingPageTitle";
import { LandingPageSection } from "./LandingPageSection";
import { DuoNavBar } from "./components/DuoNavBar";
import { useNavigate } from "react-router";

export default function App() {
  let navigate = useNavigate();
  return (
    <div className="App">
      <DuoNavBar isLanding={true} handleLogoClick={() => navigate("/")} />
      <Box marginBottom={"10rem"}>
        <VStack gap={"6rem"}>
          <LandingPageTitle />
          <LandingPageSection />
        </VStack>
      </Box>
    </div>
  );
}

// make a note about the adblocker
