"use client";

import React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function ChecklistIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 24 24"
      sx={{ color: "rgb(180,180,180)", ...props.sx }}
    >
      {/* 上方对勾 */}
      <path
        d="M7 6.8l1.6 1.6 3.2-3.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* 上方横线 */}
      <line
        x1="12.5"
        y1="7.4"
        x2="18"
        y2="7.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* 下方圆圈 */}
      <circle
        cx="8.6"
        cy="15.4"
        r="1.6"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
      />
      {/* 下方横线 */}
      <line
        x1="12.5"
        y1="15.4"
        x2="18"
        y2="15.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </SvgIcon>
  );
}
