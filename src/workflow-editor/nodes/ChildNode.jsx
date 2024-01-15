import { memo } from "react"
import { NodeType } from "../interfaces"
import { RouteNode } from "./RouteNode"
import { NormalNode } from "./NormalNode"

export const ChildNode = memo((props) => {
  const { node } = props
  return (
    node.nodeType === NodeType.route
      ? <RouteNode node={node} />
      : <NormalNode node={node} />
  )
})