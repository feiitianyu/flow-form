import { memo, useCallback, useState } from 'react'
import { Button, Space } from 'antd'
import styled from 'styled-components'
import ShellContainer from './ShellContainer'
import { WorkflowEditor } from './WorkflowEditor'
import { materialUis } from "./materialUis"

const ToolBar = styled.div`
  height: 56px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 8px 16px;
  justify-content: space-between;
`

const Example = memo(() => {

  return (
    <ShellContainer>
      <ToolBar>
        <span>流程表单</span>
        <Space>
          <Button>主题切换</Button>
          <Button>Englist</Button>
        </Space>
      </ToolBar>
      <WorkflowEditor
        // themeMode={themeMode}
        // lang={lang}
        materialUis={materialUis}
      />
    </ShellContainer>
  )
})

export default Example
