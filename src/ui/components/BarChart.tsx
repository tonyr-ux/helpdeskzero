"use client";
/*
 * Documentation:
 * Bar Chart — https://app.subframe.com/62415f9da136/library?component=Bar+Chart_4d4f30e7-1869-4980-8b96-617df3b37912
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface BarChartRootProps
  extends React.ComponentProps<typeof SubframeCore.BarChart> {
  stacked?: boolean;
  className?: string;
}

const BarChartRoot = React.forwardRef<HTMLElement, BarChartRootProps>(
  function BarChartRoot(
    { stacked = false, className, ...otherProps }: BarChartRootProps,
    ref
  ) {
    return (
      <SubframeCore.BarChart
        className={SubframeUtils.twClassNames("h-80 w-full", className)}
        ref={ref as any}
        stacked={stacked}
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

export const BarChart = BarChartRoot;
