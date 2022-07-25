import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";

const HouseTypeSelect = ({
  onChange,
  value,
}: {
  onChange: Function;
  value: string;
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };
  return (
      <FormControl>
        <InputLabel id="house-type">House type</InputLabel>
        <Select
          labelId="house-type"
          id="select"
          value={value}
          label="Select house type"
          onChange={handleChange}
        >
          <MenuItem value="00">Boliger i alt</MenuItem>
          <MenuItem value="02">Småhus</MenuItem>
          <MenuItem value="03">Blokkleiligheter</MenuItem>
        </Select>
      </FormControl>
  );
};

export default HouseTypeSelect;
