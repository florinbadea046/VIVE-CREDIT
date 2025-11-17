import { FileText, Download } from "lucide-react";
import CardWrapper from "./CardWrapper";

interface DocumentItem {
  id: string;
  name: string;
  url: string;
}

interface Props {
  documents: DocumentItem[];
}

export default function DocumentsCard({ documents }: Props) {
  return (
    <CardWrapper
      title="Documente"
      icon={<FileText size={22} className="text-blue-600" />}
    >
      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100"
          >
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-blue-600" />
              <span className="font-medium text-gray-800">{doc.name}</span>
            </div>

            <a
              href={doc.url}
              download
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              <Download size={18} />
              Descărcare
            </a>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}
