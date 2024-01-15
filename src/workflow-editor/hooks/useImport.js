import { message } from "antd";
import { useCallback } from "react";
import { getTheFiles } from "../utils/getFIles";
import { useEditorEngine } from "./useEditorEngine";
import { useTranslate } from "../react-locales";

// export interface IFlowJson {
//   startNode?: IWorkFlowNode
// }

export function useImport() {
  const edtorStore = useEditorEngine()
  const t = useTranslate()

  const doImport = useCallback(() => {
    getTheFiles(".json").then((fileHandles) => {
      fileHandles?.[0]?.getFile().then((file) => {
        file.text().then((fileData) => {
          try {
            const flowJson = JSON.parse(fileData);
            if (flowJson.startNode) {
              edtorStore?.setStartNode(flowJson.startNode)
            } else {
              message.error(t("fileIllegal"));
            }
          } catch (error) {
            console.error(error);
            message.error(t("fileIllegal"));
          }
        });
      });
    }).catch(err => {
      console.error(err)
    });
  }, [edtorStore, t]);

  return doImport
}