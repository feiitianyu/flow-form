import { memo } from "react";
import { ExpressionGroup } from "./ExpressionGroup";

export const ExpressionTreeInput = memo((props) => {
  const { ExpressInput, value, onChange } = props

  return (
    <ExpressionGroup
      ExpressInput={ExpressInput}
      value={value}
      onChange={onChange}
      root
    />
  )
})