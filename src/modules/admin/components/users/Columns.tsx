import { addNotification } from "@/components/notifications/notifications.actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import type { User } from "../../mock/Users.mock";
import UpdateUserForm from "./UpdateUserForm";

type UsersColumnsProps = {
  onUpdateUser: (user: User) => void;
  onRemoveUser: (userId: string) => void;
};

export const getUsersColumns = ({
  onUpdateUser,
  onRemoveUser,
}: UsersColumnsProps): ColumnDef<User>[] => [
  {
    accessorKey: "name",
    header: "Nume",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "role",
    header: "Rol",
  },
  {
    header: "Actiuni",
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      const removeUser = () => {
        onRemoveUser(user.id);
        addNotification({
          text: "Userul a fost sters cu succes.",
          date: new Date().toISOString(),
          read: false,
          type: "system",
        });
      };

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open Menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='dark:bg-[#0E151F]'>
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <Pencil size={18} />
                  Editeaza Utilizator
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem onClick={removeUser}>
                <span className='inline-flex items-center gap-2 text-red-500'>
                  <Trash2 size={18} />
                  Sterge Utilizator
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className='rounded-lg max-w-[425px] dark:bg-[#121B26]'>
            <UpdateUserForm user={user} onSave={onUpdateUser} />
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
