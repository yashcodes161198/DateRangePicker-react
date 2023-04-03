import { MonthPicker } from "@mui/lab";
import { Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

const useStyles = makeStyles({
  selected: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
});

const MonthRangePicker = () => {
  const classes = useStyles();
  const [startMonth, setStartMonth] = useState(null);
  const [endMonth, setEndMonth] = useState(null);

  const handleMonthClick = (month) => {
    if (!startMonth) {
      setStartMonth(month);
      setEndMonth(null);
    } else if (!endMonth) {
      if (month >= startMonth) {
        setEndMonth(month);
      } else {
        setEndMonth(startMonth);
        setStartMonth(month);
      }
    } else {
      setStartMonth(month);
      setEndMonth(null);
    }
  };

  const isMonthSelected = (month) => {
    if (!startMonth || !endMonth) {
      return false;
    }
    return month >= startMonth && month <= endMonth;
  };

  const renderMonth = (month, isSelected) => {
    const className = isSelected ? classes.selected : "";
    return (
      <Box
        className={className}
        key={month}
        onClick={() => handleMonthClick(month)}
      >
        {month ? month.format("MMMM") : ""}
      </Box>
    );
  };

  const renderMonths = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const month = startMonth ? startMonth.clone().add(i, "month") : null;
      const isSelected = isMonthSelected(month);
      months.push(renderMonth(month, isSelected));
    }
    return months;
  };

  const handleClearClick = () => {
    setStartMonth(null);
    setEndMonth(null);
  };

  return (
    <div>
      <MonthPicker
        // renderDay={null}
        // renderMonth={null}
        // renderYear={null}
        disableFuture
        value={startMonth || endMonth || new Date()}
        onChange={null}
      />
      {renderMonths()}
      <Button onClick={handleClearClick}>Clear</Button>
      <div>
        {startMonth && endMonth && (
          <div>
            Selected range: {startMonth.format("MMMM YYYY")} -{" "}
            {endMonth.format("MMMM YYYY")}
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthRangePicker;
