import { NodeType } from "./workflow";

export const initialState = {
  changeFlag: false,
  undoList: [],
  redoList: [],
  startNode: {
    id: "start",
    nodeType: NodeType.start,
  },
  errors: {}
}
