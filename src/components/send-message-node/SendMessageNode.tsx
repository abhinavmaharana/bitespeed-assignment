import { Text } from "@mantine/core";
import { useNodeId } from "reactflow";
import { Handle, NodeProps, Position } from "reactflow";
import { BrandWhatsapp, Message } from "tabler-icons-react";

export default function SendMessageNode({ data }: NodeProps) {
  const nodeId = useNodeId();
  return (
    <>
        <Handle
        type="target"
        id={nodeId + "a"}
        position={Position.Left}
        isConnectable={true}
      />
      <div className="send-message">
        <div className="send-message-header">
            <Message size={15} className="text" />
            <Text size={15} className="text">Send Message</Text>
            <div className="brand-wrapper"><BrandWhatsapp size={10} className="text" /></div>
        </div>
        <Text size={20} className="send-message-label text">
          {data.label}
        </Text>
      </div>
    </>
  )
}