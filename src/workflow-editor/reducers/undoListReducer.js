import { ActionType } from "../actions";

export function undoListReducer(state, action) {
  switch (action.type) {
    case ActionType.SET_UNOLIST: {
      return action.payload.list
    }
  }
  return state
}