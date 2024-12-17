import { Text } from "@chakra-ui/react";
export function RoomCode() {
  const roomCode = "0EcDJNmx46QdNFzXAAAP".split("");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const SOCKET_ID_LENGTH = 20;

  const [code, setCode] = useState(roomCode);
  let iteration = -1;

  useEffect(() => {
    function scrambleText() {
      function getRandomLetter() {
        const randomIndex = Math.floor(Math.random() * letters.length);
        return letters[randomIndex];
      }
      setCode(Array.from({ SOCKET_ID_LENGTH }, getRandomLetter));
      const interval = setInterval(() => {
        setCode(
          code.map((letter, index) => {
            if (index <= iteration) {
              return roomCode[index];
            } else {
              return getRandomLetter();
            }
          })
        );
        if (iteration != -1) {
          iteration += 1 / 2; // this if condition is what triggers the stop of the animation
        }
        if (iteration >= SOCKET_ID_LENGTH) {
          clearInterval(interval);
        }
      }, 50);
    }
    scrambleText();
  }, []);

  return <Text>Hello</Text>;
}
