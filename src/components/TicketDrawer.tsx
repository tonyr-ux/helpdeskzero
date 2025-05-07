"use client";

import React, { useState } from "react";
import { DrawerLayout } from "@/ui/layouts/DrawerLayout";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherX } from "@subframe/core";
import { LinkButton } from "@/ui/components/LinkButton";
import { Badge } from "@/ui/components/Badge";
import { Avatar } from "@/ui/components/Avatar";
import { FeatherReply } from "@subframe/core";
import { FeatherShare } from "@subframe/core";
import { FeatherMoreVertical } from "@subframe/core";
import { FeatherFileText } from "@subframe/core";
import { FeatherChevronDown } from "@subframe/core";
import { FeatherDownload } from "@subframe/core";
import { Button } from "@/ui/components/Button";
import { FeatherZap } from "@subframe/core";
import { FeatherMoreHorizontal } from "@subframe/core";
import { FeatherTrash } from "@subframe/core";
import { TextField } from "@/ui/components/TextField";
import { FeatherSend } from "@subframe/core";
import { FeatherEdit } from "@subframe/core";

export type TicketData = {
  id: string;
  subject: string;
  description: string;
  assignedTo: {
    name: string;
    initials: string;
    image?: string;
  };
  category: string;
  priority: string;
  hasDraft: boolean;
  date: string;
  sender: {
    name: string;
    email: string;
  };
  attachments: {
    name: string;
    type: string;
  }[];
  content: string;
  activities: {
    type: string;
    description: string;
    date: string;
    icon: React.ReactNode;
  }[];
  actionTaken?: string;
};

interface TicketDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket?: TicketData;
}

export function TicketDrawer({ open, onOpenChange, ticket }: TicketDrawerProps) {
  const [draftReply, setDraftReply] = useState<string>(
    ticket?.hasDraft
      ? `Hi ${ticket?.sender.name},

Thank you for reaching out regarding ${ticket?.subject.toLowerCase()}. I understand your concern and will help you resolve this matter.

${ticket?.category === "Invoice Query" 
  ? "I'll check the payment status of your invoice and get back to you with the details shortly."
  : ticket?.category === "Payment Terms"
  ? "I'll review your request for payment terms extension and discuss this with our finance team."
  : ticket?.category === "Overdue Payment"
  ? "I'll investigate the overdue payment situation and provide you with a resolution plan."
  : "I'll look into this matter and provide you with an update as soon as possible."}

${ticket?.priority === "Urgent" 
  ? "Given the urgency of this matter, I'll prioritize this and get back to you within the next few hours."
  : "I'll get back to you with a detailed response within 24 hours."}

Please let me know if you have any additional information that might help us resolve this more efficiently.

Best regards,
${ticket?.assignedTo.name}`
      : ''
  );
  const [isEditing, setIsEditing] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const suggestionsRef = React.useRef<HTMLDivElement>(null);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI assistant. How can I help you with this ticket?"
    }
  ]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!suggestionsRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - suggestionsRef.current.offsetLeft);
    setScrollLeft(suggestionsRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !suggestionsRef.current) return;
    e.preventDefault();
    const x = e.pageX - suggestionsRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    suggestionsRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!ticket) return null;

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    // Add user message
    setChatMessages(prev => [...prev, { role: 'user', content: chatInput }]);

    // Handle draft reply request
    if (chatInput.toLowerCase().includes('draft a reply')) {
      const newDraftReply = `Hi ${ticket?.sender.name},

Thank you for reaching out regarding ${ticket?.subject.toLowerCase()}. I understand your concern and will help you resolve this matter.

${ticket?.category === "Invoice Query" 
  ? "I'll check the payment status of your invoice and get back to you with the details shortly."
  : ticket?.category === "Payment Terms"
  ? "I'll review your request for payment terms extension and discuss this with our finance team."
  : ticket?.category === "Overdue Payment"
  ? "I'll investigate the overdue payment situation and provide you with a resolution plan."
  : "I'll look into this matter and provide you with an update as soon as possible."}

${ticket?.priority === "Urgent" 
  ? "Given the urgency of this matter, I'll prioritize this and get back to you within the next few hours."
  : "I'll get back to you with a detailed response within 24 hours."}

Please let me know if you have any additional information that might help us resolve this more efficiently.

Best regards,
${ticket?.assignedTo.name}`;

      setDraftReply(newDraftReply);
      setIsEditing(true);
      
      // Add assistant response
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I've drafted a reply based on the ticket details. You can find it in the draft section above. Feel free to edit it before sending."
      }]);
    }

    setChatInput('');
  };

  const handleDiscardReply = () => {
    setDraftReply("");
    setIsEditing(false);
  };

  return (
    <DrawerLayout open={open} onOpenChange={onOpenChange}>
      <div className="flex h-full w-full flex-col items-start gap-4 pl-6">
        <div className="flex w-full flex-col items-start gap-4 px-6 py-6">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <IconButton
                icon={<FeatherX />}
                onClick={() => onOpenChange(false)}
              />
              <div className="flex items-center gap-2">
                <span className="text-body-bold font-body-bold text-default-font">
                  Ticket
                </span>
                <LinkButton
                  variant="brand"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  #{ticket.id}
                </LinkButton>
                <span className="text-body font-body text-subtext-color">
                  •
                </span>
                <span className="text-body font-body text-subtext-color">
                  {ticket.date}
                </span>
              </div>
            </div>
          </div>
          <span className="text-heading-3 font-heading-3 text-default-font">
            {ticket.subject}
          </span>
          <div className="flex w-full flex-wrap items-center gap-4">
            <div className="flex flex-col items-start gap-2">
              <span className="text-caption font-caption text-subtext-color">
                State
              </span>
              <Badge>New</Badge>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="text-caption font-caption text-subtext-color">
                Priority
              </span>
              <Badge>{ticket.priority}</Badge>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="text-caption font-caption text-subtext-color">
                Category
              </span>
              <div className="flex items-start gap-2">
                <Badge>{ticket.category}</Badge>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="text-caption font-caption text-subtext-color">
                Vendor
              </span>
              <Badge>{ticket.sender.name}</Badge>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="text-caption font-caption text-subtext-color">
                Source
              </span>
              <Badge>Internal</Badge>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="text-caption font-caption text-subtext-color">
                Assigned to
              </span>
              <div className="flex items-center gap-2">
                <Avatar size="small" image={ticket.assignedTo.image}>
                  {ticket.assignedTo.initials}
                </Avatar>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full grow shrink-0 basis-0 items-start gap-6 px-6">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4">
            {ticket.hasDraft && (
              <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-brand-200 bg-brand-50 px-4 py-4">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="brand">Draft Reply</Badge>
                    <span className="text-caption font-caption text-subtext-color">
                      Last edited {ticket.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconButton
                      icon={<FeatherEdit />}
                      onClick={() => setIsEditing(true)}
                    />
                    <IconButton
                      icon={<FeatherTrash />}
                      onClick={handleDiscardReply}
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col items-start gap-4">
                  <textarea
                    className="w-full rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 text-body font-body text-default-font"
                    rows={8}
                    value={draftReply}
                    onChange={(e) => setDraftReply(e.target.value)}
                  />
                  <div className="flex w-full items-center justify-end gap-2">
                    <Button
                      variant="neutral-secondary"
                      onClick={handleDiscardReply}
                    >
                      Discard
                    </Button>
                    <Button
                      variant="brand-primary"
                      icon={<FeatherSend />}
                      onClick={() => {
                        // TODO: Handle sending message
                        setIsEditing(false);
                      }}
                    >
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-body-bold font-body-bold text-brand-600">
                    {ticket.sender.name}
                  </span>
                  <span className="text-body font-body text-subtext-color">
                    &lt;{ticket.sender.email}&gt;
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-body font-body text-subtext-color">
                    {ticket.date}
                  </span>
                  <IconButton
                    icon={<FeatherReply />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                  <IconButton
                    icon={<FeatherShare />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                  <IconButton
                    icon={<FeatherMoreVertical />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </div>
              </div>
              {ticket.attachments.length > 0 && (
                <div className="flex w-full flex-row items-center gap-4 rounded-md bg-neutral-50 px-4 py-4">
                  {ticket.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FeatherFileText className="text-body font-body text-error-500" />
                      <span className="text-body font-body text-default-font">
                        {attachment.name}
                      </span>
                      <IconButton
                        icon={<FeatherChevronDown />}
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                      />
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <span className="text-body font-body text-subtext-color">
                      {ticket.attachments.length} attachments
                    </span>
                    <LinkButton
                      icon={<FeatherDownload />}
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                    >
                      Download All
                    </LinkButton>
                  </div>
                </div>
              )}
              <div className="flex w-full flex-col items-start gap-4">
                <span className="text-body font-body text-default-font whitespace-pre-line">
                  {ticket.content}
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-80 flex-none flex-col items-start gap-4 self-stretch">
            <div className="flex w-full items-center justify-between border-b border-solid border-neutral-border pb-4">
              <div className="flex items-center gap-4">
                <span className="text-body-bold font-body-bold text-default-font">
                  AI Assistant
                </span>
              </div>
              <IconButton
                icon={<FeatherX />}
                onClick={() => onOpenChange(false)}
              />
            </div>
            <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 overflow-auto">
              <div className="flex w-full flex-col items-start gap-4">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex w-full items-start gap-4 ${
                      message.role === 'assistant' ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div
                      className={`flex max-w-[80%] flex-col items-start gap-2 rounded-lg p-4 ${
                        message.role === 'assistant' 
                          ? 'bg-neutral-50' 
                          : 'bg-brand-50'
                      }`}
                    >
                      <span className="text-body font-body text-default-font">
                        {message.content}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-2 pt-4 border-t border-solid border-neutral-border bg-default-background sticky bottom-0">
              <div 
                ref={suggestionsRef}
                className="flex w-full overflow-x-auto gap-2 pb-2 cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div className="flex items-center gap-2 min-w-max">
                  <Button
                    variant="neutral-secondary"
                    size="small"
                    onClick={() => setChatInput('Draft a reply to this ticket')}
                  >
                    Draft a reply
                  </Button>
                  <Button
                    variant="neutral-secondary"
                    size="small"
                    onClick={() => setChatInput('Recategorise this ticket')}
                  >
                    Recategorise
                  </Button>
                  <Button
                    variant="neutral-secondary"
                    size="small"
                    onClick={() => setChatInput('Assign ticket to')}
                  >
                    Assign ticket to
                  </Button>
                  <Button
                    variant="neutral-secondary"
                    size="small"
                    onClick={() => setChatInput('Update priority to')}
                  >
                    Update priority
                  </Button>
                </div>
              </div>
              <div className="flex w-full items-center gap-2">
                <TextField
                  className="grow shrink-0 basis-0"
                  variant="filled"
                  label=""
                  helpText=""
                >
                  <TextField.Input
                    placeholder="Type your message..."
                    value={chatInput}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setChatInput(event.target.value);
                    }}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                      if (event.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                </TextField>
                <Button
                  icon={<FeatherSend />}
                  onClick={handleSendMessage}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center gap-2 border-t border-solid border-neutral-border px-4 py-4">
          <div className="flex items-center gap-2">
            <Button
              icon={<FeatherZap />}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Generate Reply
            </Button>
            <Button
              variant="neutral-primary"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Resolve
            </Button>
            <IconButton
              icon={<FeatherChevronDown />}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            />
            <IconButton
              icon={<FeatherMoreHorizontal />}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            />
            <IconButton
              icon={<FeatherTrash />}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            />
          </div>
        </div>
      </div>
    </DrawerLayout>
  );
} 