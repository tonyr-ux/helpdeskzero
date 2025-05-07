"use client";
/*
 * Documentation:
 * Pie Chart — https://app.subframe.com/62415f9da136/library?component=Pie+Chart_0654ccc7-054c-4f3a-8e9a-b7c81dd3963c
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface PieChartRootProps
  extends React.ComponentProps<typeof SubframeCore.PieChart> {
  className?: string;
}

const PieChartRoot = React.forwardRef<HTMLElement, PieChartRootProps>(
  function PieChartRoot({ className, ...otherProps }: PieChartRootProps, ref) {
    return (
      <SubframeCore.PieChart
        className={SubframeUtils.twClassNames("h-52 w-52", className)}
        ref={ref as any}
        colors={[
          "#a855f7",
          "#e9d5ff",
          "#9333ea",
          "#d8b4fe",
          "#7e22ce",
          "#c084fc",
        ]}
        {...otherProps}
      />
    );
  }
);

export const PieChart = PieChartRoot;
