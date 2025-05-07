"use client";
/*
 * Documentation:
 * Xelix Sidebar — https://app.subframe.com/62415f9da136/library?component=Xelix+Sidebar_abb5de8b-7b55-4826-baf3-f77a028e9f0c
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";
import { FeatherCircleDashed } from "@subframe/core";

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  selected?: boolean;
  rightSlot?: React.ReactNode;
  className?: string;
}

const NavItem = React.forwardRef<HTMLElement, NavItemProps>(function NavItem(
  {
    icon = <FeatherCircleDashed />,
    children,
    selected = false,
    rightSlot,
    className,
    ...otherProps
  }: NavItemProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/50c8e086 flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 hover:bg-neutral-50 active:bg-neutral-100",
        { "bg-brand-50 hover:bg-brand-50 active:bg-brand-100": selected },
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {icon ? (
        <SubframeCore.IconWrapper
          className={SubframeUtils.twClassNames(
            "text-heading-3 font-heading-3 text-neutral-100 group-hover/50c8e086:text-brand-500 group-active/50c8e086:text-brand-900",
            { "text-brand-700": selected }
          )}
        >
          {icon}
        </SubframeCore.IconWrapper>
      ) : null}
      {children ? (
        <span
          className={SubframeUtils.twClassNames(
            "line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-neutral-100 group-hover/50c8e086:text-brand-500 group-active/50c8e086:text-brand-900",
            { "text-brand-700": selected }
          )}
        >
          {children}
        </span>
      ) : null}
      {rightSlot ? <div className="flex items-center">{rightSlot}</div> : null}
    </div>
  );
});

interface XelixSidebarRootProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode;
  children?: React.ReactNode;
  expanded?: boolean;
  className?: string;
}

const XelixSidebarRoot = React.forwardRef<HTMLElement, XelixSidebarRootProps>(
  function XelixSidebarRoot(
    {
      header,
      children,
      expanded = false,
      className,
      ...otherProps
    }: XelixSidebarRootProps,
    ref
  ) {
    return (
      <nav
        className={SubframeUtils.twClassNames(
          "group/abb5de8b flex h-full w-16 flex-col items-start gap-2 bg-brand-primary cursor-default",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div
          className={SubframeUtils.twClassNames(
            "flex w-16 grow shrink-0 basis-0 flex-col items-start border-r border-solid border-neutral-border bg-default-background absolute top-0 bottom-0 transition-all group-hover/abb5de8b:w-60 group-hover/abb5de8b:grow group-hover/abb5de8b:shrink-0 group-hover/abb5de8b:basis-0",
            { "w-60 grow shrink-0 basis-0": expanded }
          )}
        >
          {header ? (
            <div
              className={SubframeUtils.twClassNames(
                "flex w-full flex-col items-start gap-2 bg-brand-primary px-5 py-6",
                { "bg-brand-primary": expanded }
              )}
            >
              {header}
            </div>
          ) : null}
          {children ? (
            <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-1 bg-brand-primary px-3 py-4 overflow-auto">
              {children}
            </div>
          ) : null}
        </div>
      </nav>
    );
  }
);

export const XelixSidebar = Object.assign(XelixSidebarRoot, {
  NavItem,
});
