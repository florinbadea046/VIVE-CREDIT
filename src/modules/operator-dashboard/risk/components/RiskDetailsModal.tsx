import RiskActionButtons from "./RiskActionButtons";

interface Props {
  application: any;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  onRequestDocs: () => void;
}

export default function RiskDetailsModal({
  application,
  onClose,
  onApprove,
  onReject,
  onRequestDocs,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white rounded-2xl p-6 shadow-lg w-[480px]">
        <h2 className="text-xl font-semibold mb-2">
          Detalii aplicatie: {application.id}
        </h2>
        <p>
          <strong>Client:</strong> {application.client}
        </p>
        <p>
          <strong>Scor:</strong> {application.score}
        </p>
        <p>
          <strong>Status:</strong> {application.status}
        </p>

        <RiskActionButtons
          onApprove={() => {
            onApprove();
            onClose();
          }}
          onReject={() => {
            onReject();
            onClose();
          }}
          onRequestDocs={() => {
            onRequestDocs();
            onClose();
          }}
        />
        <button
          className="absolute top-3 right-3 text-grey-500 hover:text-red-600 text-2xl"
          onClick={onClose}
        >
          x
        </button>
      </div>
    </div>
  );
}
