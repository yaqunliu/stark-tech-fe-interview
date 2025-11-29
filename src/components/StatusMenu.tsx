"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { IconSortButton } from '@/app/pageStyle' 
// import ChecklistIcon from '@mui/icons-material/Checklist';

import ChecklistIcon from '@/components/ChecklistIcon';
import CheckIcon from "@mui/icons-material/Check";
import { blue } from '@mui/material/colors';

export type StatusField = "all" | "active" | "inactive";

interface StatusMenuProps {
  value: StatusField;                        
  onChange: (field: StatusField) => void;
}

const dataList = [
    {
        value: 'active',
        label: '进行中'
    },
    {
        value: 'completed',
        label: '已完成'
    },
    {
        value: 'all',
        label: '全部任务'
    }
]
export default function StatusMenu({ value, onChange }: StatusMenuProps) {
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

  const handleSelect = (field: StatusField) => {
    onChange(field);
    handleClose();
    setCurSelect(field)
  };

  return (
    <>
      <IconSortButton sx={{ background: open ? '#303030' : 'transprent'}} size="small" onClick={handleOpen}>
       <ChecklistIcon sx={{ fontSize: '32px'}} />
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
                onClick={() => handleSelect(item.value as StatusField)}
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
