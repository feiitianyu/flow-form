import { configureStore } from "@reduxjs/toolkit"
import { mainReducer } from "../reducers"
import { NodeType } from "../interfaces"
import { ActionType } from "../actions"
import { createUuid } from "../utils/create-uuid"

export class EditorEngine {
  store
  t = (msg) => msg
  materials = []
  materialUis = {}
  constructor(debugMode,) {
    this.store = makeStoreInstance(debugMode || false)
  }

  getNode(nodeId, parentNode) {
    const startNode = parentNode || this.store.getState().startNode
    if (startNode?.id === nodeId && nodeId) {
      return startNode
    }
    if (startNode?.childNode) {
      const foundNode = this.getNode(nodeId, startNode?.childNode)
      if (foundNode) {
        return foundNode
      }
    }
    if (startNode?.nodeType === NodeType.route) {
      for (const conditionNode of startNode.conditionNodeList) {
        const foundNode = this.getNode(nodeId, conditionNode)
        if (foundNode) {
          return foundNode
        }
      }
    }
    return undefined
  }

  validate = () => {
    const setValidatedAction = {
      type: ActionType.SET_VALIDATED,
      payload: {
        validated: true
      }
    }
    this.dispatch(setValidatedAction)

    const errors = {}
    this.setErrors({})
    this.doValidateNode(this.store.getState().startNode, errors)
    if (Object.keys(errors).length > 0) {
      this.setErrors(errors)
      return errors
    }
    return true;
  }


  setErrors(errors) {
    const setErrorsAction = {
      type: ActionType.SET_ERRORS,
      payload: {
        errors
      }
    }
    this.store.dispatch(setErrorsAction)
  }

  dispatch = (action) => {
    this.store.dispatch(action)
  }

  backup = () => {
    const state = this.store.getState();
    const setUndoListAction = {
      type: ActionType.SET_UNOLIST,
      payload: {
        list: [...state.undoList, { startNode: state.startNode, validated: state.validated }]
      }
    }
    this.dispatch(setUndoListAction)
    const setRedoListAction = {
      type: ActionType.SET_REDOLIST,
      payload: {
        list: []
      }
    }
    this.dispatch(setRedoListAction)
  }

  undo = () => {
    const state = this.store.getState();
    const newUndoList = [...state.undoList]
    const snapshot = newUndoList.pop()
    if (!snapshot) {
      console.error("No element in undo list")
      return
    }
    const setUndoListAction = {
      type: ActionType.SET_UNOLIST,
      payload: {
        list: newUndoList
      }
    }

    this.dispatch(setUndoListAction)

    const setRedoListAction = {
      type: ActionType.SET_REDOLIST,
      payload: {
        list: [...state.redoList, { startNode: state.startNode }]
      }
    }
    this.dispatch(setRedoListAction)
    const setStartNodeAction = {
      type: ActionType.SET_START_NODE,
      payload: {
        node: snapshot?.startNode
      }
    }
    this.dispatch(setStartNodeAction)

    const setValidatedAction = {
      type: ActionType.SET_VALIDATED,
      payload: {
        validated: snapshot?.validated,
      }
    }
    this.dispatch(setValidatedAction)
  }

  redo = () => {
    const state = this.store.getState();
    const newRedoList = [...state.redoList]
    const snapshot = newRedoList.pop()
    if (!snapshot) {
      console.error("No element in redo list")
      return
    }
    const setRedoListAction = {
      type: ActionType.SET_REDOLIST,
      payload: {
        list: newRedoList
      }
    }

    this.dispatch(setRedoListAction)

    const setUndoListAction = {
      type: ActionType.SET_UNOLIST,
      payload: {
        list: [...state.undoList, { startNode: state.startNode }]
      }
    }
    this.dispatch(setUndoListAction)

    const setStartNodeAction = {
      type: ActionType.SET_START_NODE,
      payload: {
        node: snapshot?.startNode
      }
    }
    this.dispatch(setStartNodeAction)

    const setValidatedAction = {
      type: ActionType.SET_VALIDATED,
      payload: {
        validated: snapshot?.validated,
      }
    }
    this.dispatch(setValidatedAction)
  }

  setStartNode(node) {
    this.backup()
    const setStartNodeAction = {
      type: ActionType.SET_START_NODE,
      payload: {
        node
      }
    }

    this.dispatch(setStartNodeAction)
    this.revalidate()
  }

  changeNode(node) {
    this.backup()
    const changeNodeAction = {
      type: ActionType.CHANGE_NODE,
      payload: {
        node
      }
    }

    this.dispatch(changeNodeAction)
    this.revalidate()
  }

  addCondition(node, condition) {
    const newNode = { ...node, conditionNodeList: [...node.conditionNodeList, condition] };
    this.changeNode(newNode)
  }

  changeCondition(node, condition) {
    const newNode = { ...node, conditionNodeList: node.conditionNodeList.map(con => con.id === condition.id ? condition : con) };
    this.changeNode(newNode)
  }

  removeCondition(node, conditionId) {
    //如果只剩2个分支，则删除节点
    if (node.conditionNodeList.length <= 2) {
      this.removeNode(node.id)
      return
    }
    this.backup()
    const newNode = { ...node, conditionNodeList: node.conditionNodeList.filter(co => co.id !== conditionId) };
    this.changeNode(newNode)
  }

  //条件左移一位
  transConditionOneStepToLeft(node, index) {
    if (index > 0) {
      this.backup()
      const newConditions = [...node.conditionNodeList]
      newConditions[index] = newConditions.splice(index - 1, 1, newConditions[index])[0]
      const newNode = { ...node, conditionNodeList: newConditions };
      this.changeNode(newNode)
    }
  }

  //条件右移一位
  transConditionOneStepToRight(node, index) {
    const newConditions = [...node.conditionNodeList]
    if (index < newConditions.length - 1) {
      this.backup()
      newConditions[index] = newConditions.splice(index + 1, 1, newConditions[index])[0]
      const newNode = { ...node, conditionNodeList: newConditions };
      this.changeNode(newNode)
    }
  }

  //克隆一个条件
  cloneCondition(node, condition) {
    const newCondition = JSON.parse(JSON.stringify(condition))
    newCondition.name = newCondition.name + this.t?.("ofCopy")
    //重写Id
    resetId(newCondition)
    const index = node.conditionNodeList.indexOf(condition)
    const newList = [...node.conditionNodeList]
    newList.splice(index + 1, 0, newCondition)
    const newNode = { ...node, conditionNodeList: newList };
    this.changeNode(newNode)
  }

  addNode(parentId, node) {
    this.backup()
    const addAction = { type: ActionType.ADD_NODE, payload: { parentId, node } }
    this.store.dispatch(addAction)
    this.revalidate()
  }

  selectNode(id) {
    const selectAction = { type: ActionType.SELECT_NODE, payload: { id } }
    this.store.dispatch(selectAction)
  }

  removeNode(id) {
    if (id) {
      this.backup()
      const removeAction = { type: ActionType.DELETE_NODE, payload: { id } }
      this.store.dispatch(removeAction)
      this.revalidate()
    }
  }

  subscribeStartNodeChange(listener) {
    let previousState = this.store.getState().startNode

    const handleChange = () => {
      const nextState = this.store.getState().startNode
      if (nextState === previousState) {
        return
      }
      previousState = nextState
      listener(nextState)
    }

    return this.store.subscribe(handleChange)
  }

  subscribeSelectedChange(listener) {
    let previousState = this.store.getState().selectedId

    const handleChange = () => {
      const nextState = this.store.getState().selectedId
      if (nextState === previousState) {
        return
      }
      previousState = nextState
      listener(nextState)
    }

    return this.store.subscribe(handleChange)
  }

  subscribeUndoListChange(listener) {
    let previousState = this.store.getState().undoList

    const handleChange = () => {
      const nextState = this.store.getState().undoList
      if (nextState === previousState) {
        return
      }
      previousState = nextState
      listener(nextState)
    }

    return this.store.subscribe(handleChange)
  }

  subscribeRedoListChange(listener) {
    let previousState = this.store.getState().redoList

    const handleChange = () => {
      const nextState = this.store.getState().redoList
      if (nextState === previousState) {
        return
      }
      previousState = nextState
      listener(nextState)
    }

    return this.store.subscribe(handleChange)
  }

  subscribeErrorsChange(listener) {
    let previousState = this.store.getState().errors

    const handleChange = () => {
      const nextState = this.store.getState().errors
      if (nextState === previousState) {
        return
      }
      previousState = nextState
      listener(nextState)
    }

    return this.store.subscribe(handleChange)
  }


  //审批流节点不多，节点变化全部重新校验一遍，无需担心性能问题，以后有需求再优化
  revalidate = () => {
    if (this.store.getState().validated) {
      this.validate()
    }
  }

  doValidateNode = (node, errors) => {
    const materialUi = this.materialUis[node.nodeType]
    if (materialUi?.validate) {
      const result = materialUi.validate(node, { t: this.t })
      if (result !== true && result !== undefined) {
        errors[node.id] = result
      }
    }
    if (node.childNode) {
      this.doValidateNode(node.childNode, errors)
    }
    if (node.nodeType === NodeType.route) {
      for (const condition of node.conditionNodeList) {
        this.doValidateNode(condition, errors)
      }
    }
  }
}

function resetId(node) {
  node.id = createUuid()
  if (node.childNode) {
    resetId(node.childNode)
  }
  if (node.nodeType === NodeType.route) {
    for (const condition of node.conditionNodeList) {
      resetId(condition)
    }
  }
}

function makeStoreInstance(debugMode) {
  // TODO: if we ever make a react-native version of this,
  // we'll need to consider how to pull off dev-tooling
  const reduxDevTools =
    typeof window !== 'undefined' &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.__REDUX_DEVTOOLS_EXTENSION__
  return configureStore(
    {
      reducer: mainReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
      devTools: debugMode &&
        reduxDevTools &&
        reduxDevTools({
          name: 'dnd-core',
          instanceId: 'dnd-core',
        }),
    }
  )
}
