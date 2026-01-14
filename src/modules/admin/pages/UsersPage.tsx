import CardWrapper from "@/modules/dashboard/components/CardWrapper";
import { Users } from "lucide-react";
import React from "react";
import AdminDashboardLayout from "../components/AdminDashboardLayout";
import { getUsersColumns } from "../components/users/Columns";
import CreateUserForm from "../components/users/CreateUserForm";
import { DataTable } from "../components/users/DataTable";
import { usersData, type User } from "../mock/Users.mock";

function UsersPage() {
  const [users, setUsers] = React.useState<User[]>(usersData);

  const addUser = React.useCallback((newUser: User) => {
    setUsers((prevUsers) => [newUser, ...prevUsers]);
  }, []);

  const updateUser = React.useCallback((updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  }, []);

  const removeUser = React.useCallback((userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  }, []);

  const columns = React.useMemo(
    () =>
      getUsersColumns({ onUpdateUser: updateUser, onRemoveUser: removeUser }),
    [updateUser, removeUser]
  );

  return (
    <AdminDashboardLayout>
      <div className='space-y-6'>
        {/* Header */}
        <CardWrapper title='Utilizatori &amp; Roluri'>
          <p>Gestionați utilizatorii și permisiunile sistemului</p>
        </CardWrapper>

        {/* Users table */}
        <div className='relative flex flex-col gap-4 sm:block'>
          <CreateUserForm onSave={addUser} />
          <CardWrapper title='Tabel Utilizatori' icon={<Users size={18} />}>
            <DataTable<User, unknown> columns={columns} data={users} />
          </CardWrapper>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}

export default UsersPage;
