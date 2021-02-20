import {Button} from "@chakra-ui/react"
import { useColorMode } from "@chakra-ui/react"
import { MoonIcon } from '@chakra-ui/icons'

function DarkModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header>
      <Button onClick={toggleColorMode} bg="teal.900">
       <MoonIcon pr={1}/> Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </header>
  )
}
export default DarkModeToggle;
