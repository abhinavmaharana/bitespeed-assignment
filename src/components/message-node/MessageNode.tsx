import { useDrag } from "react-dnd";
import { Message } from "tabler-icons-react";
import { Text } from "@mantine/core";

// MessageNode component represents a draggable message node in the nodes panel
const MessageNode: React.FC = () => {
  // useDrag hook to make the component draggable
  const [, drag] = useDrag(() => ({
    type: "message", // Type of the draggable item
  }));

  // Render the MessageNode component
  return (
    <div ref={drag} className="draggable-text-node">
      {/* Container for the message node */}
      <div className="message-icon">
        {/* Message icon */}
        <Message className="text-message" size={30} />
        {/* Text label */}
        <Text className="text-message">Message</Text>
      </div>
    </div>
  );
};

export default MessageNode;
