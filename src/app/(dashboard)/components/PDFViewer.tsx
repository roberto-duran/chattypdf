type PDFViewerProps = {
  file: File | string
  fullHeight?: boolean
}

export default function PDFViewer ({
  file,
  fullHeight = false
}: PDFViewerProps) {
  return (
    <object
      data={typeof file === 'string' ? file : URL.createObjectURL(file)}
      type='application/pdf'
      width='100%'
      height='600px'
      className={`${fullHeight ? 'h-full rounded-lg' : ''}`}
    />
  )
}
