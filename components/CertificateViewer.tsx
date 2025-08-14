'use client';

import { useState } from 'react';
import { urlFor } from '@/sanity/utils';
import dynamic from 'next/dynamic';
import { X, ChevronLeft, ChevronRight, Eye, Download, Image as ImageIcon } from 'lucide-react';

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

interface AdditionalImage {
  _key: string;
  asset: {
    _ref: string;
  };
  alt?: string;
  caption?: string;
}

interface CertificateViewerProps {
  certificateFile?: string;
  thumbnailImage?: string;
  fileType?: 'pdf' | 'image';
  certificateName: string;
  description?: string;
  additionalImages?: AdditionalImage[];
  className?: string;
}

export default function CertificateViewer({ 
  certificateFile, 
  thumbnailImage, 
  fileType, 
  certificateName,
  description,
  additionalImages = [],
  className = ""
}: CertificateViewerProps) {
  const [showFullView, setShowFullView] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'certificate' | 'images'>('certificate');

  // Combine certificate and additional images for gallery
  const allImages = [
    ...(thumbnailImage ? [{ type: 'thumbnail', src: thumbnailImage, alt: certificateName, caption: 'Certificate Preview' }] : []),
    ...additionalImages.map((img, index) => ({
      type: 'additional',
      src: urlFor(img).url(),
      alt: img.alt || `${certificateName} image ${index + 1}`,
      caption: img.caption
    }))
  ];

  const hasImages = allImages.length > 0;
  const hasAdditionalImages = additionalImages.length > 0;

  // If no certificate file, show placeholder
  if (!certificateFile) {
    return (
      <div className={`bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v1.586l8.707 8.707a1 1 0 001.414 0L20.828 6.5a1 1 0 000-1.414L12.707.379a1 1 0 00-1.414 0L2.586 9.086A2 2 0 002 10.586V17a2 2 0 002 2h11a2 2 0 002-2v-5a1 1 0 10-2 0v5H4v-6.414l7-7 7.707 7.707-7 7H9a1 1 0 100 2h8a2 2 0 002-2V5a2 2 0 00-2-2H4z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-gray-500 font-medium mb-2">{certificateName}</p>
        <p className="text-sm text-gray-400">Certificate file not available</p>
      </div>
    );
  }

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPdfError(null);
  };

  const onDocumentLoadError = () => {
    setPdfError('Failed to load PDF. The file might be corrupted or unavailable.');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const nextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const prevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  return (
    <>
      {/* Certificate Card */}
      <div className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
        <div className="relative group cursor-pointer" onClick={() => setShowFullView(true)}>
          {/* Thumbnail or PDF Preview */}
          <div className="aspect-[3/4] bg-gray-50 rounded-t-lg overflow-hidden">
            {thumbnailImage ? (
              <img 
                src={thumbnailImage} 
                alt={`${certificateName} preview`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-blue-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-600">PDF Document</p>
                </div>
              </div>
            )}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 rounded-t-lg flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-3">
              <button
                className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setViewMode('certificate');
                  setShowFullView(true);
                }}
              >
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
              {hasAdditionalImages && (
                <button
                  className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewMode('images');
                    setShowFullView(true);
                  }}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Gallery</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Certificate Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{certificateName}</h3>
          {description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{description}</p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {fileType?.toUpperCase() || 'PDF'}
            </span>
            {hasAdditionalImages && (
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                +{additionalImages.length} images
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Full View Modal */}
      {showFullView && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full w-full h-full flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-white">{certificateName}</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode('certificate')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      viewMode === 'certificate'
                        ? 'bg-white text-gray-900'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    Certificate
                  </button>
                  {hasAdditionalImages && (
                    <button
                      onClick={() => setViewMode('images')}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        viewMode === 'images'
                          ? 'bg-white text-gray-900'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      Gallery ({additionalImages.length})
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {certificateFile && (
                  <a
                    href={certificateFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 text-white px-3 py-2 rounded hover:bg-gray-600 transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </a>
                )}
                <button
                  onClick={() => setShowFullView(false)}
                  className="text-white hover:text-gray-300 transition-colors p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 bg-white rounded-lg overflow-hidden">
              {viewMode === 'certificate' ? (
                /* Certificate View */
                <div className="h-full flex flex-col">
                  {fileType === 'pdf' ? (
                    /* PDF Viewer */
                    <div className="flex-1 overflow-auto">
                      {pdfError ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center p-8">
                            <div className="w-16 h-16 bg-red-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className="text-red-600 font-medium mb-2">Error Loading PDF</p>
                            <p className="text-gray-600 text-sm">{pdfError}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center p-4">
                          <Document
                            file={certificateFile}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={onDocumentLoadError}
                            className="shadow-lg"
                          >
                            <Page 
                              pageNumber={pageNumber} 
                              className="max-w-full h-auto"
                              renderAnnotationLayer={false}
                              renderTextLayer={false}
                            />
                          </Document>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Image View */
                    <div className="h-full flex items-center justify-center p-4">
                      <img 
                        src={certificateFile} 
                        alt={certificateName}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}

                  {/* PDF Navigation */}
                  {fileType === 'pdf' && numPages > 1 && !pdfError && (
                    <div className="bg-gray-100 px-4 py-3 flex items-center justify-between">
                      <button
                        onClick={prevPage}
                        disabled={pageNumber <= 1}
                        className="flex items-center space-x-1 px-3 py-1 bg-white border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>
                      
                      <span className="text-sm text-gray-600">
                        Page {pageNumber} of {numPages}
                      </span>
                      
                      <button
                        onClick={nextPage}
                        disabled={pageNumber >= numPages}
                        className="flex items-center space-x-1 px-3 py-1 bg-white border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Images Gallery View */
                hasImages && (
                  <div className="h-full flex flex-col">
                    {/* Main Image */}
                    <div className="flex-1 flex items-center justify-center p-4 bg-gray-900">
                      <img 
                        src={allImages[currentImageIndex]?.src} 
                        alt={allImages[currentImageIndex]?.alt}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    {/* Image Navigation */}
                    <div className="bg-white p-4">
                      <div className="flex items-center justify-between mb-3">
                        <button
                          onClick={prevImage}
                          disabled={allImages.length <= 1}
                          className="flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Previous</span>
                        </button>
                        
                        <span className="text-sm text-gray-600 font-medium">
                          {currentImageIndex + 1} of {allImages.length}
                        </span>
                        
                        <button
                          onClick={nextImage}
                          disabled={allImages.length <= 1}
                          className="flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                        >
                          <span>Next</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Image Caption */}
                      {allImages[currentImageIndex]?.caption && (
                        <div className="text-center">
                          <p className="text-sm text-gray-600">{allImages[currentImageIndex].caption}</p>
                        </div>
                      )}

                      {/* Thumbnail Strip */}
                      {allImages.length > 1 && (
                        <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                          {allImages.map((img, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                                index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                              }`}
                            >
                              <img 
                                src={img.src} 
                                alt={img.alt}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
