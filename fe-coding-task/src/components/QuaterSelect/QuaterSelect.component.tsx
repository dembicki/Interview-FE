import React from "react";
import {Slider, Typography} from "@mui/material";
import {END_YEAR, START_YEAR} from "./QuaterSelect.constants";

const getQuartersInYear = (year: number, idx: number) => {
  if(year+idx === new Date().getFullYear()) {
    return [`${year+idx}K${1}`, `${year+idx}K${2}`]
  } else {
    return [`${year+idx}K${1}`, `${year+idx}K${2}`, `${year+idx}K${3}`, `${year+idx}K${4}`]
  }
}


const getRangeOfYears = (start: number, end: number) => Array(end - start + 1)
    .fill(start)
    .map((year, idx) => getQuartersInYear(year, idx))
    .flat()

export const getQuartersInRange = (selectedQuarters: number[]): string[] => {
  return [...getRangeOfYears(START_YEAR, END_YEAR)].splice(
      selectedQuarters[0],
      selectedQuarters[1] - selectedQuarters[0] + 1
  );
};

const quarters = getRangeOfYears(START_YEAR, END_YEAR);

const QuaterSelect = ({
  onChange,
  value,
  setValue,
}: {
  onChange: (value: string[]) => void;
  value: number[];
  setValue: Function;
}) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div>
      <Typography id="non-linear-slider" gutterBottom>
        Quarters: {quarters[value[0]]} - {quarters[value[1]]}
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        onChangeCommitted={(event, newValue) =>
          onChange(getQuartersInRange(newValue as number[]))
        }
        valueLabelDisplay="auto"
        valueLabelFormat={(v, i) => quarters[v]}
        min={0}
        step={1}
        max={quarters.length - 1}
        disableSwap
      />
    </div>
  );
};

export default QuaterSelect;
