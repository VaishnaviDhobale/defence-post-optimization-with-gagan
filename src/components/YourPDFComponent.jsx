import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export const YourPDFComponent = ({ link }) => {
  const layoutPluginInstance = defaultLayoutPlugin();

  return (
    <div style={{ width: '100%', height: '800px' }}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.11.375/build/pdf.worker.min.js`}>
        <Viewer fileUrl={decodeURIComponent("https://drive.google.com/file/d/1Ny7nXM2cM57btL51CRjiQy3WpKEM8tB8/view?usp=sharing")} plugins={[layoutPluginInstance]} />
      </Worker>
    </div>
  );
};
