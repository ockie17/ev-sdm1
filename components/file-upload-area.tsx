'use client'

import { useState, useRef } from 'react'
import { Upload, File, AlertCircle, CheckCircle2 } from 'lucide-react'

interface FileUploadProps {
  onFileSelect?: (file: File) => void
  acceptedFormats?: string[]
  maxFileSize?: number
}

export function FileUploadArea({ 
  onFileSelect, 
  acceptedFormats = ['.csv', '.json'],
  maxFileSize = 10 * 1024 * 1024 
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): boolean => {
    setError(null)

    if (file.size > maxFileSize) {
      setError(`File size exceeds ${maxFileSize / 1024 / 1024}MB limit`)
      return false
    }

    const fileName = file.name.toLowerCase()
    const hasValidExtension = acceptedFormats.some(format => fileName.endsWith(format.toLowerCase()))
    
    if (!hasValidExtension) {
      setError(`Please upload a ${acceptedFormats.join(' or ')} file`)
      return false
    }

    return true
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (validateFile(file)) {
        setSelectedFile(file)
        onFileSelect?.(file)
      }
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      const file = files[0]
      if (validateFile(file)) {
        setSelectedFile(file)
        onFileSelect?.(file)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-primary bg-primary/10'
            : 'border-border hover:border-primary hover:bg-border/30'
        } ${error ? 'border-red-500 bg-red-500/10' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />

        {!selectedFile ? (
          <>
            <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Drop your file here or click to browse
            </h3>
            <p className="text-muted-foreground mb-2">
              Supported formats: {acceptedFormats.join(', ')}
            </p>
            <p className="text-xs text-muted-foreground">
              Max file size: {maxFileSize / 1024 / 1024}MB
            </p>
          </>
        ) : (
          <>
            <File className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="text-foreground font-medium">{selectedFile.name}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
          </>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span className="text-sm text-red-600">{error}</span>
        </div>
      )}

      {selectedFile && !error && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
          <span className="text-sm text-green-600">File selected and ready to upload</span>
        </div>
      )}
    </div>
  )
}
