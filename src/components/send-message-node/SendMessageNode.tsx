import { Text } from "@mantine/core";
import { useNodeId } from "reactflow";
import { Handle, NodeProps, Position } from "reactflow";
import { BrandWhatsapp, Message } from "tabler-icons-react";
import CustomHandle from "../custom-handle/CustomHandle";

// SendMessageNode component represents a node used for sending messages in the flow chart
export default function SendMessageNode({ data }: NodeProps) {
  const nodeId = useNodeId(); // Get the unique ID of the node

  // Render the SendMessageNode component
  return (
    <>
      {/* Handle for incoming connections */}
      <Handle
        type="target"
        id={nodeId + "a"} // Unique ID for the handle
        position={Position.Left} // Position of the handle
        isConnectable={true} // Indicates whether the handle can be connected
      />
      {/* Container for the send message node */}
      <div className="send-message">
        {/* Header of the send message node */}
        <div className="send-message-header">
          {/* Icon for sending messages */}
          <Message size={15} className="text" />
          {/* Text label */}
          <Text size={15} className="text">
            Send Message
          </Text>
          {/* Wrapper for the WhatsApp icon */}
          <div className="brand-wrapper">
            <BrandWhatsapp size={10} className="text" />
          </div>
        </div>
        {/* Label for the send message node */}
        <Text size={20} className="send-message-label text">
          {data.label} {/* Display the label of the node */}
        </Text>
      </div>
      {/* Custom handle for outgoing connections */}
      <CustomHandle
        id={nodeId + "b"} // Unique ID for the handle
        type="source" // Type of the handle
        position={Position.Right} // Position of the handle
        isConnectable={1} // Indicates whether the handle can be connected
      />
    </>
  );
}
