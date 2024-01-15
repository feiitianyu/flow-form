import { ActionType } from "../actions";

export function errorsReducer(state, action) {
  switch (action.type) {
    case ActionType.SET_ERRORS: {
      return action.payload?.errors
    }
  }
  return state
}
