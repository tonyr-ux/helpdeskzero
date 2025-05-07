"use client";

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Button } from "@/ui/components/Button";
import { FeatherSettings } from "@subframe/core";
import { TextField } from "@/ui/components/TextField";
import { FeatherSearch } from "@subframe/core";
import { FeatherListFilter } from "@subframe/core";
import { Tabs } from "@/ui/components/Tabs";
import { FeatherMail } from "@subframe/core";
import { FeatherCheckCircle } from "@subframe/core";
import { Table } from "@/ui/components/Table";
import { Avatar } from "@/ui/components/Avatar";
import { Badge } from "@/ui/components/Badge";
import { FeatherLayers } from "@subframe/core";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherArchive } from "@subframe/core";
import { FeatherTrash } from "@subframe/core";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { FeatherZap } from "@subframe/core";
import { FeatherAward } from "@subframe/core";
import { FeatherTarget } from "@subframe/core";
import { FeatherX } from "@subframe/core";
import { FeatherDownload } from "@subframe/core";
import { FeatherClock } from "@subframe/core";
import { TicketDrawer, TicketData } from "./components/TicketDrawer";
import TriggerCreationPage from "./pages/TriggerCreationPage";
import EmailContentPage from "./pages/EmailContentPage";

function HelpdeskApp() {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketData | undefined>();
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [selectedTickets, setSelectedTickets] = useState<Set<string>>(new Set());
  const [acknowledgedTickets, setAcknowledgedTickets] = useState<Set<string>>(new Set());

  const handleSelectAll = (tickets: TicketData[]) => {
    if (selectedTickets.size === tickets.length) {
      setSelectedTickets(new Set());
    } else {
      setSelectedTickets(new Set(tickets.map(ticket => ticket.id)));
    }
  };

  const handleSelectTicket = (ticketId: string) => {
    const newSelected = new Set(selectedTickets);
    if (newSelected.has(ticketId)) {
      newSelected.delete(ticketId);
    } else {
      newSelected.add(ticketId);
    }
    setSelectedTickets(newSelected);
  };

  const handleOpenTicket = (ticket: TicketData) => {
    setSelectedTicket(ticket);
    setIsDrawerOpen(true);
  };

  const handleAcknowledgeAll = () => {
    const newAcknowledged = new Set(acknowledgedTickets);
    selectedTickets.forEach(ticketId => {
      newAcknowledged.add(ticketId);
    });
    setAcknowledgedTickets(newAcknowledged);
    setSelectedTickets(new Set());
  };

  const handleAcknowledgeTicket = (ticketId: string) => {
    const newAcknowledged = new Set(acknowledgedTickets);
    newAcknowledged.add(ticketId);
    setAcknowledgedTickets(newAcknowledged);
  };

  const handleSettingsClick = () => {
    navigate('/triggers');
  };

  const handleMoveToCompleted = (ticket: TicketData, action: 'yes' | 'no') => {
    // Remove from active list
    setActiveTicketsList(prev => prev.filter(t => t.id !== ticket.id));
    
    // Add to completed list with action taken
    const completedTicket = {
      ...ticket,
      actionTaken: action === 'yes' ? 'Approved' : 'Rejected'
    };
    setCompletedTicketsList(prev => [completedTicket, ...prev]);
    
    // Add to acknowledged tickets
    const newAcknowledged = new Set(acknowledgedTickets);
    newAcknowledged.add(ticket.id);
    setAcknowledgedTickets(newAcknowledged);
  };

  const getActionRequired = (ticket: TicketData): string => {
    if (ticket.hasDraft) return "Needs reply";
    if (ticket.category === "Invoice Query") return "Send payment status";
    if (ticket.category === "Statement Query") return "Export statement";
    if (ticket.category === "Payment Terms") return "Approve terms";
    if (ticket.category === "Vendor Setup") return "Review application";
    if (ticket.category === "Overdue Payment") return "Send reminder";
    if (ticket.category === "License Renewal") return "Process renewal";
    if (ticket.category === "Account Setup") return "Create account";
    if (ticket.category === "System Maintenance") return "Schedule maintenance";
    return "Review request";
  };

  const tickets: TicketData[] = [
    {
      id: "173524",
      subject: "Invoice #INV-2024-056 Payment Status",
      description: "Follow up on payment status for invoice #INV-2024-056",
      assignedTo: {
        name: "Sarah Chen",
        initials: "SC",
      },
      category: "Invoice Query",
      priority: "Urgent",
      hasDraft: false,
      date: "07/07/2024 - 11:55",
      sender: {
        name: "Bowers Morgan",
        email: "clarence.boddicker@bowersmorgan.com",
      },
      attachments: [
        { name: "invoice01_01_24.pdf", type: "pdf" },
        { name: "invoice02_01_24.pdf", type: "pdf" },
        { name: "invoice03_01_24.pdf", type: "pdf" },
      ],
      content: `Good morning,

Can you please update me on the status of the following invoices?

20677365 - £3,575.00
0115644 - £784.00
02826252 - £784.00
0183987 - £1,847.32

KR,
Clarence`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "27/06/2024 at 11:09",
          icon: <FeatherDownload />,
        },
        {
          type: "message",
          description: "John Matrix sent a message",
          date: "27/06/2024 at 11:09",
          icon: <FeatherDownload />,
        },
        {
          type: "trigger",
          description: "Trigger Name of Trigger activated",
          date: "27/06/2024 at 11:09",
          icon: <FeatherZap />,
        },
        {
          type: "automation",
          description: "Automation Name of Automation activated",
          date: "27/06/2024 at 11:09",
          icon: <FeatherClock />,
        },
      ],
    },
    {
      id: "173525",
      subject: "Monthly Statement Discrepancy",
      description: "Investigate discrepancy in monthly statement",
      assignedTo: {
        name: "Michael Brown",
        initials: "MB",
      },
      category: "Statement Query",
      priority: "High",
      hasDraft: true,
      date: "07/07/2024 - 10:30",
      sender: {
        name: "Acme Corp",
        email: "finance@acmecorp.com",
      },
      attachments: [
        { name: "statement_jan_2024.pdf", type: "pdf" },
      ],
      content: `Hello,

We've noticed a discrepancy in our January statement. The total amount shown doesn't match our records.

Could you please review and provide clarification?

Best regards,
Finance Team`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "27/06/2024 at 10:30",
          icon: <FeatherDownload />,
        },
      ],
    },
    {
      id: "173526",
      subject: "Payment Terms Update Request",
      description: "Request to update payment terms for future invoices",
      assignedTo: {
        name: "Emma Wilson",
        initials: "EW",
      },
      category: "Payment Terms",
      priority: "Medium",
      hasDraft: false,
      date: "07/07/2024 - 09:15",
      sender: {
        name: "Tech Solutions Ltd",
        email: "accounts@techsolutions.com",
      },
      attachments: [],
      content: `Dear Accounts Team,

We would like to request an update to our payment terms from Net 30 to Net 60 for all future invoices.

Please let us know if this can be accommodated.

Regards,
Accounts Department`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "27/06/2024 at 09:15",
          icon: <FeatherDownload />,
        },
      ],
    },
    {
      id: "173527",
      subject: "Vendor Account Setup",
      description: "New vendor account setup request",
      assignedTo: {
        name: "James Lee",
        initials: "JL",
      },
      category: "Vendor Setup",
      priority: "Low",
      hasDraft: true,
      date: "07/07/2024 - 08:45",
      sender: {
        name: "Global Supplies Inc",
        email: "setup@globalsupplies.com",
      },
      attachments: [
        { name: "vendor_application.pdf", type: "pdf" },
        { name: "tax_certificate.pdf", type: "pdf" },
      ],
      content: `Hello,

We would like to set up a new vendor account with your company.

Please find attached our application form and tax certificate.

Looking forward to your response.

Best regards,
Vendor Relations Team`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "27/06/2024 at 08:45",
          icon: <FeatherDownload />,
        },
      ],
    },
    {
      id: "173528",
      subject: "Overdue Payment Follow-up",
      description: "Follow up on overdue payment",
      assignedTo: {
        name: "Rachel Park",
        initials: "RP",
      },
      category: "Overdue Payment",
      priority: "Urgent",
      hasDraft: false,
      date: "07/07/2024 - 08:00",
      sender: {
        name: "Premier Services",
        email: "collections@premierservices.com",
      },
      attachments: [
        { name: "overdue_notice.pdf", type: "pdf" },
      ],
      content: `Dear Accounts Payable,

This is a reminder that payment for invoice #PS-2024-089 is now 45 days overdue.

Please process the payment immediately to avoid any service disruptions.

Regards,
Collections Department`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "27/06/2024 at 08:00",
          icon: <FeatherDownload />,
        },
      ],
    },
  ];

  const pendingTickets: TicketData[] = [
    {
      id: "173529",
      subject: "Software License Renewal",
      description: "Annual software license renewal request",
      assignedTo: {
        name: "Alex Turner",
        initials: "AT",
      },
      category: "License Renewal",
      priority: "High",
      hasDraft: false,
      date: "07/07/2024 - 14:30",
      sender: {
        name: "Tech Solutions Inc",
        email: "licenses@techsolutions.com",
      },
      attachments: [
        { name: "license_agreement.pdf", type: "pdf" },
      ],
      content: `Dear Support Team,

Our annual software license is due for renewal next month. Please provide the renewal quote and process.

Best regards,
License Manager`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "27/06/2024 at 14:30",
          icon: <FeatherDownload />,
        },
      ],
    },
    {
      id: "173530",
      subject: "New Employee Onboarding",
      description: "Request for new employee account setup",
      assignedTo: {
        name: "Lisa Chen",
        initials: "LC",
      },
      category: "Account Setup",
      priority: "Medium",
      hasDraft: false,
      date: "07/07/2024 - 13:45",
      sender: {
        name: "HR Department",
        email: "hr@company.com",
      },
      attachments: [
        { name: "employee_details.pdf", type: "pdf" },
      ],
      content: `Hello IT Support,

We have a new employee joining next week. Please set up their account with the following details:
- Name: John Smith
- Department: Marketing
- Role: Marketing Specialist

Regards,
HR Team`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "27/06/2024 at 13:45",
          icon: <FeatherDownload />,
        },
      ],
    },
    {
      id: "173531",
      subject: "Server Maintenance Window",
      description: "Scheduled server maintenance notification",
      assignedTo: {
        name: "Mike Johnson",
        initials: "MJ",
      },
      category: "System Maintenance",
      priority: "Low",
      hasDraft: false,
      date: "07/07/2024 - 12:15",
      sender: {
        name: "System Admin",
        email: "admin@company.com",
      },
      attachments: [],
      content: `Team,

Please be advised that we will be performing scheduled maintenance on our servers this weekend.
Time: Saturday, 2:00 AM - 4:00 AM EST
Impact: Minimal, some services may be temporarily unavailable

Regards,
System Administration`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "27/06/2024 at 12:15",
          icon: <FeatherDownload />,
        },
      ],
    }
  ];

  const completedTickets: TicketData[] = [
    {
      id: "173532",
      subject: "System Update Complete",
      description: "System maintenance completed successfully",
      assignedTo: {
        name: "David Kim",
        initials: "DK",
      },
      category: "System Update",
      priority: "Medium",
      hasDraft: false,
      date: "06/07/2024 - 16:30",
      sender: {
        name: "IT Operations",
        email: "ops@company.com",
      },
      attachments: [
        { name: "update_report.pdf", type: "pdf" },
      ],
      content: `The scheduled system update has been completed successfully.
All services are now running on the latest version.

Regards,
IT Operations Team`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "26/06/2024 at 16:30",
          icon: <FeatherDownload />,
        },
      ],
      actionTaken: "Reply sent",
    },
    {
      id: "173533",
      subject: "Training Session Feedback",
      description: "Feedback received for recent training session",
      assignedTo: {
        name: "Sophie Martinez",
        initials: "SM",
      },
      category: "Training",
      priority: "Low",
      hasDraft: false,
      date: "06/07/2024 - 15:45",
      sender: {
        name: "Training Department",
        email: "training@company.com",
      },
      attachments: [
        { name: "feedback_summary.pdf", type: "pdf" },
      ],
      content: `Thank you for attending our recent training session.
Please find attached the feedback summary from all participants.

Best regards,
Training Team`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "26/06/2024 at 15:45",
          icon: <FeatherDownload />,
        },
      ],
      actionTaken: "Escalated to supervisor",
    },
    {
      id: "173534",
      subject: "Project Milestone Achieved",
      description: "Q2 project milestone completed",
      assignedTo: {
        name: "Robert Chen",
        initials: "RC",
      },
      category: "Project Update",
      priority: "High",
      hasDraft: false,
      date: "06/07/2024 - 14:20",
      sender: {
        name: "Project Management",
        email: "pm@company.com",
      },
      attachments: [
        { name: "milestone_report.pdf", type: "pdf" },
      ],
      content: `We are pleased to announce that we have successfully achieved our Q2 project milestone.
Please review the attached report for details.

Regards,
Project Management Office`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "26/06/2024 at 14:20",
          icon: <FeatherDownload />,
        },
      ],
      actionTaken: "Statement results sent",
    },
    {
      id: "173535",
      subject: "Invoice Payment Confirmation",
      description: "Payment received for invoice #INV-2024-089",
      assignedTo: {
        name: "Sarah Chen",
        initials: "SC",
      },
      category: "Payment Confirmation",
      priority: "Medium",
      hasDraft: false,
      date: "06/07/2024 - 13:15",
      sender: {
        name: "Finance Department",
        email: "finance@company.com",
      },
      attachments: [
        { name: "payment_confirmation.pdf", type: "pdf" },
      ],
      content: `Payment has been received for invoice #INV-2024-089.
Thank you for your prompt payment.

Regards,
Finance Team`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "26/06/2024 at 13:15",
          icon: <FeatherDownload />,
        },
      ],
      actionTaken: "Payment confirmation sent",
    },
    {
      id: "173536",
      subject: "Vendor Account Update",
      description: "Vendor account information updated",
      assignedTo: {
        name: "Michael Brown",
        initials: "MB",
      },
      category: "Vendor Management",
      priority: "Low",
      hasDraft: false,
      date: "06/07/2024 - 12:30",
      sender: {
        name: "Vendor Relations",
        email: "vendors@company.com",
      },
      attachments: [
        { name: "vendor_update.pdf", type: "pdf" },
      ],
      content: `Vendor account information has been successfully updated in our system.
All changes have been processed and confirmed.

Regards,
Vendor Relations Team`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "26/06/2024 at 12:30",
          icon: <FeatherDownload />,
        },
      ],
      actionTaken: "Account updated",
    },
    {
      id: "173537",
      subject: "Payment Terms Extension",
      description: "Payment terms extended for vendor",
      assignedTo: {
        name: "Emma Wilson",
        initials: "EW",
      },
      category: "Payment Terms",
      priority: "High",
      hasDraft: false,
      date: "06/07/2024 - 11:45",
      sender: {
        name: "Accounts Payable",
        email: "ap@company.com",
      },
      attachments: [
        { name: "terms_extension.pdf", type: "pdf" },
      ],
      content: `Payment terms have been extended as requested.
New terms will be effective from next billing cycle.

Regards,
Accounts Payable Team`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "26/06/2024 at 11:45",
          icon: <FeatherDownload />,
        },
      ],
      actionTaken: "Terms updated",
    },
    {
      id: "173538",
      subject: "Statement Discrepancy Resolved",
      description: "Monthly statement discrepancy investigation completed",
      assignedTo: {
        name: "James Lee",
        initials: "JL",
      },
      category: "Statement Query",
      priority: "Medium",
      hasDraft: false,
      date: "06/07/2024 - 10:20",
      sender: {
        name: "Finance Team",
        email: "finance@company.com",
      },
      attachments: [
        { name: "discrepancy_report.pdf", type: "pdf" },
      ],
      content: `The statement discrepancy has been investigated and resolved.
Please find attached the detailed report.

Regards,
Finance Team`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "26/06/2024 at 10:20",
          icon: <FeatherDownload />,
        },
      ],
      actionTaken: "Discrepancy resolved",
    },
    {
      id: "173539",
      subject: "Vendor Onboarding Complete",
      description: "New vendor onboarding process completed",
      assignedTo: {
        name: "Rachel Park",
        initials: "RP",
      },
      category: "Vendor Setup",
      priority: "Medium",
      hasDraft: false,
      date: "06/07/2024 - 09:35",
      sender: {
        name: "Procurement",
        email: "procurement@company.com",
      },
      attachments: [
        { name: "onboarding_complete.pdf", type: "pdf" },
      ],
      content: `Vendor onboarding process has been completed successfully.
All necessary documentation has been processed.

Regards,
Procurement Team`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "26/06/2024 at 09:35",
          icon: <FeatherDownload />,
        },
      ],
      actionTaken: "Onboarding completed",
    },
    {
      id: "173540",
      subject: "Payment Dispute Resolved",
      description: "Payment dispute investigation completed",
      assignedTo: {
        name: "Alex Turner",
        initials: "AT",
      },
      category: "Payment Dispute",
      priority: "High",
      hasDraft: false,
      date: "05/07/2024 - 16:50",
      sender: {
        name: "Dispute Resolution",
        email: "disputes@company.com",
      },
      attachments: [
        { name: "dispute_resolution.pdf", type: "pdf" },
      ],
      content: `The payment dispute has been investigated and resolved.
Please find attached the resolution details.

Regards,
Dispute Resolution Team`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "25/06/2024 at 16:50",
          icon: <FeatherDownload />,
        },
      ],
      actionTaken: "Dispute resolved",
    },
    {
      id: "173541",
      subject: "Credit Note Issued",
      description: "Credit note issued for overpayment",
      assignedTo: {
        name: "Lisa Chen",
        initials: "LC",
      },
      category: "Credit Note",
      priority: "Medium",
      hasDraft: false,
      date: "05/07/2024 - 15:15",
      sender: {
        name: "Accounts Receivable",
        email: "ar@company.com",
      },
      attachments: [
        { name: "credit_note.pdf", type: "pdf" },
      ],
      content: `Credit note has been issued for the overpayment.
Please find attached the credit note details.

Regards,
Accounts Receivable Team`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "25/06/2024 at 15:15",
          icon: <FeatherDownload />,
        },
      ],
      actionTaken: "Credit note issued",
    },
    {
      id: "173542",
      subject: "Payment Plan Approved",
      description: "Payment plan request approved",
      assignedTo: {
        name: "Mike Johnson",
        initials: "MJ",
      },
      category: "Payment Plan",
      priority: "High",
      hasDraft: false,
      date: "05/07/2024 - 14:30",
      sender: {
        name: "Credit Department",
        email: "credit@company.com",
      },
      attachments: [
        { name: "payment_plan.pdf", type: "pdf" },
      ],
      content: `Payment plan has been approved as requested.
Please find attached the payment schedule.

Regards,
Credit Department`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "25/06/2024 at 14:30",
          icon: <FeatherDownload />,
        },
      ],
      actionTaken: "Plan approved",
    },
    {
      id: "173543",
      subject: "Tax Certificate Updated",
      description: "Tax certificate information updated",
      assignedTo: {
        name: "David Kim",
        initials: "DK",
      },
      category: "Tax Documents",
      priority: "Low",
      hasDraft: false,
      date: "05/07/2024 - 13:45",
      sender: {
        name: "Tax Department",
        email: "tax@company.com",
      },
      attachments: [
        { name: "tax_certificate.pdf", type: "pdf" },
      ],
      content: `Tax certificate information has been updated in our system.
Please find attached the updated certificate.

Regards,
Tax Department`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "25/06/2024 at 13:45",
          icon: <FeatherDownload />,
        },
      ],
      actionTaken: "Certificate updated",
    },
    {
      id: "173544",
      subject: "Refund Processed",
      description: "Refund request processed",
      assignedTo: {
        name: "Sophie Martinez",
        initials: "SM",
      },
      category: "Refund",
      priority: "Medium",
      hasDraft: false,
      date: "05/07/2024 - 12:00",
      sender: {
        name: "Refund Department",
        email: "refunds@company.com",
      },
      attachments: [
        { name: "refund_confirmation.pdf", type: "pdf" },
      ],
      content: `Refund has been processed successfully.
Please find attached the refund confirmation.

Regards,
Refund Department`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "25/06/2024 at 12:00",
          icon: <FeatherDownload />,
        },
      ],
      actionTaken: "Refund processed",
    },
    {
      id: "173545",
      subject: "Bank Details Updated",
      description: "Vendor bank details updated",
      assignedTo: {
        name: "Robert Chen",
        initials: "RC",
      },
      category: "Bank Details",
      priority: "High",
      hasDraft: false,
      date: "05/07/2024 - 11:15",
      sender: {
        name: "Treasury",
        email: "treasury@company.com",
      },
      attachments: [
        { name: "bank_details.pdf", type: "pdf" },
      ],
      content: `Bank details have been updated in our system.
Please find attached the confirmation.

Regards,
Treasury Team`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "25/06/2024 at 11:15",
          icon: <FeatherDownload />,
        },
      ],
      actionTaken: "Details updated",
    },
    {
      id: "173546",
      subject: "Contract Renewal Complete",
      description: "Vendor contract renewal processed",
      assignedTo: {
        name: "Sarah Chen",
        initials: "SC",
      },
      category: "Contract",
      priority: "Medium",
      hasDraft: false,
      date: "05/07/2024 - 10:30",
      sender: {
        name: "Legal Department",
        email: "legal@company.com",
      },
      attachments: [
        { name: "contract_renewal.pdf", type: "pdf" },
      ],
      content: `Contract renewal has been processed successfully.
Please find attached the renewed contract.

Regards,
Legal Department`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "25/06/2024 at 10:30",
          icon: <FeatherDownload />,
        },
      ],
      actionTaken: "Contract renewed",
    },
    {
      id: "173547",
      subject: "Invoice Correction",
      description: "Invoice correction processed",
      assignedTo: {
        name: "Michael Brown",
        initials: "MB",
      },
      category: "Invoice",
      priority: "High",
      hasDraft: false,
      date: "05/07/2024 - 09:45",
      sender: {
        name: "Billing Department",
        email: "billing@company.com",
      },
      attachments: [
        { name: "corrected_invoice.pdf", type: "pdf" },
      ],
      content: `Invoice correction has been processed.
Please find attached the corrected invoice.

Regards,
Billing Department`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "25/06/2024 at 09:45",
          icon: <FeatherDownload />,
        },
      ],
      actionTaken: "Invoice corrected",
    },
    {
      id: "173548",
      subject: "Payment Authorization",
      description: "Payment authorization completed",
      assignedTo: {
        name: "Emma Wilson",
        initials: "EW",
      },
      category: "Payment",
      priority: "High",
      hasDraft: false,
      date: "05/07/2024 - 09:00",
      sender: {
        name: "Treasury",
        email: "treasury@company.com",
      },
      attachments: [
        { name: "authorization.pdf", type: "pdf" },
      ],
      content: `Payment authorization has been completed.
Please find attached the authorization details.

Regards,
Treasury Team`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "25/06/2024 at 09:00",
          icon: <FeatherDownload />,
        },
      ],
      actionTaken: "Payment authorized",
    },
    {
      id: "173549",
      subject: "Vendor Review Complete",
      description: "Annual vendor review completed",
      assignedTo: {
        name: "James Lee",
        initials: "JL",
      },
      category: "Vendor Review",
      priority: "Medium",
      hasDraft: false,
      date: "04/07/2024 - 16:15",
      sender: {
        name: "Vendor Management",
        email: "vendors@company.com",
      },
      attachments: [
        { name: "review_report.pdf", type: "pdf" },
      ],
      content: `Annual vendor review has been completed.
Please find attached the review report.

Regards,
Vendor Management Team`,
      activities: [
        {
          type: "message",
          description: "Inbound message received",
          date: "24/06/2024 at 16:15",
          icon: <FeatherDownload />,
        },
      ],
      actionTaken: "Review completed",
    }
  ];

  const [activeTicketsList, setActiveTicketsList] = useState<TicketData[]>([]);
  const [completedTicketsList, setCompletedTicketsList] = useState<TicketData[]>([]);

  useEffect(() => {
    setActiveTicketsList([...tickets, ...pendingTickets]);
    setCompletedTicketsList(completedTickets);
  }, []);

  const activeTicketsCount = activeTicketsList.length + completedTicketsList.length - acknowledgedTickets.size;

  return (
    <div className="app">
      <DefaultPageLayout>
        <div className="container max-w-none flex h-full w-full flex-col items-start gap-6 bg-default-background py-12">
          <div className="flex w-full items-start gap-4">
            <div className="flex grow shrink-0 basis-0 flex-col items-start justify-center gap-1">
              <span className="w-full text-heading-2 font-heading-2 text-default-font">
                Helpdesk Zero
              </span>
              <span className="text-body font-body text-subtext-color">
                You're on a 5-day streak! Keep going to earn your next badge.
              </span>
            </div>
            <Button
              variant="neutral-secondary"
              size="large"
              icon={<FeatherSettings />}
              onClick={handleSettingsClick}
            >
              Settings
            </Button>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full flex-wrap items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Inbox ({activeTicketsCount})
              </span>
              <div className="flex items-center gap-4">
                <TextField
                  variant="filled"
                  label=""
                  helpText=""
                  icon={<FeatherSearch />}
                >
                  <TextField.Input
                    placeholder="Search emails"
                    value=""
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                  />
                </TextField>
                <Button
                  variant="neutral-secondary"
                  icon={<FeatherListFilter />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Filter
                </Button>
              </div>
            </div>
            <Tabs>
              <Tabs.Item 
                active={activeTab === 'active'} 
                icon={<FeatherMail />}
                onClick={() => setActiveTab('active')}
              >
                Pending
              </Tabs.Item>
              <Tabs.Item 
                active={activeTab === 'completed'}
                icon={<FeatherCheckCircle />}
                onClick={() => setActiveTab('completed')}
              >
                Completed
              </Tabs.Item>
            </Tabs>
            <div className="flex w-full flex-col items-start border-t border-solid border-neutral-border pt-0.5 overflow-auto">
              {activeTab === 'active' && (
                <Table
                  header={
                    <Table.HeaderRow>
                      <Table.HeaderCell className="w-12">
                        <input
                          type="checkbox"
                          checked={selectedTickets.size === activeTicketsList.length}
                          onChange={() => handleSelectAll(activeTicketsList)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </Table.HeaderCell>
                      <Table.HeaderCell>Subject</Table.HeaderCell>
                      <Table.HeaderCell>Assigned to</Table.HeaderCell>
                      <Table.HeaderCell>Action Required</Table.HeaderCell>
                      <Table.HeaderCell>Category</Table.HeaderCell>
                      <Table.HeaderCell>Priority</Table.HeaderCell>
                      <Table.HeaderCell>Draft created</Table.HeaderCell>
                      <Table.HeaderCell className="h-8 w-auto flex-none">
                        Actions
                      </Table.HeaderCell>
                    </Table.HeaderRow>
                  }
                >
                  {activeTicketsList.map((ticket) => (
                    <Table.Row 
                      key={ticket.id}
                      onClick={(e) => {
                        // Don't open drawer if clicking on buttons or checkbox
                        if (
                          e.target instanceof HTMLElement &&
                          (e.target.closest('button') || e.target.closest('input[type="checkbox"]'))
                        ) {
                          return;
                        }
                        handleOpenTicket(ticket);
                      }}
                      className="cursor-pointer hover:bg-neutral-50"
                    >
                      <Table.Cell>
                        <input
                          type="checkbox"
                          checked={selectedTickets.has(ticket.id)}
                          onChange={() => handleSelectTicket(ticket.id)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <span className="text-body font-body text-default-font">
                            {ticket.subject}
                          </span>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Avatar
                            size="small"
                          >
                            {ticket.assignedTo.initials}
                          </Avatar>
                          <span className="text-body font-body text-default-font">
                            {ticket.assignedTo.name}
                          </span>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="warning" iconRight={<FeatherClock />}>
                          {getActionRequired(ticket)}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge iconRight={<FeatherLayers />}>{ticket.category}</Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant={
                          ticket.priority === 'Urgent' ? 'error' :
                          ticket.priority === 'High' ? 'warning' :
                          'neutral'
                        }>
                          {ticket.priority}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant={ticket.hasDraft ? 'success' : 'error'} 
                          iconRight={ticket.hasDraft ? <FeatherCheckCircle /> : <FeatherX />} 
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="brand-primary"
                            onClick={() => handleMoveToCompleted(ticket, 'yes')}
                          >
                            Mark as complete
                          </Button>
                          <Button
                            variant="destructive-primary"
                            onClick={() => handleMoveToCompleted(ticket, 'no')}
                          >
                            No action
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table>
              )}
              {activeTab === 'completed' && (
                <Table
                  header={
                    <Table.HeaderRow>
                      <Table.HeaderCell className="w-12">
                        <input
                          type="checkbox"
                          checked={selectedTickets.size === completedTicketsList.length}
                          onChange={() => handleSelectAll(completedTicketsList)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </Table.HeaderCell>
                      <Table.HeaderCell>Subject</Table.HeaderCell>
                      <Table.HeaderCell>Action taken</Table.HeaderCell>
                      <Table.HeaderCell>Category</Table.HeaderCell>
                      <Table.HeaderCell>Priority</Table.HeaderCell>
                      <Table.HeaderCell>Draft created</Table.HeaderCell>
                      <Table.HeaderCell className="h-8 w-auto flex-none">
                        Archive
                      </Table.HeaderCell>
                      <Table.HeaderCell className="h-8 w-auto flex-none">
                        Delete from list
                      </Table.HeaderCell>
                      <Table.HeaderCell className="h-8 w-auto flex-none" />
                    </Table.HeaderRow>
                  }
                >
                  {completedTicketsList.map((ticket) => (
                    <Table.Row 
                      key={ticket.id}
                      onClick={(e) => {
                        // Don't open drawer if clicking on buttons or checkbox
                        if (
                          e.target instanceof HTMLElement &&
                          (e.target.closest('button') || e.target.closest('input[type="checkbox"]'))
                        ) {
                          return;
                        }
                        handleOpenTicket(ticket);
                      }}
                      className="cursor-pointer hover:bg-neutral-50"
                    >
                      <Table.Cell className="w-12">
                        <input
                          type="checkbox"
                          checked={selectedTickets.has(ticket.id)}
                          onChange={() => handleSelectTicket(ticket.id)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                          <span className="w-full text-body-bold font-body-bold text-default-font">
                            {ticket.subject}
                          </span>
                          <span className="w-full text-caption font-caption text-subtext-color">
                            {ticket.description}
                          </span>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="success" iconRight={<FeatherCheckCircle />}>
                          {ticket.actionTaken}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge iconRight={<FeatherLayers />}>{ticket.category}</Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant={
                          ticket.priority === 'Urgent' ? 'error' :
                          ticket.priority === 'High' ? 'warning' :
                          'neutral'
                        }>
                          {ticket.priority}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant={ticket.hasDraft ? 'success' : 'error'} 
                          iconRight={ticket.hasDraft ? <FeatherCheckCircle /> : <FeatherX />} 
                        />
                      </Table.Cell>
                      <Table.Cell className="h-12 w-auto flex-none">
                        <IconButton
                          icon={<FeatherArchive />}
                          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                        />
                      </Table.Cell>
                      <Table.Cell className="h-12 w-auto flex-none">
                        <IconButton
                          icon={<FeatherTrash />}
                          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                        />
                      </Table.Cell>
                      <Table.Cell className="h-12 w-auto flex-none">
                        <Button
                          onClick={() => handleAcknowledgeTicket(ticket.id)}
                          disabled={acknowledgedTickets.has(ticket.id)}
                        >
                          {acknowledgedTickets.has(ticket.id) ? 'Acknowledged' : 'Acknowledge'}
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full items-center gap-2">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Achievements
              </span>
            </div>
            <div className="flex w-full flex-wrap items-start gap-4">
              <div className="flex grow shrink-0 basis-0 flex-col items-center gap-2 rounded-md border border-solid border-neutral-border px-6 py-6">
                <IconWithBackground size="large" icon={<FeatherZap />} />
                <span className="text-body-bold font-body-bold text-default-font">
                  5-Day Streak
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  Maintained Inbox Zero
                </span>
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-center gap-2 rounded-md border border-solid border-neutral-border px-6 py-6">
                <IconWithBackground
                  variant="success"
                  size="large"
                  icon={<FeatherAward />}
                />
                <span className="text-body-bold font-body-bold text-default-font">
                  Speed Champion
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  Processed 100 emails
                </span>
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-center gap-2 rounded-md border border-solid border-neutral-border px-6 py-6">
                <IconWithBackground
                  variant="warning"
                  size="large"
                  icon={<FeatherTarget />}
                />
                <span className="text-body-bold font-body-bold text-default-font">
                  Next Goal
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  7-Day Streak
                </span>
              </div>
            </div>
          </div>
        </div>
        {selectedTickets.size > 0 && activeTab === 'completed' && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 flex items-center gap-4">
            <span className="text-body-bold font-body-bold text-default-font">
              {selectedTickets.size} selected
            </span>
            <Button
              onClick={handleAcknowledgeAll}
              variant="brand-primary"
            >
              Acknowledge All
            </Button>
          </div>
        )}
      </DefaultPageLayout>
      <TicketDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        ticket={selectedTicket}
      />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HelpdeskApp />} />
        <Route path="/triggers" element={<TriggerCreationPage />} />
        <Route path="/email-content" element={<EmailContentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
