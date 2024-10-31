interface ContributionCardProps {
  title: string;
  amount: string | number;
  isTotal?: boolean;
}

export default function ContributionCard({ title, amount, isTotal = false }: ContributionCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center min-w-[200px]">
      <h3 className="text-sm font-inter font-medium text-gray-600 uppercase tracking-tight mb-2">
        {title}
      </h3>
      <p className="text-2xl font-inter font-extrabold text-green-900">
        ${amount || '0'}
      </p>
    </div>
  );
}
