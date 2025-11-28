"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { IconSortButton } from '@/app/pageStyle' 
import StraightIcon from '@mui/icons-material/Straight';
import CheckIcon from "@mui/icons-material/Check";
import { blue } from '@mui/material/colors';

export type SortField = "createdAt" | "dueDate" | "order";

interface SortMenuProps {
  value: SortField;                        
  onChange: (field: SortField) => void;
}

const dataList = [
    {
        value: 'createdAt',
        label: 'Created at'
    },
    {
        value: 'dueDate',
        label: 'Due Date'
    },
    {
        value: 'order',
        label: 'Task ID'
    }
]
export default function SortMenu({ value, onChange }: SortMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [curSelect, setCurSelect] = useState(value)

  useEffect(() => {
    setCurSelect(value)
  }, [value])

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelect = (field: SortField) => {
    onChange(field);
    handleClose();
    setCurSelect(field)
  };

  return (
    <>
      <IconSortButton size="small" onClick={handleOpen}>
        <StraightIcon sx={{ transform: 'rotate(-180deg)',position: 'absolute', left: 2, color: '#999'  }} />
        <StraightIcon sx={{ position: 'absolute', left: 10, color: '#999'  }} />
      </IconSortButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        MenuListProps={{
          dense: true,
          sx: {
            backgroundColor: "#303030",
            color: "#fff",
            minWidth: 150,
          },
        }}
      >
        {dataList.map((item) => (
            <MenuItem
                selected={curSelect === item.label}
                onClick={() => handleSelect(item.value as SortField)}
                sx={{
                 backgroundColor: 'transparent !important'
                }}
                key={item.value}
            >
            <ListItemText sx={{color: curSelect === item.value ? blue[600] : '#fff'}}>{item.label}</ListItemText>
            {curSelect === item.value && (
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckIcon fontSize="small" sx={{ color: blue[600] }} />
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
