import { CreditCard, Landmark, Wallet } from "lucide-react";

export default function PaymentMethodIcon({ method }: { method: string }) {
  if (method === "Card")
    return <CreditCard size={18} className="text-blue-600" />;
  if (method === "Transfer")
    return <Landmark size={18} className="text-blue-600" />;
  return <Wallet size={18} className="text-blue-600" />;
}
