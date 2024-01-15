import { ActionType } from "../actions";
import { NodeType } from "../interfaces";

function recursive(state, action) {
  let childNode = state.childNode
  let newState = state
  if (state.childNode) {
    childNode = nodeReducer(state.childNode, action)
  }
  //如果childNode有变化
  if (childNode !== state.childNode) {
    newState = { ...state, childNode }
  }

  //所有condition list可能会全部刷新，体量不大，暂时不需要处理
  if (newState.nodeType === NodeType.route) {
    if (newState === state) {
      newState = { ...state }
    }
    const routeNode = newState
    routeNode.conditionNodeList = routeNode.conditionNodeList.map(con => nodeReducer(con, action))
  }
  return newState
}

export function nodeReducer(state, action) {
  const deleteNodeAction = action
  const addNodeAction = action
  const changeNodeAction = action

  switch (action.type) {
    case ActionType.DELETE_NODE: {
      const idToDelete = deleteNodeAction.payload.id
      //子节点被删除（不是分支）
      if (idToDelete === state.childNode?.id) {
        return { ...state, childNode: state.childNode.childNode }
      }
      return recursive(state, action)
    }
    case ActionType.ADD_NODE: {
      if (state.id === addNodeAction.payload.parentId) {
        return { ...state, childNode: { ...addNodeAction.payload.node, childNode: state.childNode } }
      }

      return recursive(state, action)
    }
    case ActionType.CHANGE_NODE: {
      if (state.id === changeNodeAction.payload.node.id) {
        return changeNodeAction.payload.node
      }
      return recursive(state, action)
    }
  }
  return state
}
