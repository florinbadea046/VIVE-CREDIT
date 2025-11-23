import DashboardLayout from "../layout/DashboardLayout";
import { paymentsMock } from "../mock/paymentsMock";
import PaymentFilters from "../components/PaymentFilters";

export default function PaymentsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <PaymentFilters payments={paymentsMock} />
      </div>
    </DashboardLayout>
  );
}
