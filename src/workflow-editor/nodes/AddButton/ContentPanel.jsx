import { memo } from "react"
import styled from "styled-components"
import { useEditorEngine } from "../../hooks"
import { MaterialItem } from "./MaterialItem"

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 360px;
`

export const ContentPanel = memo((props) => {
  const { nodeId, onClickMaterial } = props
  const editorStore = useEditorEngine()
  return (
    <Container className="add-node-content">
      {
        editorStore?.materials?.filter(material => !material.hidden).map((material, index) => {
          return (
            <MaterialItem
              nodeId={nodeId}
              key={material.defaultConfig?.nodeType || "" + index}
              material={material}
              onClick={() => onClickMaterial?.(material)}
            />
          )
        })
      }
    </Container>
  )
})