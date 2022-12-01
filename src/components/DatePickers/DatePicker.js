import * as React from "react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const MyDatePicker = ({finishDate, setFinishDate}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className="mx-3"
        label="Enter Finish Date"
        inputFormat="DD/MM/YYYY"
        minDate={new Date()}
        value={finishDate}
        onChange={(newValue) => {
          setFinishDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default MyDatePicker;
