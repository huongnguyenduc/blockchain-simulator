import { Edge } from "reactflow";

export const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", sourceHandle: "a" },
  { id: "e1-3", source: "1", target: "3", sourceHandle: "b" },
  { id: "e2-3", source: "2", target: "3", sourceHandle: "a" },
  { id: "e3-4", source: "3", target: "4", sourceHandle: "a" },
  { id: "e2-4", source: "2", target: "4", sourceHandle: "a" },
];

export const initialBlockEdges: Edge[] = [
  { id: "e5-6", source: "5", target: "6", sourceHandle: "a" },
  { id: "e6-7", source: "6", target: "7", sourceHandle: "b" },
  { id: "e7-8", source: "7", target: "8", sourceHandle: "a" },
];
