import { ActionType } from "../actions";
import { nodeReducer } from "./nodeReducer";

export function startNodeReducer(state, action) {
  switch (action.type) {
    case ActionType.SET_START_NODE: {
      return action.payload.node
    }
    case ActionType.DELETE_NODE:
    case ActionType.ADD_NODE:
    case ActionType.CHANGE_NODE: {
      return nodeReducer(state, action)
    }
  }
  return state
}