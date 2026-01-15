interface PDFModalProps {
  pdfUrl: string;
  onClose: () => void;
}

export default function PDFModal({ pdfUrl, onClose }: PDFModalProps) {
  if (!pdfUrl) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[90%] h-[90%] relative overflow-hidden">
        {/* 🔵 Injectăm CSS personalizat pentru toolbar */}
        <style>
          {`
  /* Bara PDF = gri închis */
  .toolbar {
    background-color: #3c3c3c !important;
    height: 48px !important;
  }

  /* Mutăm iconițele PDF MULT spre stânga */
  #toolbarViewerRight {
    margin-right: 120px !important; /* AICI ADJUSTEZI */
    padding-right: 30px !important;
  }

  /* Iconițe albe */
  .toolbarButton > span {
    filter: invert(1) !important;
  }

  /* X custom */
  .pdf-close-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;
  }

  .pdf-close-btn:hover {
    background: rgba(255,255,255,0.2);
  }
`}
        </style>

        {/* 🔵 X Button în bara PDF */}
        <div className="absolute top-[8px] right-[8px] z-[80]">
          <div className="pdf-close-btn" onClick={onClose}>
            <span className="text-white text-xl font-bold">×</span>
          </div>
        </div>

        {/* PDF Viewer */}
        <iframe
          src={pdfUrl}
          className="w-full h-full rounded-xl"
          title="PDF Preview"
        ></iframe>
      </div>
    </div>
  );
}
