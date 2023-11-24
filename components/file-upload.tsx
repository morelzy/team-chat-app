'use client'

import { X } from 'lucide-react'
import Image from 'next/image'

import { UploadDropzone } from '@/lib/uploadthing'

import '@uploadthing/react/styles.css'

interface FileUploadProps {
  onChange: (url?: string) => void
  value: string
  endpoint: 'messageFile' | 'serverImage'
}

export function FileUpload({ endpoint, onChange, value }: FileUploadProps) {
  const fileType = value.split('.').pop()

  if (value && fileType !== 'pdf') {
    return (
      <div className="relative h-20 w-20">
        <Image fill alt="Upload" className="rounded-full" src={value} />
        <button
          className="absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm"
          type="button"
          onClick={() => {
            onChange('')
          }}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        console.log(error)
      }}
    />
  )
}
