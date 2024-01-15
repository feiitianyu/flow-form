import { ContentPlaceholder, NodeType } from "../workflow-editor";
import { ApproverPanel } from "./setters/ApproverPanel";
import { AuditPanel } from "./setters/AuditPanel";
import { ConditionPanel } from "./setters/ConditionPanel";
import { NotifierPanel } from "./setters/NotifierPanel";
import { StartPanel } from "./setters/StartPanel";

export const materialUis = {
  //审批人物料UI
  [NodeType.approver]: {
    //节点内容区，只实现了空逻辑，具体过几天实现
    viewContent: (node, { t }) => {
      return <ContentPlaceholder secondary text={t("pleaseChooseApprover")} />
    },
    //属性面板
    settersPanel: ApproverPanel,
    //校验，目前仅实现了空校验，其它校验过几天实现
    validate: (node, { t }) => {
      if (!node.config) {
        return (t("noSelectedApprover"))
      }
      return true
    }
  },
  //办理人节点
  [NodeType.audit]: {
    //节点内容区
    viewContent: (node, { t }) => {
      return <ContentPlaceholder secondary text={t("pleaseChooseDealer")} />
    },
    //属性面板
    settersPanel: AuditPanel,
    //校验函数
    validate: (node, { t }) => {
      if (!node.config) {
        return t("noSelectedDealer")
      }
      return true
    }
  },
  //条件分支节点的分支子节点
  [NodeType.condition]: {
    //节点内容区
    viewContent: (node, { t }) => {
      return <ContentPlaceholder text={t("pleaseSetCondition")} />
    },
    //属性面板
    settersPanel: ConditionPanel,
    //校验函数
    validate: (node, { t }) => {
      if (!node.config) {
        return t("noSetCondition")
      }
      return true
    }
  },
  //通知人节点
  [NodeType.notifier]: {
    viewContent: (node, { t }) => {
      return <ContentPlaceholder text={t("pleaseChooseNotifier")} />
    },
    settersPanel: NotifierPanel,
  },
  //发起人节点
  [NodeType.start]: {
    viewContent: (node, { t }) => {
      return <ContentPlaceholder text={t("allMember")} />
    },
    settersPanel: StartPanel,
  },
}