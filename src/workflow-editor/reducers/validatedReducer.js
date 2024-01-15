import { ActionType } from "../actions"

export function validatedReducer(state, action) {
  switch (action.type) {
    case ActionType.SET_VALIDATED: {
      return action.payload?.validated
    }
  }
  return state
}