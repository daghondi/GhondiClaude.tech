'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import PDF components to prevent SSR issues
const Document = dynamic(
  () => import('react-pdf').then((mod) => mod.Document),
  { ssr: false }
);

const Page = dynamic(
  () => import('react-pdf').then((mod) => mod.Page),
  { ssr: false }
);

// Configure PDF.js worker only on client side
if (typeof window !== 'undefined') {
  import('react-pdf').then((module) => {
    module.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${module.pdfjs.version}/build/pdf.worker.min.js`;
  });
}

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
      <div className={`bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v1.586l8.707 8.707a1 1 0 001.414 0L20.828 6.5a1 1 0 000-1.414L12.707.379a1 1 0 00-1.414 0L2.586 9.086A2 2 0 002 10.586V17a2 2 0 002 2h11a2 2 0 002-2v-5a1 1 0 10-2 0v5H4v-6.414l7-7 7.707 7.707-7 7H9a1 1 0 100 2h8a2 2 0 002-2V5a2 2 0 00-2-2H4z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-gray-600 text-sm">Certificate file will be displayed here</p>
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
          {typeof window !== 'undefined' && Document ? (
            <Document
              file={certificateFile}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              }
            >
              {Page && (
                <Page
                  pageNumber={1}
                  width={300}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              )}
            </Document>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
              <div className="text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 5a1 1 0 000 2h6a1 1 0 100-2H7zm0 4a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <p className="text-sm">PDF Preview</p>
              </div>
            </div>
          )}
          {numPages > 1 && (
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {numPages} pages
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
          ) : fileType === 'pdf' && typeof window !== 'undefined' && Document ? (
            <div className="text-center">
              {pdfError ? (
                <div className="p-8 text-red-500">
                  <p>{pdfError}</p>
                  <button
                    onClick={() => window.open(certificateFile, '_blank')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
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
                    {Page && <Page pageNumber={pageNumber} width={800} />}
                  </Document>
                  
                  {numPages > 1 && (
                    <div className="mt-4 flex items-center justify-center gap-4">
                      <button
                        onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                        disabled={pageNumber <= 1}
                        className="px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-50 hover:bg-gray-800 transition-colors"
                      >
                        Previous
                      </button>
                      <span className="text-gray-900 font-medium">
                        Page {pageNumber} of {numPages}
                      </span>
                      <button
                        onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                        disabled={pageNumber >= numPages}
                        className="px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-50 hover:bg-gray-800 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : fileType === 'pdf' ? (
            <div className="p-8 text-center">
              <p className="mb-4 text-gray-600">PDF viewer is loading...</p>
              <button
                onClick={() => window.open(certificateFile, '_blank')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Open PDF in new tab
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative overflow-hidden rounded-lg ${className}`}>
      {renderPreview()}
      
      {/* View button */}
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowFullView(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors shadow-lg"
          title="View Certificate"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
