import { memo } from "react"
import className from "classnames"

export const ContentPlaceholder = memo((props) => {
  const { text, secondary } = props
  return (
    <span
      className={className("text", secondary ? " secondary" : "")}>
      {text}
    </span>
  )
})