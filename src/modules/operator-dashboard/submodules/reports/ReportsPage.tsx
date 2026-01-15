import { useState } from 'react';
import * as Select from '@radix-ui/react-select';
import * as Popover from '@radix-ui/react-popover';
import { DayPicker } from 'react-day-picker';
import './ReportsCalendar.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { ChevronDown, Check, Calendar as CalendarIcon } from 'lucide-react';

import 'react-day-picker/dist/style.css';

type ReportType = 'applications' | 'collections' | 'operations';

type DateRange = {
  from?: Date;
  to?: Date;
};

type ChartDataItem = {
  day: string;
  value: number;
};

function generateMockData(
  reportType: ReportType,
  from: Date,
  to: Date
): ChartDataItem[] {
  const data: ChartDataItem[] = [];
  let current = new Date(from);

  while (current <= to) {
    data.push({
      day: format(current, 'dd.MM'),
      value:
        reportType === 'applications'
          ? Math.floor(Math.random() * 20) + 5
          : reportType === 'collections'
          ? Math.floor(Math.random() * 15) + 3
          : Math.floor(Math.random() * 10) + 1,
    });

    current = new Date(current);
    current.setDate(current.getDate() + 1);
  }

  return data;
}

export default function ReportsPage() {
  const [reportType, setReportType] = useState<ReportType>('applications');
  const [range, setRange] = useState<DateRange>({});
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<{
    reportType: ReportType;
    from: Date;
    to: Date;
  } | null>(null);

  function handleGenerate() {
    if (!range.from || !range.to) return;

    if (
      lastGenerated &&
      lastGenerated.reportType === reportType &&
      lastGenerated.from.getTime() === range.from.getTime() &&
      lastGenerated.to.getTime() === range.to.getTime()
    ) {
      return;
    }

    const data = generateMockData(reportType, range.from, range.to);
    setChartData(data);

    setLastGenerated({
      reportType,
      from: range.from,
      to: range.to,
    });
  }

  function handleExport() {
    alert(
      `Export CSV generat\n\nTip raport: ${reportType}\nPerioadă: ${rangeLabel}`
    );
  }

  const rangeLabel =
    range.from && range.to
      ? `${format(range.from, 'dd.MM.yyyy')} - ${format(
          range.to,
          'dd.MM.yyyy'
        )}`
      : 'Selectează perioada';

  return (
    <div className='w-full flex justify-center dark:bg-gray-900'>
      <div className='w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700'>
        <h1 className='text-2xl font-semibold mb-6 text-center text-gray-700 dark:text-gray-200'>
          Rapoarte
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          <div>
            <label className='block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200'>
              Tip raport
            </label>

            <Select.Root
              value={reportType}
              onValueChange={(v) => setReportType(v as ReportType)}>
              <Select.Trigger className='w-full flex h-10 items-center justify-between px-3 py-2 border rounded-md bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200'>
                <Select.Value />
                <ChevronDown size={16} />
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className='bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-md'>
                  <Select.Viewport className='p-1'>
                    {[
                      { v: 'applications', l: 'Aplicații' },
                      { v: 'collections', l: 'Colectări' },
                      { v: 'operations', l: 'Operațiuni' },
                    ].map((item) => (
                      <Select.Item
                        key={item.v}
                        value={item.v}
                        className='flex items-center px-2 py-2 rounded cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'>
                        <Select.ItemIndicator className='mr-2'>
                          <Check size={14} />
                        </Select.ItemIndicator>
                        <Select.ItemText>{item.l}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div>
            <label className='block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200'>
              Perioadă
            </label>

            <Popover.Root open={openCalendar} onOpenChange={setOpenCalendar}>
              <Popover.Trigger asChild>
                <button className='w-full px-3 h-10 py-2 border rounded-md flex items-center justify-between bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200'>
                  <span className='text-sm'>{rangeLabel}</span>
                  <CalendarIcon size={16} />
                </button>
              </Popover.Trigger>

              <Popover.Portal>
                <Popover.Content
                  sideOffset={8}
                  className='bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-md p-3 text-gray-700 dark:text-gray-200 '>
                  <DayPicker
                    mode='range'
                    selected={{ from: range.from, to: range.to }}
                    onSelect={(r) => setRange({ from: r?.from, to: r?.to })}
                  />

                  <div className='flex justify-between mt-3'>
                    <button
                      className='px-3 py-2 text-sm border rounded-md border-gray-200 dark:border-gray-600 dark:text-gray-200'
                      onClick={() => setRange({})}>
                      Reset
                    </button>

                    <button
                      className='px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700'
                      onClick={() => setOpenCalendar(false)}>
                      OK
                    </button>
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>

          <div className='flex items-end'>
            <button
              onClick={handleGenerate}
              className='w-full px-4 py-2 h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
              Generează raport
            </button>
          </div>

          <div className='md:col-span-3 flex justify-end'>
            <button
              type='button'
              onClick={handleExport}
              className='px-4 py-2 rounded-md border bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'>
              Export CSV
            </button>
          </div>
        </div>

        {chartData.length > 0 && (
          <div className='mt-8'>
            <h2 className='text-lg font-semibold mb-4 text-center text-gray-700 dark:text-gray-200'>
              Grafic
            </h2>

            <div className='w-full h-72'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='day' />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='value' fill='#2563EB' radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
