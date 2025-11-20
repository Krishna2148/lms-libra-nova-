import type React from "react"
import { useState } from "react"
import { Upload, Trash2, FileText, ExternalLink } from "lucide-react"

interface ImageUploaderProps {
    onImageSelect: (file: File | null) => void
    documentData: any
    previewURL: string | string[]
    index?: number
    label?: string
    error?: string
    required?: boolean
    handleDeleteImage?: ((index: number) => void) | (() => void)
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    onImageSelect,
    documentData,
    previewURL,
    index = 0,
    label,
    required = false,
    error,
    handleDeleteImage,
}) => {
    const [pdfLoaded, setPdfLoaded] = useState(false)
    const [showPdfFallback, setShowPdfFallback] = useState(false)


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"]
            const isPDF = file.type === "application/pdf"
            const isImage = allowedImageTypes.includes(file.type)

            const maxImageSize = 1.5 * 1024 * 1024 // 1.5MB for images
            const maxPDFSize = 5 * 1024 * 1024 // 5MB for PDFs

            if ((isImage && file.size <= maxImageSize) || (isPDF && file.size <= maxPDFSize)) {
                onImageSelect(file)
                // Reset PDF states when a new file is uploaded
                setPdfLoaded(false)
                setShowPdfFallback(false)
            } else {
                if (!isImage && !isPDF) {
                    alert("Please select a PNG, JPEG, JPG image or PDF document.")
                } else if (isImage && file.size > maxImageSize) {
                    alert("Image size should be 1.5MB or less.")
                } else if (isPDF && file.size > maxPDFSize) {
                    alert("PDF size should be 5MB or less.")
                }
            }
        }
    }

    const handleDelete = () => {
        if (handleDeleteImage) {
            if (handleDeleteImage.length > 0) {
                (handleDeleteImage as (index: number) => void)(index)
            } else {
                (handleDeleteImage as () => void)()
            }
        }
    }

    // Check if the preview is a PDF
    const isPDF = () => {
        const url = getCurrentPreviewURL()
        if (!url) return false

        return url.endsWith('.pdf') ||
            url.includes('application/pdf') ||
            (documentData && documentData[0] && documentData[0].type === "application/pdf")
    }

    // Get the current preview URL
    const getCurrentPreviewURL = () => {
        if (!previewURL) return ""
        return typeof previewURL === "string" ? previewURL : previewURL[index] || ""
    }

    // Handle PDF load error
    const handlePdfLoadError = () => {
        setShowPdfFallback(true)
    }

    // Handle PDF load success
    const handlePdfLoad = () => {
        setPdfLoaded(true)
    }

    // Check if we have a valid preview URL or file
    const hasPreview = () => {
        const currentURL = getCurrentPreviewURL()
        return currentURL && currentURL.trim() !== ""
    }

    return (
        <div className="flex flex-col">
            <span className="text-sm text-black/80 font-medium">{label || "Document Photo/PDF"}{required && <span className="text-red-500"> *</span>}</span>
            <div className="flex flex-col items-center p-3 border-2 mt-1 border-dashed border-gray-300 rounded-lg w-full h-[230px] mx-auto">
                {hasPreview() ? (
                    <div className="relative h-full w-full">
                        {isPDF() ? (
                            <>
                                {/* PDF Preview with fallback */}
                                {!showPdfFallback ? (
                                    <div className="h-full w-full">
                                        <object
                                            data={getCurrentPreviewURL()}
                                            type="application/pdf"
                                            className="h-full w-full rounded-lg"
                                            onError={handlePdfLoadError}
                                            onLoad={handlePdfLoad}
                                        >
                                            {/* This content is displayed if the browser can't display the PDF */}
                                            <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100 rounded-lg">
                                                <FileText size={48} className="text-blue-500 mb-2" />
                                                <p className="text-sm font-medium text-gray-700">PDF Document</p>
                                                <a
                                                    href={getCurrentPreviewURL()}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-2 text-xs text-blue-500 underline flex items-center"
                                                >
                                                    Open PDF <ExternalLink size={12} className="ml-1" />
                                                </a>
                                            </div>
                                        </object>

                                        {/* Loading indicator */}
                                        {!pdfLoaded && !showPdfFallback && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-lg">
                                                <div className="text-center">
                                                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                                    <p className="text-sm text-gray-600">Loading PDF...</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    // Fallback UI when PDF preview fails
                                    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100 rounded-lg">
                                        <FileText size={48} className="text-blue-500 mb-2" />
                                        <p className="text-sm font-medium text-gray-700">PDF Document</p>
                                        <a
                                            href={getCurrentPreviewURL()}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 text-xs text-blue-500 underline flex items-center"
                                        >
                                            Open PDF <ExternalLink size={12} className="ml-1" />
                                        </a>
                                        <button
                                            onClick={() => setShowPdfFallback(false)}
                                            className="mt-2 text-xs text-gray-500"
                                        >
                                            Try loading preview again
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            // Image Preview
                            <img
                                src={getCurrentPreviewURL()}
                                alt={`Uploaded preview`}
                                className="rounded-lg h-full w-full object-contain"
                            />
                        )}

                        {/* Delete button */}
                        {handleDeleteImage && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition duration-200 shadow-md z-10"
                                aria-label="Delete file"
                            >
                                <Trash2 size={18} />
                            </button>
                        )}
                    </div>
                ) : (
                    // Upload UI
                    <label
                        htmlFor={`fileInput-${index}-${label?.replace(/\s+/g, '')}`}
                        className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-center"
                    >
                        <Upload size={40} className="text-gray-400 mb-3" />
                        <p className="text-gray-600 text-sm font-medium">Click to select an image or PDF</p>
                        <p className="text-xs text-gray-400 mt-1">
                            Image: PNG, JPEG, or JPG (max 1.5MB)<br />
                            PDF: max 5MB
                        </p>
                        <span className="mt-4 inline-block mb-1 cursor-pointer bg-white border border-blue-500 text-blue-500 font-semibold py-1.5 text-sm px-6 rounded-lg hover:bg-blue-500 hover:text-white transition duration-200">
                            Browse file
                        </span>
                        <input
                            id={`fileInput-${index}-${label?.replace(/\s+/g, '')}`}
                            type="file"
                            accept=".png,.jpg,.jpeg,.pdf,application/pdf"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                )}
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    )
}

export default ImageUploader