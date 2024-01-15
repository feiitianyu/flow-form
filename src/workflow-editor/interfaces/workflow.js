export const NodeType = {
    //开始节点
    start: "start",
    //审批人
    approver: "approver",
    //抄送人？
    notifier: "notifier",
    //处理人？
    audit: "audit",
    //路由(条件节点)，下面包含分支节点
    route: "route",
    //分支节点
    condition: "condition",
}