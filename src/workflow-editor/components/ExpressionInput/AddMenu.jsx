import { Dropdown } from "antd";
import { memo, useMemo } from "react"
import { ExpressionGroupType, ExpressionNodeType } from "../../interfaces";
import { useTranslate } from "../../react-locales";

export const AddMenu = memo((props) => {
  const { onOpenChange, onAddExpression, onAddGroup, children } = props;
  const t = useTranslate();
  const items = useMemo(() => [
    {
      label: t("addExpression"),
      key: ExpressionNodeType.Expression,
      onClick: onAddExpression,
    },
    {
      label: t("addAndGroup"),
      key: ExpressionGroupType.And,
      onClick: () => onAddGroup(ExpressionGroupType.And)
    },
    {
      label: t("addOrGroup"),
      key: ExpressionGroupType.Or,
      onClick: () => onAddGroup(ExpressionGroupType.Or)
    },
  ], [onAddExpression, onAddGroup, t]);

  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      onOpenChange={onOpenChange}
    >
      {children}
    </Dropdown>
  )
})