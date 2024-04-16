import {
    useState,
    useRef,
    useCallback,
    useContext,
    useEffect,
  } from "react";
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
import { useDrop } from "react-dnd";

const initialNodes = [
    {
      id: "1",
      type: "sendMessage",
      data: { label: "default node" },
      position: { x: 10, y: 10 },
    },
];

const nodeTypes: NodeTypes = {
    // sendMessage: SendMessageNode,
};

export default function DNDFlow() {
  return (
    <div className="dnd-flow">
        <div className="reactflow-wrapper">
            <ReactFlowProvider>
                <h1>Hello</h1>
            </ReactFlowProvider>
        </div>
    </div>
  )
}