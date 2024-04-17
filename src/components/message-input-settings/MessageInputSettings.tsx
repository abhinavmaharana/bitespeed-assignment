import React, { useContext, useEffect } from "react";
import { Text } from "@mantine/core";
import { useState } from "react";
import { ArrowLeft } from "tabler-icons-react";
import { DashboardContext } from "../dashboard/Dashboard";

// Component for message input settings
export default function MessageInputSettings() {
  const appContextValue = useContext(DashboardContext); // Accessing context from Dashboard
  const [message, setMessage] = useState(""); // State for message input

  // Function to handle changes in the message input
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // Update the label of the selected node with the new message
    if (appContextValue.selectedNode) {
      appContextValue.setSelectedNode({
        ...appContextValue.selectedNode,
        //@ts-ignore
        data: { label: e.target.value },
      });
    }
  };

  // Update message whenever the selected node changes
  useEffect(() => {
    //@ts-ignore
    setMessage(appContextValue.selectedNode?.data.label);
  }, [appContextValue]);

  // Render the message input settings component
  return (
    <div className="message-input-settings">
      {/* Header */}
      <div className="header">
        {/* Back arrow button */}
        <ArrowLeft
          className="left-arrow text"
          size={20}
          onClick={() => appContextValue.setSettingsPanelOpen(false)} // Close settings panel on click
        />
        <Text className="text">Message</Text> {/* Title */}
        <Text className="text"></Text> {/* Empty text */}
      </div>
      <hr></hr> {/* Horizontal line */}
      {/* Text input for message */}
      <div className="text-input">
        <textarea
          value={message}
          className="text-area"
          onChange={handleChange} // Handle changes in the message input
        />
      </div>
      <hr></hr> {/* Horizontal line */}
    </div>
  );
}
