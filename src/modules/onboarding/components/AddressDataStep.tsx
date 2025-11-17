import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { OnboardingData } from "@/modules/onboarding/types/onboarding";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface AddressDataStepProps {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: Partial<OnboardingData>) => void;
  initialData: OnboardingData;
}

export default function AddressDataStep({
  onNext,
  onBack,
  updateData,
  initialData,
}: AddressDataStepProps) {
  const [formData, setFormData] = useState({
    address: initialData.address || "",
    city: initialData.city || "",
    county: initialData.county || "",
    phone: initialData.phone || "",
  });

  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isPhoneTouched, setIsPhoneTouched] = useState(false);

  useEffect(() => {
    if (!isPhoneTouched) return;

    if (!formData.phone) {
      setIsPhoneValid(true);
      return;
    }

    if (formData.phone.startsWith("+40")) {
      setIsPhoneValid(/^\+40[0-9]{9}$/.test(formData.phone));
    } else {
      setIsPhoneValid(formData.phone.length >= 8);
    }
  }, [formData.phone, isPhoneTouched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.address.trim()) return alert("Introduceți adresa completă.");
    if (!formData.city.trim()) return alert("Introduceți orașul.");
    if (!formData.county.trim()) return alert("Introduceți județul.");
    if (!formData.phone.trim() || !isPhoneValid)
      return alert("Introduceți un număr de telefon valid.");

    updateData({
      address: formData.address.trim(),
      city: formData.city.trim(),
      county: formData.county.trim(),
      phone: formData.phone.trim(),
    });

    onNext();
  };

  return (
    <div className="w-full bg-gradient-to-b from-blue-50 to-white p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md border border-blue-100 p-6"
      >
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Pasul 2 — Adresă și contact
        </h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="address">Adresă</Label>
            <Input
              id="address"
              name="address"
              placeholder="Ex: Strada Mihai Eminescu nr. 10"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="city">Oraș</Label>
            <Input
              id="city"
              name="city"
              placeholder="Ex: București"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="county">Județ</Label>
            <Input
              id="county"
              name="county"
              placeholder="Ex: Ilfov"
              value={formData.county}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Telefon</Label>
            <div className="relative">
              <PhoneInput
                defaultCountry="ro"
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone })}
                onFocus={() => setIsPhoneTouched(true)}
                inputClassName={`!w-full border rounded-md px-3 py-2 transition-colors duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                  isPhoneValid
                    ? "border-gray-300 focus:border-blue-500"
                    : "border-red-500 focus:ring-red-400"
                }`}
                countrySelectorStyleProps={{
                  buttonStyle: {
                    backgroundColor: "white",
                    borderRight: "1px solid #ccc",
                    borderTopLeftRadius: "0.375rem",
                    borderBottomLeftRadius: "0.375rem",
                  },
                }}
              />
              {isPhoneTouched && !isPhoneValid && (
                <p className="text-red-500 text-sm mt-1">
                  Număr de telefon invalid.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="px-6"
          >
            ⬅ Înapoi
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          >
            Continuă
          </Button>
        </div>
      </form>
    </div>
  );
}
