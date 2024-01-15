export const OperatorType = {
    //等于
    Eq: "eq",
    //不等于
    Ne: "ne",
    //大于
    Gt: "gt",
    //小于,
    Lt: "lt",
    //小于等于
    Le: "le",
    //大于等于
    Ge: "ge",
    //包含
    Like: "like",
    //开头包含
    LikeStart: "like_start",
    //结尾包含
    LikeEnd: "like_end",
    //不为空
    NotEmpty: "not_empty",
    //为空
    Empty: "empty"
}

export const ExpressionNodeType = {
  Expression: "expression",
  Group: "group"
}

export const ExpressionGroupType = {
  And: "and",
  Or: "or"
}

export const AuthType = {
  read: "read",
  edit: "edit",
  hide: "hide",
}
