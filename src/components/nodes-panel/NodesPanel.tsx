import MessageNode from "../message-node/MessageNode";

// NodesPanel component represents the panel containing various types of nodes
const NodesPanel: React.FC = () => {
  // Render the NodesPanel component
  return (
    <div className="sidebar">
      {/* Render the MessageNode component */}
      <MessageNode />
    </div>
  );
};

export default NodesPanel;
