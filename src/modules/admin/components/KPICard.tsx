import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";

type KPICardProps = {
  title: string;
  stat: number;
  description?: string;
  icon: ReactNode;
};

function KPICard({ title, stat, description, icon: Icon }: KPICardProps) {
  return (
    <Card className='bg-blue-50 dark:bg-[#2A3B55]/30 border border-blue-100 dark:border-white/10 rounded-xl'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='font-semibold text-blue-900 dark:text-white'>
          {title}
        </CardTitle>
        {Icon}
      </CardHeader>
      <CardContent>
        <div className='text-3xl font-bold text-blue-900 dark:text-blue-300'>
          {stat}
        </div>
        {description && (
          <p className='text-xs mt-1 text-gray-500 dark:text-gray-400'>
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default KPICard;
