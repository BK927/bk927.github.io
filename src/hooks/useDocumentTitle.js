import { useEffect } from "react";
import { DEFAULT_TITLE } from "settings";

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title ? title + " - " + DEFAULT_TITLE : DEFAULT_TITLE;
  }, [title]);
};

export default useDocumentTitle;
