import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useQuery } from "@apollo/client";
import { GET_STATISTICS } from "../graphql/queries/transaction.query";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const { data, loading, error } = useQuery(GET_STATISTICS);

  const chartColors = {
    expense: "rgb(201, 50, 50, 1)",
    income: "rgb(35, 153, 79, 1)",
    saving: "rgb(47, 101, 225, 1)",
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "$",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 90,
      },
    ],
  });

  useEffect(() => {
    if (data) {
      const categories = data.getStatistics.map((item) => item.category);
      const backgroundColors = [];

      categories.forEach((category) => {
        backgroundColors.push(chartColors[category]);
      });

      setChartData((prevState) => ({
        labels: data.getStatistics.map((item) => item.category),
        datasets: [
          {
            ...prevState.datasets[0],
            data: data.getStatistics.map((item) => item.total),
            backgroundColor: backgroundColors,
          },
        ],
      }));
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex items-center">
      {data && data.getStatistics && data.getStatistics.length > 0 ? (
        <Doughnut data={chartData} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Chart;
