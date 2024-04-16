import React, { useContext, useEffect } from "react";
import { Text } from "@mantine/core";
import { useState } from "react";
import { ArrowLeft } from "tabler-icons-react";
import { DashboardContext } from "../dashboard/Dashboard";

export default function MessageInputSettings() {
    const appContextValue = useContext(DashboardContext);
    const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (appContextValue.selectedNode) {
      appContextValue.setSelectedNode({
        ...appContextValue.selectedNode,
        //@ts-ignore
        data: { label: e.target.value },
      });
    }
  };
  //Whenever the value of appContextValue changes, message is updated
  //This is required to display updated message when a different node is selected after the current one
  useEffect(() => {
    //@ts-ignore
    setMessage(appContextValue.selectedNode?.data.label);
  }, [appContextValue]);

  return (
    <div className="message-input-settings">
      <div className="header">
        <ArrowLeft
          className="left-arrow text"
          size={20}
          onClick={() => appContextValue.setSettingsPanelOpen(false)}
        />
        <Text className="text">Message</Text>
        <Text className="text"></Text>
      </div>
      <hr></hr>
      <div className="text-input">
        <textarea value={message} className="text-area" onChange={handleChange} />
      </div>
      <hr></hr>
    </div>
  )
}