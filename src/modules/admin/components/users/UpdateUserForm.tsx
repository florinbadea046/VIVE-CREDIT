import { addNotification } from "@/components/notifications/notifications.actions";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import type { User } from "../../mock/Users.mock";
import { CreateUserSchema } from "../../mock/Users.mock";

type UpdateUserFormProps = {
  user: User;
  onSave: (user: User) => void;
};

function UpdateUserForm({ user, onSave }: UpdateUserFormProps) {
  const baseBtn =
    "flex items-center justify-center gap-2 p-3 rounded-lg transition font-medium";
  const { id } = user;
  const form = useForm<z.input<typeof CreateUserSchema>>({
    defaultValues: {
      name: user.name,
      email: user.email,
      status: user.status,
      role: user.role,
    },
    mode: "onBlur",
    resolver: zodResolver(CreateUserSchema),
  });

  const { register, control, formState, handleSubmit } = form;
  const { errors, isDirty, isValid } = formState;

  const onSubmit: SubmitHandler<z.input<typeof CreateUserSchema>> = (data) => {
    const parsedUserData = CreateUserSchema.parse({
      ...data,
    });

    onSave({ id, ...parsedUserData });
    addNotification({
      text: "Userul a fost modificat cu succes.",
      date: new Date().toISOString(),
      read: false,
      type: "system",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Editeaza Utilizator</DialogTitle>
          <DialogDescription>
            Efectuați modificări la setările utilizatorului. Faceți clic pe
            Salvare când ați terminat.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 mt-3 mb-6'>
          <div className='grid gap-3'>
            <Label htmlFor='name' className='dark:text-[#c7d5ff]'>
              Nume
            </Label>
            <Input
              {...register("name")}
              placeholder='Ex. Popesu Ion'
              id='name'
              className={cn(
                "bg-white dark:bg-[#0c1324] text-gray-900 dark:text-[#c7d5ff] border",
                errors.name?.message
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-[#243247]"
              )}
            />
            <p className='mt-1 text-sm text-red-500'>
              {errors.name?.message as string}
            </p>
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='email' className='dark:text-[#c7d5ff]'>
              Email
            </Label>
            <Input
              {...register("email")}
              placeholder='email@example.com'
              id='email'
              className={cn(
                "bg-white dark:bg-[#0c1324] text-gray-900 dark:text-[#c7d5ff] border",
                errors.email?.message
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-[#243247]"
              )}
            />
            <p className='mt-1 text-sm text-red-500'>
              {errors.email?.message as string}
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <Controller
              name='status'
              control={control}
              render={({ field }) => (
                <>
                  <Switch
                    id='status'
                    checked={field.value === "active"}
                    onCheckedChange={(checked) =>
                      field.onChange(checked ? "active" : "inactive")
                    }
                    className='data-[state=checked]:bg-blue-600 dark:data-[state=unchecked]:bg-blue-800 dark:data-[state=checked]:bg-blue-300'
                  />
                  <Label htmlFor='status' className='dark:text-[#c7d5ff]'>
                    {field.value === "active" ? "Activ" : "Inactiv"}
                  </Label>
                </>
              )}
            />
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='role' className='dark:text-[#c7d5ff]'>
              Rol
            </Label>
            <Controller
              name='role'
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id='role'>
                    <SelectValue placeholder='Selecteaza rol' />
                  </SelectTrigger>
                  <SelectContent id='role'>
                    <SelectItem value='client'>Client</SelectItem>
                    <SelectItem value='operator'>Operator</SelectItem>
                    <SelectItem value='admin'>Admin</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='ghost'>Anulare</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type='submit'
              disabled={!isDirty || !isValid}
              className={`${baseBtn} bg-blue-600 hover:bg-blue-700 text-white`}
            >
              Salvare
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </>
  );
}

export default UpdateUserForm;
