export default function ContributionCard({ chain }: any) {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg text-center">
      <h3 className="text-xl font-bold text-blue-500">{chain.name}</h3>
      <p className="mt-4 text-gray-700">Total Contributions:</p>
      <p className="text-2xl font-semibold text-green-600">
        ${chain.contribution}
      </p>
    </div>
  );
}
