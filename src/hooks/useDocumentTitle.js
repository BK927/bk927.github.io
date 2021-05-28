import { useEffect } from "react";

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title ? title : "BK927의 웹앱 박스";
  }, [title]);
};

export default useDocumentTitle;
