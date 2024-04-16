import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <MantineProvider>
      <Notifications position="top-center" />
      <DndProvider backend={HTML5Backend}>
        <Dashboard />
      </DndProvider>
    </MantineProvider>
  )
}

export default App
