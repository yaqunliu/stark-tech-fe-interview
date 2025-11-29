"use client";

import React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function SortTextIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 24 24"
      sx={{ color: "rgb(180,180,180)", ...props.sx }}
    >
      {/* 字母 A 外轮廓 */}
      <path
        d="M6.5 17 L9.2 7 L11.9 17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* A 中间横线 */}
      <line
        x1="7.6"
        y1="13"
        x2="10.4"
        y2="13"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* 右边第 1 条横线（最上面） */}
      <line
        x1="14"
        y1="8"
        x2="19"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* 右边第 2 条横线（中间） */}
      <line
        x1="14"
        y1="12"
        x2="19"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* 右边第 3 条横线（最下面） */}
      <line
        x1="14"
        y1="16"
        x2="19"
        y2="16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </SvgIcon>
  );
}
