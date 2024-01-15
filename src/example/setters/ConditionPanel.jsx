import { memo, useCallback, useState } from "react"
import { Form } from "antd"
import { DefaultExpressionInput, ExpressionGroupType, ExpressionNodeType, ExpressionTreeInput } from "../../workflow-editor"
import { createUuid } from "../../workflow-editor/utils/create-uuid"

// export interface IConditionSettings {

// }

export const ConditionPanel = memo((props) => {
  const [settingsType, setSettingsType] = useState("node")
  const [rootExpression, setRootExpression] = useState({
    id: "root",
    nodeType: ExpressionNodeType.Group,
    groupType: ExpressionGroupType.And,
    children: [
      {
        nodeType: ExpressionNodeType.Expression,
        id: createUuid(),
      }
    ]
  })

  const handleExpressionChange = useCallback((exp) => {
    setRootExpression(exp)
  }, [])

  return (
    <Form layout="vertical" colon={false}>
      <ExpressionTreeInput
        ExpressInput={DefaultExpressionInput}
        value={
          rootExpression
        }
        onChange={handleExpressionChange}
      />
    </Form>
  )
})