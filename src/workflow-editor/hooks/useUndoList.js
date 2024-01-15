import { useCallback, useEffect, useState } from "react"
import { useEditorEngine } from "./useEditorEngine"

export function useUndoList() {
  const [undoList, setSetUndoList] = useState([])
  const store = useEditorEngine()

  const handleUndoListChange = useCallback((list) => {
    setSetUndoList(list)
  }, [])

  useEffect(() => {
    const unsub = store?.subscribeUndoListChange(handleUndoListChange)
    return unsub
  }, [handleUndoListChange, store])

  useEffect(() => {
    setSetUndoList(store?.store.getState().undoList || [])
  }, [store?.store])

  return undoList
}