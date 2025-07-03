import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getAllIncidents } from "../../indexedDB";

interface Incident {
  tipo: string;
}

interface DataItem {
  name: string;
  value: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#aa00ff"];

export default function IncidentPieChart(): React.ReactElement {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    getAllIncidents().then((incidents: Incident[]) => {
      const counts: Record<string, number> = {};
      incidents.forEach(({ tipo }) => {
        counts[tipo] = (counts[tipo] || 0) + 1;
      });
      const chartData = Object.entries(counts).map(([name, value]) => ({
        name,
        value,
      }));
      setData(chartData);
    });
  }, []);

  if (data.length === 0) {
    return <p>Nenhuma ocorrência para mostrar no gráfico.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
