import { ActionType } from "../actions"

export function selectedIdReducer(state, action) {
  switch (action.type) {
    case ActionType.SELECT_NODE: {
      return action.payload?.id
    }
  }
  return state
}