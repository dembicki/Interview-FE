import React, { useEffect, useMemo, useState } from "react";
import {useSearchParams} from "react-router-dom";
import QuarterSelect, {getQuartersInRange} from "../QuaterSelect/QuaterSelect.component";
import HouseTypeSelect from "../HouseTypeSelect/HouseTypeSelect.component";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { fetchData } from "../../api/api";
import { OPTIONS } from "./Chart.constants";
import { Container, Filters } from "./Chart.styles";

interface ChartItem {
  label: string;
  price: number;
}

interface ResponseItem {
  key: string[];
  values: string[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
);


const ChartComponent = () => {
  const [queryParams, setQueryParams] = useSearchParams();

  const [chartData, setChartData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedHouseType, setSelectedHouseType] = useState(queryParams.get('house') || "00");
  const [quarterSelectState, setQuarterSelectState] = useState( [Number(queryParams.get('firstIndex')), Number(queryParams.get('endIndex'))]|| [0,0]);
  const [selectedQuarters, setSelectedQuarters] = useState(getQuartersInRange([Number(queryParams.get('firstIndex')), Number(queryParams.get('endIndex'))]) || [
    "2009K1",
  ]);


  const setParams = (house: string, quarterSelectState: number[]) => {

    setQueryParams({
      house,
      firstIndex: String(quarterSelectState[0]),
      endIndex: String(quarterSelectState[1]),
    });
  };

  const query = useMemo(() => {
    return [
      {
        code: "Boligtype",
        selection: {
          filter: "item",
          values: [selectedHouseType],
        },
      },
      {
        code: "ContentsCode",
        selection: {
          filter: "item",
          values: ["KvPris"],
        },
      },
      {
        code: "Tid",
        selection: {
          filter: "item",
          values: [...selectedQuarters],
        },
      },
    ];
  }, [selectedQuarters, selectedHouseType]);

  useEffect(() => {
    setIsLoaded(true);
    fetchData(query).then((response) => {
      setChartData(
        response.data.map((item: ResponseItem) => {
          return {
            label: item.key[1],
            price: item.values[0],
          };
        })
      );
      setIsLoaded(true);
    });
  }, [query]);

  useEffect(() => {
    setParams(selectedHouseType, quarterSelectState);
  }, [selectedHouseType, selectedQuarters, quarterSelectState])

  const data = {
    labels: chartData.map((item: ChartItem) => item.label),
    datasets: [
      {
        label: "Price",
        data: chartData.map((item: ChartItem) => item.price),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
      <Container>
        <Filters>
          <QuarterSelect
            onChange={(value: string[]) => setSelectedQuarters(value)}
            setValue={setQuarterSelectState}
            value={quarterSelectState}
          />
          <HouseTypeSelect
            onChange={(value: string) => {
              setSelectedHouseType(value)
            }}
            value={selectedHouseType}
          />
        </Filters>

        {isLoaded && chartData ? (
          <Bar options={OPTIONS} data={data} />
        ) : (
          <span>Loading...</span>
        )}
      </Container>
  );
};

export default ChartComponent;

