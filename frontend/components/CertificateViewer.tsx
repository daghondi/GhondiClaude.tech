'use client';

import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface CertificateViewerProps {
  certificateFile?: string;
  thumbnailImage?: string;
  fileType?: 'pdf' | 'image';
  certificateName: string;
  className?: string;
}

export default function CertificateViewer({ 
  certificateFile, 
  thumbnailImage, 
  fileType, 
  certificateName,
  className = ""
}: CertificateViewerProps) {
  const [showFullView, setShowFullView] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfError, setPdfError] = useState<string | null>(null);

  // If no certificate file, show placeholder
  if (!certificateFile) {
    return (
      <div className={`bg-dark-card/50 border-2 border-dashed border-gray-600 rounded-lg p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v1.586l8.707 8.707a1 1 0 001.414 0L20.828 6.5a1 1 0 000-1.414L12.707.379a1 1 0 00-1.414 0L2.586 9.086A2 2 0 002 10.586V17a2 2 0 002 2h11a2 2 0 002-2v-5a1 1 0 10-2 0v5H4v-6.414l7-7 7.707 7.707-7 7H9a1 1 0 100 2h8a2 2 0 002-2V5a2 2 0 00-2-2H4z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-gray-400 text-sm">Certificate file will be displayed here</p>
        <p className="text-gray-500 text-xs mt-1">Upload your certificate to the Skills and certificates folder</p>
      </div>
    );
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPdfError(null);
  }

  function onDocumentLoadError(error: Error) {
    setPdfError(`Failed to load PDF: ${error.message}`);
  }

  // Display thumbnail/preview
  const renderPreview = () => {
    if (fileType === 'image' || thumbnailImage) {
      return (
        <img
          src={thumbnailImage || certificateFile}
          alt={`${certificateName} certificate`}
          className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setShowFullView(true)}
        />
      );
    } else if (fileType === 'pdf') {
      return (
        <div className="relative cursor-pointer" onClick={() => setShowFullView(true)}>
          <Document
            file={certificateFile}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue"></div>
              </div>
            }
          >
            <Page
              pageNumber={1}
              width={300}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
          {numPages > 1 && (
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {numPages} pages
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h3a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L12.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      );
    }
  };

  // Full view modal
  if (showFullView) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
        <div className="relative max-w-6xl max-h-full overflow-auto bg-white rounded-lg">
          <button
            onClick={() => setShowFullView(false)}
            className="absolute top-4 right-4 z-10 bg-black/70 text-white rounded-full p-2 hover:bg-black/90 transition-colors"
            aria-label="Close certificate viewer"
            title="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {fileType === 'image' ? (
            <img
              src={certificateFile}
              alt={`${certificateName} certificate`}
              className="max-w-full max-h-full"
            />
          ) : fileType === 'pdf' ? (
            <div className="text-center">
              {pdfError ? (
                <div className="p-8 text-red-500">
                  <p>{pdfError}</p>
                  <button
                    onClick={() => window.open(certificateFile, '_blank')}
                    className="mt-4 px-4 py-2 bg-accent-blue text-white rounded hover:bg-accent-blue/80 transition-colors"
                  >
                    Open PDF in new tab
                  </button>
                </div>
              ) : (
                <>
                  <Document
                    file={certificateFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                  >
                    <Page pageNumber={pageNumber} width={800} />
                  </Document>
                  
                  {numPages > 1 && (
                    <div className="mt-4 flex items-center justify-center gap-4">
                      <button
                        onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                        disabled={pageNumber <= 1}
                        className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50 hover:bg-gray-700 transition-colors"
                      >
                        Previous
                      </button>
                      <span className="text-gray-700">
                        Page {pageNumber} of {numPages}
                      </span>
                      <button
                        onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                        disabled={pageNumber >= numPages}
                        className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50 hover:bg-gray-700 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative overflow-hidden rounded-lg ${className}`}>
      {renderPreview()}
      
      {/* Download/View button */}
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(certificateFile, '_blank');
          }}
          className="bg-accent-blue/90 hover:bg-accent-blue text-white p-2 rounded-lg transition-colors"
          title="Download/View Certificate"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
