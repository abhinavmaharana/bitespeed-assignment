import { Button } from "@mantine/core";
import { useContext } from "react";
import { notifications } from "@mantine/notifications";
import { DashboardContext } from "../dashboard/Dashboard";

// SaveButton component is used to save the flow
const SaveButton: React.FC = () => {
  const appContextValue = useContext(DashboardContext); // Accessing context from Dashboard

  // Function to handle save button click
  const handleSave = () => {
    let validSave = false;

    // Check if the function for checking node connection status exists in the context
    if (appContextValue.checkNodesConnectionStatus) {
      // Call the function to check if the flow can be saved
      validSave = appContextValue.checkNodesConnectionStatus(1);
    }

    // Show notification based on save validity
    validSave
      ? notifications.show({
          title: "Flow saved successfully",
          message: "",
          color: "green",
          style: { backgroundColor: "#CDFFCD" },
        })
      : notifications.show({
          title: "Cannot save flow",
          message: "",
          color: "red",
          style: { backgroundColor: "#FFCCCB" },
        });
  };

  // Render the SaveButton component
  return (
    <div className="save-button">
      {/* Save button */}
      <Button type="submit" onClick={handleSave} variant="outline">
        Save Changes
      </Button>
    </div>
  );
};

export default SaveButton;
