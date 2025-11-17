interface Props {
  onApprove: () => void;
  onReject: () => void;
  onRequestDocs: () => void;
}

export default function RiskActionButtons({
  onApprove,
  onReject,
  onRequestDocs,
}: Props) {
  return (
    <div className="flex justify-center gap-3 mt-6">
      <button
        className="px-4 py-2 bg-green-600 text-whitw rounded-xl hover:bg-green-700 transition"
        onClick={onApprove}
      >
        Aproba
      </button>
      <button
        className="px-4 py-2 bg-red-600 text-whitw rounded-xl hover:bg-red-700 transition"
        onClick={onReject}
      >
        Respinge
      </button>
      <button
        className="px-4 py-2 bg-yellow-600 text-whitw rounded-xl hover:bg-yellow-700 transition"
        onClick={onRequestDocs}
      >
        Cere Documente
      </button>
    </div>
  );
}
