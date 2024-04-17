import React from "react";
import MessageInputSettings from "../message-input-settings/MessageInputSettings";

// SettingsPanel component represents the panel containing settings for a selected node
const SettingsPanel: React.FC = () => {
  // Render the SettingsPanel component
  return (
    <div className="sidebar">
      {/* Render the MessageInputSettings component */}
      <MessageInputSettings />
    </div>
  );
};

export default SettingsPanel;
