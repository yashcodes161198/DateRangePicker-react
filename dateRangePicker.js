import { CalendarToday, Grid3x3Outlined } from "@mui/icons-material";
import { MonthPicker } from "@mui/lab";
import {
  Button,
  Chip,
  Dialog,
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import NavigationIcon from "@mui/icons-material/Navigation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React, { useEffect, useState } from "react";

import "./MonthRangePicker.css";

const MonthRangePicker = (props) => {
  // const [startMonth, setStartMonth] = useState({
  //   isSelected: false,
  //   year: new Date().getFullYear(),
  //   monthName: new Date().toLocaleString("en-US", { month: "short" }),
  //   index: new Date().getMonth(),
  // });
  // const [endMonth, setEndMonth] = useState({
  //   isSelected: false,
  //   year: new Date().getFullYear(),
  //   monthName: new Date().toLocaleString("en-US", { month: "short" }),
  //   index: new Date().getMonth(),
  // });
  const [startMonth, setStartMonth] = useState(null);
  const [endMonth, setEndMonth] = useState(null);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const squareButtonStyle = {
    cursor: "pointer",
    margin: "0",
    width: "95px",
    height: "30px",
  };
  const monthButtonStyle = {
    cursor: "pointer",
    borderRadius: "20px",
    margin: "0",
    width: "95px",
    height: "36px",
  };
  const loadMonths = () => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let months = [];
    let templateMonth = {
      isSelected: false,
      year: selectedYear,
    };
    for (let i = 0; i < 12; i++) {
      months.push({ ...templateMonth, index: i, monthName: monthNames[i] });
    }
    // console.log(months);
    setMonths(months);
    if (startMonth || endMonth) {
      // console.log(startMonth, startMonth);
      // console.log(endMonth, startMonth);
      handleMonthSelectionInRange(startMonth, endMonth, months);
    }
  };

  useEffect(() => {
    loadMonths();
  }, [selectedYear]);

  // useEffect(() => {
  //   if (startMonth || endMonth) {
  //     // console.log(startMonth, startMonth);
  //     // console.log(endMonth, startMonth);
  //     handleMonthSelectionInRange(startMonth, endMonth, months);
  //   }
  // }, [startMonth, endMonth]);

  const loadYears = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    let yearsArray = [];
    for (let i = -3; i <= 8; i++) {
      yearsArray.push(currentYear + i);
    }
    setYears([...yearsArray]);
    // console.log(yearsArray);
  };

  // const handleMonthClick = (selectedDate) => {
  // if (!startMonth || selectedDate < startMonth) {
  //   setStartMonth(selectedDate);
  //   setEndMonth(null);
  // } else if (!endMonth || selectedDate > endMonth) {
  //   setEndMonth(selectedDate);
  // } else {
  //   setStartMonth(selectedDate);
  //   setEndMonth(null);
  // }
  // };

  // const isWithinSelectedRange = (date) => {
  //   if (startMonth && endMonth) {
  //     return date >= startMonth && date <= endMonth;
  //   }
  //   return false;
  // };
  const handleResetCalendar = () => {
    setStartMonth(null);
    setEndMonth(null);
    handleMonthSelectionInRange(null, null, months);
  };
  const handleMonthSelectionInRange = (startMonth, endMonth, months) => {
    // if (!(startMonth && endMonth)) return;
    // console.log(months);
    let modifiedMonths = [];
    months.map((month) => {
      const startScore =
        startMonth === null ? 0 : startMonth?.year * 100 + startMonth?.index;
      let endScore =
        endMonth === null ? 0 : endMonth?.year * 100 + endMonth?.index;
      if (endScore === 0) endScore = startScore;
      const currentScore = month.year * 100 + month.index;
      if (currentScore >= startScore && currentScore <= endScore) {
        month.isSelected = true;
      } else {
        month.isSelected = false;
      }
      modifiedMonths.push(month);
    });
    setMonths(modifiedMonths);
  };
  const handleMonthClick = (month) => {
    const startScore =
      startMonth === null ? 0 : startMonth?.year * 100 + startMonth?.index;
    const endScore =
      endMonth === null ? 0 : endMonth?.year * 100 + endMonth?.index;
    const currentScore = month.year * 100 + month.index;
    let newStartMonth = startMonth;
    let newEndMonth = endMonth;
    if (!startMonth || currentScore < startScore || (startMonth && endMonth)) {
      newStartMonth = month;
      newEndMonth = null;
      setStartMonth(month);
      setEndMonth(null);
    } else {
      newEndMonth = month;
      setEndMonth(month);
    }
    // console.log(newStartMonth, "startMonth");
    // console.log(newEndMonth, "endMonth");
    handleMonthSelectionInRange(newStartMonth, newEndMonth, months);
  };
  const handleYearClick = (year) => {
    setSelectedYear(year);
  };
  const handlePrevYear = () => {
    setSelectedYear(selectedYear - 1);
  };
  const handleNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };
  // const handleHover = (month) => {
  //   console.log(month.monthName, "hover");
  // };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    handleResetCalendar();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleApply = () => {
    if (startMonth || endMonth) {
      const startDate = new Date(1, startMonth.index, startMonth.year);
      let endDate = null;
      if (!endMonth) endDate = startDate;
      else {
        const endDate = new Date(1, endMonth.index, endMonth.year);
      }
      props.setStartDate(startDate);
      props.setEndDate(endDate);
    }
    handleClose();
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    handleClose();
  };

  const handleFocus = () => {
    console.log(open, "focus changed");
    if (!open) handleOpen();
  };
  return (
    <>
      <TextField
        sx={{ width: "310px" }}
        id="outlined"
        // label={startMonth ? startMonth.monthName : ""}
        label="Month Range"
        // placeholder="Month Range"
        variant="outlined"
        value={
          startMonth && endMonth
            ? `${startMonth?.monthName} ${startMonth?.year}  -  ${endMonth?.monthName} ${endMonth?.year}`
            : ""
        }
        onClick={handleFocus}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="inherit" onClick={handleOpen}>
                <CalendarToday />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="calendar-dialog-title"
      >
        <Box sx={{ width: "280px", margin: "10px", marginTop: "13px" }}>
          <Box
            sx={{ width: "280px", display: "inline-flex", marginLeft: "3px" }}
          >
            <Box
              sx={{
                backgroundColor: grey[300],
                // padding: "2px",
                marginRight: "7px",

                borderRadius: "5px",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "130px",
                  // paddingTop: "5px",
                  color: [startMonth ? grey[800] : grey[500]],
                }}
              >
                {/* {startMonth ? startMonth?.monthName : "Start Month"} */}
                {startMonth
                  ? `${startMonth?.monthName} ${startMonth?.year}`
                  : "Start Month"}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: grey[300],
                // padding: "2px",
                marginLeft: "7px",
                borderRadius: "5px",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "130px",
                  color: [endMonth ? grey[800] : grey[500]],
                }}
              >
                {/* {endMonth ? endMonth?.monthName : "End Month"} */}
                {endMonth
                  ? `${endMonth?.monthName} ${endMonth?.year}`
                  : "End Month"}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              marginBottom: "15px",
              width: "280px",
              display: "inline-flex",
            }}
          >
            {/* <Grid container spacing={2} columns={12}> */}
            {/* <Grid item xs={2}> */}
            <IconButton
              aria-label="previous year"
              onClick={handlePrevYear}
              style={monthButtonStyle}
            >
              <ChevronLeftIcon />
            </IconButton>
            {/* </Grid> */}
            {/* <Grid item xs={8}> */}
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                width: "100px",
                paddingTop: "5px",
                color: grey[800],
              }}
            >
              {selectedYear}
            </Typography>
            {/* </Grid> */}
            {/* <Grid item xs={2}> */}
            <IconButton
              aria-label="next year"
              onClick={handleNextYear}
              style={monthButtonStyle}
            >
              <ChevronRightIcon />
            </IconButton>{" "}
            {/* </Grid> */}
            {/* </Grid> */}
          </Box>
          <Box sx={{ width: "280px", marginBottom: "10px" }}>
            <Grid container spacing={2} columns={12}>
              {console.log(months)}
              {months.map((month) => {
                return (
                  <Grid item xs={4} key={month.index}>
                    <Button
                      // className={
                      //   month.isSelected
                      //     ? "monthButton monthButton-selected"
                      //     : "monthButton"
                      // }
                      variant={month.isSelected ? "contained" : "text"}
                      // color={month.isSelected ? "primary" : "default"}
                      color="primary"
                      style={monthButtonStyle}
                      sx={{
                        root: {
                          width: "100%",
                          // borderRadius: 80,
                        },
                      }}
                      onClick={() => handleMonthClick(month)}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          color: [month.isSelected ? "white" : grey[800]],
                          paddingTop: "1px",
                          fontSize: 15,
                        }}
                      >
                        {month.monthName}
                      </Typography>
                    </Button>
                    {/* <Chip
                  label={month.monthName}
                  color={month.isSelected ? "primary" : "default"}
                  sx={{
                    root: {
                      width: "100%",
                    },
                  }}
                  onClick={() => handleMonthClick(month)}
                  onHover={() => handleHover(month)}
                /> */}
                  </Grid>
                );
              })}
              {/* <Grid item xs={4}>
            <Button color="primary">Secondary</Button>
          </Grid> */}
            </Grid>
          </Box>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{ marginTop: "5px" }}
            >
              <Button
                onClick={handleApply}
                variant="contained"
                color="success"
                style={squareButtonStyle}
              >
                Apply
              </Button>
              <Button
                onClick={handleCancel}
                variant="contained"
                color="error"
                style={squareButtonStyle}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Box>
      </Dialog>

      {/* //////////// */}

      {/* <h3>{`Start Month - ${startMonth ? startMonth.monthName : ""} ${
        startMonth ? startMonth.year : ""
      }`}</h3>
      <h3>{`End Month - ${endMonth ? endMonth.monthName : ""} ${
        endMonth ? endMonth.year : ""
      }`}</h3> */}
      {/* {years.map((year) => {})} */}
    </>
  );
};

export default MonthRangePicker;
