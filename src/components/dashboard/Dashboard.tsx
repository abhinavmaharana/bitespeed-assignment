import { AppShell, Aside, Header, MediaQuery, Text, useMantineTheme } from "@mantine/core";
import { createContext, useState } from "react";
import SaveButton from "../save-button/SaveButton";
import DNDFlow from "../dnd-flow/DNDFlow";
import SettingsPanel from "../settings-panel/SettingsPanel";
import NodesPanel from "../nodes-panel/NodesPanel";

interface DashboardContext {
    settingsPanelOpen: boolean; //indicates if the settings panel is visible on sidebar
    selectedNode: Node | null; //holds the value of the node selected by the user on mouseclick
    setSettingsPanelOpen: (arg1: boolean) => void;
    setSelectedNode: (arg1: Node) => void;
    checkNodesConnectionStatus?: (arg1: number) => boolean; //helps to check if the flow is allowed to be saved
}
  
//AppContext holds all the necessary values/functions that are required across different components
//in the application. It's using context api.
export const DashboardContext = createContext<DashboardContext>({} as DashboardContext);
  
//Dashboard component is used to contain different components inside it and for giving the
//general layout of the web application.
export default function Dashboard() {
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const theme = useMantineTheme();

  return (
    <DashboardContext.Provider
        value={{
            settingsPanelOpen,
            selectedNode,
            setSettingsPanelOpen,
            setSelectedNode,
        }}
    >
        <AppShell
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
            aside={
                <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                    <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                        {/* Application sidebar */}
                        {settingsPanelOpen ? <SettingsPanel /> : <NodesPanel />}
                    </Aside>
                </MediaQuery>
            }
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
                        <Text p="lg"></Text>
                        <SaveButton />
                    </div>
                </Header>
            }
        >
            <DNDFlow />
        </AppShell>
    </DashboardContext.Provider>
  )
}