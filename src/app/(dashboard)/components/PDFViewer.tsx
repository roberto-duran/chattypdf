import React from 'react'

type PDFViewerProps = {
  file: File
}

export default function PDFViewer ({ file }: PDFViewerProps) {
  return (
    <object
      data={URL.createObjectURL(file)}
      type='application/pdf'
      width='100%'
      height='600px'
    />
  )
}
