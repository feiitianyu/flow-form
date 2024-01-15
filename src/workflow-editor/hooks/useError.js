import { useCallback, useEffect, useState } from "react"
import { useEditorEngine } from "./useEditorEngine"

export function useError(nodeId) {
  const [errors, setErrors] = useState()

  const store = useEditorEngine()

  const handleErrorsChange = useCallback((errs) => {
    setErrors(errs)
  }, [])

  useEffect(() => {
    const unsub = store?.subscribeErrorsChange(handleErrorsChange)
    return unsub
  }, [handleErrorsChange, store])

  useEffect(() => {
    setErrors(store?.store.getState().errors)
  }, [store?.store])

  return errors?.[nodeId]
}