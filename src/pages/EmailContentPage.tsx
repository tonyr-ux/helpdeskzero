"use client";

import React, { useState } from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Breadcrumbs } from "@/ui/components/Breadcrumbs";
import { Button } from "@/ui/components/Button";
import { Link } from "react-router-dom";

function EmailContentPage() {
  const [emailContent, setEmailContent] = useState('');

  const handleSubmit = () => {
    // Here you can handle the email content submission
    console.log('Email content:', emailContent);
  };

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start gap-6 bg-default-background px-6 py-6 mobile:container mobile:max-w-none">
        <div className="flex w-full flex-col items-start">
          <Breadcrumbs>
            <Breadcrumbs.Item>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Helpdesk Zero</Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Item active={true}>Email Content</Breadcrumbs.Item>
          </Breadcrumbs>
        </div>

        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background p-4">
          <div className="flex w-full flex-col items-start gap-2">
            <span className="text-heading-3 font-heading-3 text-default-font">
              Email Content
            </span>
            <span className="text-body font-body text-subtext-color">
              Enter your email content below
            </span>
          </div>

          <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4">
            <textarea
              className="w-full h-[500px] p-4 rounded-md border border-solid border-neutral-border bg-default-background text-body font-body text-default-font resize-none"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Enter your email content here..."
            />
          </div>

          <div className="flex w-full items-center justify-end gap-2 pt-4 border-t border-solid border-neutral-border">
            <Button
              variant="neutral-secondary"
              onClick={() => setEmailContent('')}
            >
              Clear
            </Button>
            <Button onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default EmailContentPage; 