import { ConfigProvider, theme } from "antd";
import { memo } from "react"

export const ConfigRoot = memo((props) => {
  const { themeMode, children } = props;
  return (<ConfigProvider
    theme={{
      algorithm: themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm
    }}
  >
    {
      children
    }
  </ConfigProvider>)
})