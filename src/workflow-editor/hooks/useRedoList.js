import { useCallback, useEffect, useState } from "react"
import { useEditorEngine } from "./useEditorEngine"

export function useRedoList() {
  const [redoList, setRedoList] = useState([])
  const store = useEditorEngine()

  const handleRedoListChange = useCallback((list) => {
    setRedoList(list)
  }, [])

  useEffect(() => {
    const unsub = store?.subscribeRedoListChange(handleRedoListChange)
    return unsub
  }, [handleRedoListChange, store])

  useEffect(() => {
    setRedoList(store?.store.getState().redoList || [])
  }, [store?.store])

  return redoList
}