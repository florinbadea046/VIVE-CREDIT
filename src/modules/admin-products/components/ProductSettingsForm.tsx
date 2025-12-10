import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ProductSetting } from "@/types/productSettings";
const schema = z.object({
  id: z.string().optional(),
  productCode: z.string().min(2, "Cod produs obligatoriu"),
  name: z.string().min(3, "Nume obligatoriu"),
  interestType: z.enum(["fixed", "variable"]),
  interestRate: z.number().min(0, "Trebuie >= 0"),
  commission: z.number().min(0),
  minAmount: z.number().min(0),
  maxAmount: z.number().min(0),
  active: z.boolean(),
});

type FormSchema = z.infer<typeof schema>;

type Props = {
  initial?: Partial<ProductSetting>;
  onCancel: () => void;
  onSubmit: (data: FormSchema) => void;
};

export default function ProductSettingsForm({
  initial,
  onCancel,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      interestType: "fixed",
      active: true,
      interestRate: 0,
      commission: 0,
      minAmount: 0,
      maxAmount: 0,
      ...initial,
    } as any,
  });

  useEffect(() => {
    if (initial) {
      reset({
        interestType: (initial as any).interestType ?? "fixed",
        active: (initial as any).active ?? true,
        interestRate: (initial as any).interestRate ?? 0,
        commission: (initial as any).commission ?? 0,
        minAmount: (initial as any).minAmount ?? 0,
        maxAmount: (initial as any).maxAmount ?? 0,
        productCode: initial?.productCode ?? "",
        name: initial?.name ?? "",
        id: initial?.id,
      } as any);
    }
  }, [initial, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register("id")} />

      <div>
        <label className="block text-sm font-medium">Cod produs</label>
        <input
          {...register("productCode")}
          className="mt-1 block w-full rounded border px-3 py-2"
        />
        {errors.productCode && (
          <p className="text-xs text-rose-600">{errors.productCode.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Nume</label>
        <input
          {...register("name")}
          className="mt-1 block w-full rounded border px-3 py-2"
        />
        {errors.name && (
          <p className="text-xs text-rose-600">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Tip dobândă</label>
          <select
            {...register("interestType")}
            className="mt-1 block w-full rounded border px-3 py-2"
          >
            <option value="fixed">Fixă</option>
            <option value="variable">Variabilă</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Rată dobândă (%)</label>
          <input
            type="number"
            step="0.01"
            {...register("interestRate", { valueAsNumber: true })}
            className="mt-1 block w-full rounded border px-3 py-2"
          />
          {errors.interestRate && (
            <p className="text-xs text-rose-600">
              {errors.interestRate.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Comision</label>
          <input
            type="number"
            step="0.01"
            {...register("commission", { valueAsNumber: true })}
            className="mt-1 block w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Min amount</label>
          <input
            type="number"
            {...register("minAmount", { valueAsNumber: true })}
            className="mt-1 block w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Max amount</label>
          <input
            type="number"
            {...register("maxAmount", { valueAsNumber: true })}
            className="mt-1 block w-full rounded border px-3 py-2"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            {...register("active")}
            className="form-checkbox"
          />
          <span className="ml-2">Active</span>
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded border"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-sky-600 text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
}
