import * as React from "react";
import {
  defineComponents,
  DocumentReaderService,
} from "@regulaforensics/vp-frontend-document-components-beta";

const containerStyle = {
  display: "flex",
  position: "absolute",
  height: "100%",
  width: "100%",
  top: 0,
  left: 0,
  justifyContent: "center",
  alignItems: "center",
};

const buttonStyle = {
  padding: "10px 30px",
  color: "white",
  fontSize: "16px",
  borderRadius: "2px",
  backgroundColor: "#bd7dff",
  border: "1px solid #bd7dff",
  cursor: "pointer",
};

function App() {
  const containerRef = React.useRef(null);
  const listener = (data) => {
    if (data.detail.action === "PROCESS_FINISHED") {
      const status = data.detail.data?.status;
      const isFinishStatus = status === 1 || status === 2;

      if (isFinishStatus && data.detail.data?.response) {
        console.log(data.detail.data.response);
      }
    }
  };

  React.useEffect(() => {
    const containerCurrent = containerRef.current;

    window.RegulaDocumentSDK = new DocumentReaderService();

    defineComponents().then(async () => {
      await window.RegulaDocumentSDK.prepare();
    });

    if (!containerCurrent) return;

    containerCurrent.addEventListener("document-reader", listener);

    return () => {
      containerCurrent.removeEventListener("document-reader", listener);
    };
  }, []);

  return (
    <div style={containerStyle} ref={containerRef}>
      <document-reader start-screen={false} license="license"></document-reader>
    </div>
  );
}

export default App;
