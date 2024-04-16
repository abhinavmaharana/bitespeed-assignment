import { Button } from "@mantine/core";
import { useContext } from "react";
import { notifications } from "@mantine/notifications";
import { DashboardContext } from "../dashboard/Dashboard";

//SaveButton component is used to save the flow
const SaveButton: React.FC = () => {
  const appContextValue = useContext(DashboardContext);

  const handleSave = () => {
    let validSave = false;
    if (appContextValue.checkNodesConnectionStatus) {
      validSave = appContextValue.checkNodesConnectionStatus(1);
    }

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

  return (
    <div className="save-button">
      <Button type="submit" onClick={handleSave} variant="outline">
        Save Changes
      </Button>
    </div>
  );
};

export default SaveButton;
