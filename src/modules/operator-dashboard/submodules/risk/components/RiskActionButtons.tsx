import Button from "../../../components/ui/Button";

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
      <Button onClick={onApprove} color="green">
        Aproba
      </Button>
      <Button onClick={onReject} color="red">
        Respinge
      </Button>
      <Button onClick={onRequestDocs} color="yellow">
        Cere Documente
      </Button>
    </div>
  );
}
