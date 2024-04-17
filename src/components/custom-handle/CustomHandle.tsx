import { useMemo } from "react";
import {
  Edge,
  getConnectedEdges,
  Handle,
  HandleProps,
  NodeInternals,
  useNodeId,
  useStore,
} from "reactflow";

// Props interface for the selectors used in CustomHandle component
export interface SelectorsProps {
  nodeInternals?: NodeInternals; // Node internals data
  edges?: Edge[]; // Array of edges
}

// Props interface for CustomHandle component, extending HandleProps and allowing custom isConnectable property
export interface CustomHandleProps
  extends Pick<HandleProps, Exclude<keyof HandleProps, "isConnectable">> {
  isConnectable?: boolean | number; // Custom property to determine if the handle is connectable
}

// Selector function to extract necessary data from the store
const selector = (s: SelectorsProps) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

// CustomHandle component is used to create a customized handle for sendMessageNode
const CustomHandle = (props: CustomHandleProps) => {
  const { nodeInternals, edges } = useStore(selector); // Accessing data from the store using custom selector
  const nodeId = useNodeId(); // Accessing the current node ID

  // useMemo hook to memoize the result of isHandleConnectable function
  const isHandleConnectable = useMemo(() => {
    if (typeof props.isConnectable === "number") {
      // If isConnectable is a number, check if the number of connections is less than the specified allowable number
      let sourceConnection = 0;
      const node = nodeInternals.get(nodeId); // Getting the node from nodeInternals using the current node ID
      const connectedEdges = getConnectedEdges([node], edges); // Getting connected edges for the node
      connectedEdges.forEach((edge) => {
        // Counting source connections
        if (edge.source === nodeId) {
          sourceConnection++;
        }
      });
      return sourceConnection < props.isConnectable; // Return true if connections are less than the specified limit
    }

    return props.isConnectable; // Return the value of isConnectable if it's not a number
  }, [nodeInternals, edges, nodeId, props.isConnectable]); // Dependencies for useMemo hook

  // Rendering the Handle component with the computed isConnectable value
  return <Handle {...props} isConnectable={isHandleConnectable}></Handle>;
};

export default CustomHandle;
