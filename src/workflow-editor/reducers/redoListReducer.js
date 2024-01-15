import { ActionType } from "../actions";

export function redoListReducer(state, action) {
  switch (action.type) {
    case ActionType.SET_REDOLIST: {
      return action.payload.list
    }
  }
  return state
}