import { useCallback } from "react";
import { useLocalesManager } from "./useLocalesManager";

export function useTranslate(module) {
  const localesManager = useLocalesManager()
  const t = useCallback((key) => {
    const keyPath = module ? module + "." + key : key
    return localesManager?.getMessage(keyPath) || key
  }, [localesManager, module])

  return t
}