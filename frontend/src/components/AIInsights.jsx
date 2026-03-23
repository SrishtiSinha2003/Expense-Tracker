import { useQuery } from '@apollo/client';
import { GET_FINANCIAL_INSIGHTS } from '../graphql/queries/transaction.query';

const AIInsights = () => {
  const { loading, error, data, refetch } = useQuery(GET_FINANCIAL_INSIGHTS);

  if (loading) return <p className="text-center text-gray-500">Loading insights...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">AI Financial Insights</h2>
      <p className="text-gray-700 whitespace-pre-line leading-relaxed">{data.getFinancialInsights}</p>
      <button
        onClick={() => refetch()}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Refresh Insights
      </button>
    </div>
  );
};

export default AIInsights;