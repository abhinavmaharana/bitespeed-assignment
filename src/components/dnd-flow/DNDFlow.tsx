import { useState, useRef, useCallback, useContext, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Edge,
  Connection,
  ReactFlowInstance,
  Node,
  MarkerType,
  NodeTypes,
} from "reactflow";
import { XYCoord, useDrop } from "react-dnd";
import "reactflow/dist/style.css";
import SendMessageNode from "../send-message-node/SendMessageNode";
import { DashboardContext } from "../dashboard/Dashboard";

// Initial nodes for the flow chart
const initialNodes = [
  {
    id: "1",
    type: "sendMessage",
    data: { label: "test message 1" },
    position: { x: 10, y: 10 },
  },
];

// Define node types used in the flow chart
const nodeTypes: NodeTypes = {
  sendMessage: SendMessageNode,
};

// DNDFlow component for the drag and drop flow chart
export default function DNDFlow() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes); // State for nodes
  const [edges, setEdges, onEdgesChange] = useEdgesState([]); // State for edges
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null); // Instance of React Flow
  const [numOfNodes, setNumOfNodes] = useState(1); // Number of nodes

  const appContextValue = useContext(DashboardContext); // Accessing context from Dashboard

  // Callback function for when an edge is connected
  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) => {
        return addEdge(
          { ...params, markerEnd: { type: MarkerType.Arrow } }, // Arrow marker for edges
          eds,
        );
      }),
    [setEdges],
  );

  // Function to check if nodes can be connected
  const checkNodesConnectionStatus = (val: number): boolean => {
    const nodeIds = nodes.map((node) => node.id);
    edges.forEach((edge) => {
      const index = nodeIds.indexOf(edge.target);
      if (index !== -1) {
        nodeIds.splice(index, 1);
      }
    });
    return nodeIds.length <= val;
  };

  // Assigning the function to context value
  appContextValue.checkNodesConnectionStatus = checkNodesConnectionStatus;

  // Hook to handle dropping a node onto the flow chart
  const [, drop] = useDrop(
    () => ({
      accept: "message",
      drop: (_, monitor) => {
        const num = numOfNodes + 1;

        const delta = monitor.getSourceClientOffset() as XYCoord;
        const reactFlowBounds =
          reactFlowWrapper.current?.getBoundingClientRect();

        let position: any;
        if (reactFlowInstance !== null && reactFlowBounds !== undefined) {
          position = reactFlowInstance.project({
            x: delta.x - reactFlowBounds.left,
            y: delta.y - reactFlowBounds.top,
          });
        }

        // Adding a new node of type sendMessage
        setNodes((prevNodes) =>
          prevNodes.concat({
            id: num.toString(10),
            position,
            type: "sendMessage",
            data: { label: "test message " + num.toString(10) },
            draggable: true,
          }),
        );
        setNumOfNodes((prevNum) => prevNum + 1);
      },
    }),
    [numOfNodes, reactFlowInstance],
  );

  // Function to handle clicking on a node
  const handleNodeClick = (_event: React.MouseEvent, node: Node) => {
    appContextValue.setSettingsPanelOpen(true); // Open settings panel
    appContextValue.setSelectedNode(node as any); // Set selected node
  };

  // Update node label if selected node changes
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (
          node.id ===
          (
            appContextValue.selectedNode as unknown as
              | { id: string; data?: { label: string } }
              | undefined
          )?.id
        ) {
          if (appContextValue.selectedNode)
            node.data = {
              ...node.data,
              //@ts-ignore
              label: appContextValue.selectedNode.data?.label,
            };
        }
        return node;
      }),
    );
  }, [appContextValue.selectedNode, setNodes]);

  // Render the DNDFlow component
  return (
    <div className="dnd-flow" ref={drop}>
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onNodeClick={handleNodeClick} // Display settings panel on node click
            onPaneClick={() => appContextValue.setSettingsPanelOpen(false)} // Close settings panel on pane click
          >
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}
