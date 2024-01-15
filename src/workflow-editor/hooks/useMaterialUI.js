import { useEditorEngine } from "./useEditorEngine";

export function useMaterialUI(node) {
  const store = useEditorEngine()

  return store?.materialUis?.[node?.nodeType || ""]
}