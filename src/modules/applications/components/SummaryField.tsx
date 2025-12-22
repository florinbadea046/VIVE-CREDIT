function SummaryField({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <b className='text-blue-700 dark:text-blue-400'>{label}:</b> {value}
    </p>
  );
}

export default SummaryField;
