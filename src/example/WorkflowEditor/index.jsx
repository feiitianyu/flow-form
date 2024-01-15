import { memo } from "react"
import { WorkFlowEditorInner } from "./WorkFlowEditorInner"
import { FlowEditorScope } from "../../workflow-editor/"

// export type WorkflowEditorProps = {
//   themeMode?: 'dark' | 'light',
//   themeToken?: IThemeToken,
//   lang?: string,
//   locales?: ILocales,
//   materialUis?: IMaterialUIs,
// }

export const WorkflowEditor = memo((props) => {
  const { themeMode, themeToken, lang, locales, materialUis, ...other } = props;
  return (
    <FlowEditorScope
      mode={themeMode}
      themeToken={themeToken}
      lang={lang}
      locales={locales}
      materialUis = {materialUis}
    >
      <WorkFlowEditorInner {...other} />
    </FlowEditorScope>
  )
})