import { useEditorEngine } from "./useEditorEngine";

export function useNodeMaterial(node) {
  const store = useEditorEngine()

  return store?.materials.find(material => material.defaultConfig?.nodeType === node?.nodeType)
}