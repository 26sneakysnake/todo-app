import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getTasks } from "../../services/api";
import { Task } from "../../models/Task";

const TasksChart: React.FC = () => {
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({});
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);

        // Transformation des données pour Highcharts
        const data = transformDataForChart(fetchedTasks);

        setChartOptions({
          title: {
            text: "Tasks by Status",
          },
          series: [
            {
              type: "pie",
              name: "Tasks",
              data: data,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Fonction pour transformer les données pour le graphique
  const transformDataForChart = (tasks: Task[]) => {
    const statusCounts: { [key: string]: number } = {};

    tasks.forEach((task) => {
      statusCounts[task.status] = (statusCounts[task.status] || 0) + 1;
    });

    return Object.keys(statusCounts).map((status) => ({
      name: status,
      y: statusCounts[status],
    }));
  };

  return (
    <div>
      <h2>Tasks Chart</h2>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default TasksChart;