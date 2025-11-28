'use client'

import { formatDisplayDate, isOverdue } from "@/lib/utils";
import React,{ useState } from "react";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Box, Typography, IconButton } from "@mui/material";

type TaskDueDateCellProps = {
    value?: string;
    onChange: (newValue: Date | null) => void;
  };
  
const TaskDueDate: React.FC<TaskDueDateCellProps> = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const date = value ? new Date(value) : null;
    const display = value ? formatDisplayDate(value) : "";
  
    const overdue = isOverdue(value);
  
    return (
     <Box
        sx={{
          position: "relative",        
          display: "inline-flex",
          alignItems: "center",
        }}
      >
       <DateTimePicker
        open={open}
        onClose={handleClose}
        value={date}
        onChange={(newVal) => onChange(newVal)}
        slotProps={{
          textField: {
            sx: {
              position: "absolute",
              inset: 0,             
              opacity: 0,           
              pointerEvents: "none",
            },
          },
        }}
      />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleOpen}
        >
          {value ? (
            <Typography
              variant="body2"
              sx={overdue ? { color: "#ff5252" } : undefined}
            >
              {display}
            </Typography>
          ) : (
            <IconButton
              size="small"
              onClick={handleOpen}
              sx={{
                borderRadius: 1,
                width: 24,
                height: 24,
                padding: 0,
                color: "#888",
              }}
            >
              <CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          )}
        </Box>
      </Box>
    );
};
  
export default TaskDueDate;