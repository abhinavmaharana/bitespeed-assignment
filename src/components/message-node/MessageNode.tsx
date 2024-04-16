import { useDrag } from "react-dnd";
import { Message } from "tabler-icons-react";
import { Text } from "@mantine/core";
//Message node is used on the nodes panel
const MessageNode: React.FC = () => {
  const [, drag] = useDrag(() => ({
    type: "message",
  }));

  return (
    <div ref={drag} className="draggable-text-node">
      <div className="message-icon">
        <Message className="text" size={30} />
        <Text className="text">Message</Text>
      </div>
    </div>
  );
};

export default MessageNode;
