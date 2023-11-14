import { IExpenseProps } from '../../model/Interfaces';
import './home.css';
import { categoryIcons, categories } from '../../utils/constants';
import Chart from "react-apexcharts";

const colors: Record<string, string> = {
  [categories.FOOD] :'#ff4860',
  [categories.ENTERTAINMENT]: '#e67a76',
  [categories.EDUCATION]: '#ed935b',
  [categories.SHOPPING]: '#4798b5',
  [categories.TRANSPORTATION]: '#4c82ff',
  [categories.VACATION]: '#325259'
}

export default function ExpenseItem(props: IExpenseProps): JSX.Element {
  const { category, amount, currency, percentage } = props;
  return (
    <div className="font-bold bg-white shadow-lg mr-2 p-2 rounded-lg">
      <div className="text-sm mb-2">{category}</div>
      <Chart
        options={{
          plotOptions: {
            radialBar: {
              hollow: {
                background: "#fff",
              },
              track: {
                strokeWidth: '50%'
              },
              dataLabels: {
                name: {
                  fontSize: '16px'
                },
                value: {
                  color: "#111",
                  fontSize: "10px",
                  show: true,
                  offsetY: 2
                }
              }
            }
          },
          stroke: {
            lineCap: "round"
          },
          fill: {
            type: "solid",
            colors: [colors[category] || '#4c82ff']
          },
          labels: [categoryIcons[category.toLowerCase()]]
        }}
        series={[percentage]}
        type="radialBar"
        width="150"
      />
      <div className="text-break text-orange text-sm">{amount}<span className="px-1 text-xs">{currency}</span></div>
    </div>
  )
}