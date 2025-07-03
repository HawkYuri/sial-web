import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

interface SelectFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: string[];
}

export default function SelectField({
  name,
  label,
  value,
  onChange,
  options,
}: SelectFieldProps): React.ReactElement {
  return (
    <FormControl fullWidth margin="dense">
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        name={name}
        value={value}
        onChange={onChange}
        fullWidth
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
