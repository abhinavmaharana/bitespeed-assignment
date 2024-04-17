import {
  AppShell,
  Aside,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { createContext, useState } from "react";
import SaveButton from "../save-button/SaveButton";
import DNDFlow from "../dnd-flow/DNDFlow";
import SettingsPanel from "../settings-panel/SettingsPanel";
import NodesPanel from "../nodes-panel/NodesPanel";

// Interface defining the shape of the context used in the application
interface DashboardContext {
  settingsPanelOpen: boolean; // Indicates if the settings panel is visible on the sidebar
  selectedNode: Node | null; // Holds the value of the node selected by the user on mouse click
  setSettingsPanelOpen: (arg1: boolean) => void; // Function to set the visibility of the settings panel
  setSelectedNode: (arg1: Node) => void; // Function to set the selected node
  checkNodesConnectionStatus?: (arg1: number) => boolean; // Helps to check if the flow is allowed to be saved
}

// DashboardContext holds all the necessary values/functions that are required across different components
// in the application. It's using context API.
export const DashboardContext = createContext<DashboardContext>(
  {} as DashboardContext,
);

// Dashboard component is used to contain different components inside it and for giving the
// general layout of the web application.
export default function Dashboard() {
  // State variables to manage settings panel visibility and selected node
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const theme = useMantineTheme(); // Hook to access Mantine theme

  return (
    // Providing the context values to the entire application using Context Provider
    <DashboardContext.Provider
      value={{
        settingsPanelOpen,
        selectedNode,
        setSettingsPanelOpen,
        setSelectedNode,
      }}
    >
      {/* Main layout of the application */}
      <AppShell
        // Styling for the main content area based on theme
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        // Aside component for sidebar navigation, hidden on smaller screens
        aside={
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
              {/* Conditional rendering of either settings panel or nodes panel */}
              {settingsPanelOpen ? <SettingsPanel /> : <NodesPanel />}
            </Aside>
          </MediaQuery>
        }
        // Header component containing application header and save button
        header={
          <Header height={{ base: 50, md: 70 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
                backgroundColor: theme.colors.gray[2],
                color: theme.colors.dark[8],
                padding: "0 100px",
              }}
            >
              {/* Placeholder text */}
              <Text p="lg"></Text>
              {/* Save button component */}
              <SaveButton />
            </div>
          </Header>
        }
      >
        {/* Main content area containing the drag and drop flow */}
        <DNDFlow />
      </AppShell>
    </DashboardContext.Provider>
  );
}
