import { ActionType } from "../actions"

export function changeFlagReducer(state, action) {
  switch (action.type) {
    case ActionType.SET_CHANGE_FLAG: {
      return action.payload?.changeFlag
    }
    case ActionType.SET_START_NODE: {
      return false
    }
    case ActionType.SET_REDOLIST:
    case ActionType.SET_UNOLIST:
      return true
  }
  return state
}