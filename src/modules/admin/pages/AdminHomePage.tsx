import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardWrapper from "@/modules/dashboard/components/CardWrapper";
import {
  Activity,
  AlertTriangle,
  Download,
  MessageSquareWarning,
  Rocket,
  Settings,
  ShieldCheck,
  User,
  Users,
  Users2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminDashboardLayout from "../components/AdminDashboardLayout";
import KPICard from "../components/KPICard";

function AdminHomePage() {
  const navigate = useNavigate();
  const baseBtn =
    "flex items-center justify-center gap-2 p-3 rounded-lg transition font-medium";

  return (
    <AdminDashboardLayout>
      <div className='space-y-6'>
        <CardWrapper title='Dashboard admin'>
          <p>Prezentare generală a sistemului și activitate administrativă</p>
        </CardWrapper>
        <CardWrapper title='Utilizatori si Roluri' icon={<Users size={24} />}>
          {/* KPI Cards */}
          <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-4'>
            <KPICard
              title='Total Utilizatori'
              stat={1248}
              description='+12 saptamana aceasta'
              icon={
                <Users2
                  size={24}
                  className='text-blue-600 dark:text-blue-300'
                />
              }
            />
            <KPICard
              title='Administratori activi'
              stat={14}
              description='Ultimele 24 de ore'
              icon={
                <ShieldCheck
                  size={24}
                  className='text-blue-600 dark:text-blue-300'
                />
              }
            />
            <KPICard
              title='Actiuni Astazi'
              stat={342}
              description='Intrari Log'
              icon={
                <Activity
                  size={24}
                  className='text-blue-600 dark:text-blue-300'
                />
              }
            />
            <KPICard
              title='Utilizatori Blocati'
              stat={3}
              description='Necesita atentie'
              icon={
                <AlertTriangle
                  size={24}
                  className='text-blue-600 dark:text-blue-300'
                />
              }
            />
          </div>
        </CardWrapper>
        <CardWrapper
          title='Activitate și alerte'
          icon={<MessageSquareWarning size={24} />}
        >
          {/* Activity & Alerts */}
          <div className='grid gap-4 xl:grid-cols-3'>
            {/* System activity */}
            <Card className='bg-blue-50 dark:bg-[#2A3B55]/30 border border-blue-100 dark:border-white/10 rounded-xl xl:col-span-2'>
              <CardHeader>
                <CardTitle>Activitatea sistemului (ultimele 7 zile)</CardTitle>
              </CardHeader>
              <CardContent className='h-[260px] flex items-center justify-center text-sm'>
                Activity chart placeholder
              </CardContent>
            </Card>
            {/* Alerts */}
            <Card className='bg-blue-50 dark:bg-[#2A3B55]/30 border border-blue-100 dark:border-white/10 rounded-xl'>
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span>3 users locked</span>
                  <Button
                    size='sm'
                    className={`${baseBtn} font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white`}
                  >
                    Review
                  </Button>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Permissions changed</span>
                  <Button
                    size='sm'
                    className={`${baseBtn} font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white`}
                  >
                    View
                  </Button>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Settings updated</span>
                  <Button
                    size='sm'
                    className={`${baseBtn} font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white`}
                  >
                    Audit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardWrapper>
        {/* Quick actions */}
        <CardWrapper title='Acțiuni rapide' icon={<Rocket size={24} />}>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
            <Button
              size='lg'
              className={`${baseBtn} bg-blue-600 hover:bg-blue-700 text-white`}
              onClick={() => navigate("/admin/users")}
            >
              <User size={18} />
              Adăugați utilizator
            </Button>
            <Button
              size='lg'
              className={`${baseBtn} text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white`}
            >
              <ShieldCheck size={18} /> Vizualizați jurnalul de audit
            </Button>
            <Button
              size='lg'
              className={`${baseBtn} text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white`}
            >
              <Download /> Export Report
            </Button>
            <Button
              size='lg'
              className={`${baseBtn} text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white`}
            >
              <Settings size={18} />
              System Settings
            </Button>
          </div>
        </CardWrapper>
      </div>
    </AdminDashboardLayout>
  );
}

export default AdminHomePage;
