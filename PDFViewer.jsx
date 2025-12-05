import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// ==========================================
// INSTRUCTIONS FOR LOCAL USE:
// 1. Uncomment the 3 lines below
// 2. Ensure you have run: npm install react-pdf
// ==========================================

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewer = ({ file, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative h-[90vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-gray-900 p-2 shadow-2xl custom-scrollbar" 
        onClick={(e) => e.stopPropagation()} 
        onContextMenu={(e) => e.preventDefault()} // Disables Right Click
      >
        <button 
          onClick={onClose}
          className="sticky top-2 right-2 z-50 float-right mb-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-lg hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <X size={16} /> Close
        </button>

        <div className="flex flex-col items-center justify-center min-h-full select-none pb-10">
          
          {/* ============================================================
             UNCOMMENT THIS BLOCK LOCALLY TO ENABLE THE PDF VIEWER
             ============================================================ */}
          {
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex flex-col gap-4"
            loading={
              <div className="flex flex-col items-center justify-center text-white h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                <p>Loading Secure Document...</p>
              </div>
            }
            error={
              <div className="text-red-400 p-10 text-center border border-red-900 rounded-lg bg-red-900/20">
                <p className="text-xl font-bold">Unable to load PDF.</p>
                <p className="text-sm mt-2 opacity-70">Ensure "{file}" exists in your public folder.</p>
              </div>
            }
          >
            {numPages && Array.from(new Array(numPages), (el, index) => (
              <Page 
                key={`page_${index + 1}`} 
                pageNumber={index + 1} 
                renderTextLayer={false}       // PREVENTS SELECTING TEXT
                renderAnnotationLayer={false} // PREVENTS LINKS/DOWNLOADS
                className="shadow-2xl mb-4 border border-gray-800"
                width={Math.min(windowWidth * 0.85, 900)}
              />
            ))}
          </Document>
          }

          

        </div>
      </div>
    </div>
  );
};

export default PDFViewer;