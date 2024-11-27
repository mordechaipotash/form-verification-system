import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface PDFViewerProps {
  url: string;
}

export default function PDFViewer({ url }: PDFViewerProps) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="h-full w-full">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
}
