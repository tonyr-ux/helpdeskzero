"use client";
/*
 * Documentation:
 * Default Page Layout — https://app.subframe.com/62415f9da136/library?component=Default+Page+Layout_a57b1c43-310a-493f-b807-8cc88e2452cf
 * Xelix Sidebar — https://app.subframe.com/62415f9da136/library?component=Xelix+Sidebar_abb5de8b-7b55-4826-baf3-f77a028e9f0c
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { XelixSidebar } from "../components/XelixSidebar";
import { FeatherArrowLeftRight } from "@subframe/core";
import { FeatherFile } from "@subframe/core";
import { FeatherContact } from "@subframe/core";
import { FeatherLineChart } from "@subframe/core";
import { FeatherInbox } from "@subframe/core";
import { FeatherSend } from "@subframe/core";
import { Link } from "react-router-dom";

interface DefaultPageLayoutRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const DefaultPageLayoutRoot = React.forwardRef<
  HTMLElement,
  DefaultPageLayoutRootProps
>(function DefaultPageLayoutRoot(
  { children, className, ...otherProps }: DefaultPageLayoutRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-screen w-full items-start",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <XelixSidebar
        header={
          <img
            className="h-6 flex-none object-cover"
            src="https://res.cloudinary.com/subframe/image/upload/v1745312623/uploads/10502/hwq4zj057gkaymjsfurb.svg"
          />
        }
        expanded={false}
      >
        <XelixSidebar.NavItem icon={<FeatherArrowLeftRight />} selected={true}>
          Transactions
        </XelixSidebar.NavItem>
        <XelixSidebar.NavItem icon={<FeatherFile />}>
          Statements
        </XelixSidebar.NavItem>
        <XelixSidebar.NavItem icon={<FeatherContact />}>
          Master Vendor Data
        </XelixSidebar.NavItem>
        <XelixSidebar.NavItem icon={<FeatherLineChart />}>
          Reports
        </XelixSidebar.NavItem>
        <XelixSidebar.NavItem icon={<FeatherInbox />}>
          Helpdesk
        </XelixSidebar.NavItem>
        <div className="flex-grow" />
        <Link to="/email-content" style={{ textDecoration: 'none', color: 'inherit' }}>
          <XelixSidebar.NavItem icon={<FeatherSend />} className="group-hover/abb5de8b:justify-start">
            <span className="hidden group-hover/abb5de8b:inline">Email Content</span>
          </XelixSidebar.NavItem>
        </Link>
      </XelixSidebar>
      {children ? (
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 self-stretch overflow-y-auto bg-default-background">
          {children}
        </div>
      ) : null}
    </div>
  );
});

export const DefaultPageLayout = DefaultPageLayoutRoot;
