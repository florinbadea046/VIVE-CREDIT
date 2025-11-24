import Modal from "../../../components/ui/Modal";
import RiskActionButtons from "./RiskActionButtons";
import type { RiskApplication } from "../pages/RiskDashboard";

interface Props {
  application: RiskApplication;
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  onRequestDocs: () => void;
}

export default function RiskDetailsModal({
  application,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onRequestDocs,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Detalii aplicatie : ${application.id}`}
      width="w-[480px]"
    >
      <div className="space-y-2">
        <p>
          <strong>Client:</strong> {application.client}
        </p>
        <p>
          <strong>Scor:</strong> {application.score}
        </p>
        <p>
          <strong>Status:</strong> {application.status}
        </p>
      </div>

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
    </Modal>
  );
}
