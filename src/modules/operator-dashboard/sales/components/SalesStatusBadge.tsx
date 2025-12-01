interface StatusStyle {
  bg: string;
  color: string;
}

interface StatusColors {
  [key: string]: StatusStyle;
}

export default function SalesStatusBadge({ status }: { status: string }) {
  const colors: StatusColors = {
    Nou: { bg: "#dbeafe", color: "#1e40af" },
    "În lucru": { bg: "#fef9c3", color: "#854d0e" },
    Finalizat: { bg: "#dcfce7", color: "#166534" },
  };

  const style = colors[status] || colors["Nou"];

  return (
    <span
      style={{
        backgroundColor: style.bg,
        color: style.color,
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "14px",
        fontWeight: 500,
        display: "inline-block",
        width: "auto",
      }}
    >
      {status}
    </span>
  );
}