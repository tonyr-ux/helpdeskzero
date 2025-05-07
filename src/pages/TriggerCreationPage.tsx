"use client";

import React, { useState } from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Breadcrumbs } from "@/ui/components/Breadcrumbs";
import { TextField } from "@/ui/components/TextField";
import { Switch } from "@/ui/components/Switch";
import { Button } from "@/ui/components/Button";
import { FeatherSearch } from "@subframe/core";
import { FeatherSend } from "@subframe/core";
import { Table } from "@/ui/components/Table";
import { TriggerDrawer } from "../components/TriggerDrawer";
import { Link } from "react-router-dom";

interface Trigger {
  id: string;
  name: string;
  pattern: string;
  status: boolean;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  trigger?: Trigger;
}

function TriggerCreationPage() {
  const initialTriggers: Trigger[] = [
    {
      id: "1",
      name: "Support Inquiry",
      pattern: "Customer support{issue}",
      status: true
    },
    {
      id: "2",
      name: "Feature Request",
      pattern: "I wish the product could",
      status: true
    },
    {
      id: "3",
      name: "Urgent Issues",
      pattern: "URGENT:{message}",
      status: false
    },
    {
      id: "4",
      name: "Bug Report",
      pattern: "Error: {error_message}",
      status: true
    },
    {
      id: "5",
      name: "Account Access",
      pattern: "Can't access my account",
      status: true
    },
    {
      id: "6",
      name: "Billing Query",
      pattern: "Payment issue with {amount}",
      status: false
    },
    {
      id: "7",
      name: "Product Feedback",
      pattern: "Feedback about {feature}",
      status: true
    },
    {
      id: "8",
      name: "Integration Help",
      pattern: "How to integrate with {service}",
      status: true
    },
    {
      id: "9",
      name: "API Support",
      pattern: "API error: {error_code}",
      status: false
    },
    {
      id: "10",
      name: "Documentation",
      pattern: "Where can I find docs for {topic}",
      status: true
    }
  ];

  const [triggers, setTriggers] = useState<Trigger[]>(initialTriggers);
  const [formData, setFormData] = useState({
    name: '',
    pattern: '',
    status: false
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTrigger, setSelectedTrigger] = useState<Trigger | undefined>();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentTrigger, setCurrentTrigger] = useState<Trigger | null>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateTrigger = () => {
    if (!formData.name || !formData.pattern) {
      return;
    }

    const newTrigger: Trigger = {
      id: Date.now().toString(),
      ...formData
    };

    setTriggers(prev => [newTrigger, ...prev]);
    
    setFormData({
      name: '',
      pattern: '',
      status: false
    });
  };

  const handleOpenTrigger = (trigger: Trigger) => {
    setSelectedTrigger(trigger);
    setIsDrawerOpen(true);
  };

  const handleSaveTrigger = (updatedTrigger: Trigger) => {
    setTriggers(prev => prev.map(t => 
      t.id === updatedTrigger.id ? updatedTrigger : t
    ));
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, { role: 'user', content: currentMessage }]);
    
    // Create a new trigger based on the message
    const newTrigger: Trigger = {
      id: Date.now().toString(),
      name: currentMessage,
      pattern: `When user mentions "${currentMessage}"`,
      status: true
    };
    
    setCurrentTrigger(newTrigger);
    setCurrentMessage('');
    
    // Simulate assistant response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `I'll help you create a trigger for "${currentMessage}". Here's the standardized format:`,
        trigger: newTrigger
      }]);
    }, 1000);
  };

  const renderTriggerFormat = (trigger: Trigger | null) => {
    if (!trigger) {
      return (
        <>
          <div className="flex w-full flex-col items-start gap-2 rounded-md bg-neutral-50 p-4">
            <span className="text-body-bold font-body-bold text-default-font">
              Basic Format
            </span>
            <pre className="w-full whitespace-pre-wrap rounded-md bg-neutral-100 p-4 text-body font-body text-default-font">
              {`IF (condition)
  AND (additional condition)
  OR (alternative condition)
THEN
  action
  AND (additional action)
  OR (alternative action)`}
            </pre>
          </div>
          <div className="flex w-full flex-col items-start gap-2 rounded-md bg-neutral-50 p-4">
            <span className="text-body-bold font-body-bold text-default-font">
              Example
            </span>
            <pre className="w-full whitespace-pre-wrap rounded-md bg-neutral-100 p-4 text-body font-body text-default-font">
              {`IF message contains "urgent"
  AND priority is "high"
  OR message contains "emergency"
THEN
  notify support team
  AND set status to "urgent"
  OR escalate to manager`}
            </pre>
          </div>
        </>
      );
    }

    return (
      <div className="flex w-full flex-col items-start gap-4">
        <div className="flex w-full flex-col items-start gap-2 rounded-md bg-neutral-50 p-4">
          <span className="text-body-bold font-body-bold text-default-font">
            Current Trigger
          </span>
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-body-bold font-body-bold text-default-font text-neutral-500">
                IF
              </span>
              <div className="flex w-full items-center gap-2 pl-4">
                <span className="text-body font-body text-default-font">
                  message contains
                </span>
                <span className="text-body-bold font-body-bold text-default-font">
                  "{trigger.pattern}"
                </span>
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-body-bold font-body-bold text-default-font text-neutral-500">
                THEN
              </span>
              <div className="flex w-full items-center gap-2 pl-4">
                <span className="text-body font-body text-default-font">
                  create trigger
                </span>
                <span className="text-body-bold font-body-bold text-default-font">
                  "{trigger.name}"
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-2">
          <Button
            variant="neutral-secondary"
            onClick={() => setCurrentTrigger(null)}
          >
            Clear
          </Button>
          <Button
            onClick={() => {
              if (currentTrigger) {
                setTriggers(prev => [currentTrigger, ...prev]);
                setCurrentTrigger(null);
              }
            }}
          >
            Create Trigger
          </Button>
        </div>
      </div>
    );
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
            <Breadcrumbs.Item active={true}>Prompt Triggers</Breadcrumbs.Item>
          </Breadcrumbs>
        </div>
        <div className="flex w-full grow shrink-0 basis-0 items-start gap-6">
          {/* Left Panel - Triggers Table */}
          <div className="flex w-1/3 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background p-4 h-[calc(100vh-12rem)]">
            <div className="flex w-full items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Active Triggers
              </span>
              <TextField
                variant="filled"
                label=""
                helpText=""
                icon={<FeatherSearch />}
              >
                <TextField.Input
                  placeholder="Search triggers..."
                  value=""
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                />
              </TextField>
            </div>
            <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 overflow-auto">
              <Table
                header={
                  <Table.HeaderRow>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell />
                  </Table.HeaderRow>
                }
              >
                {triggers.map((trigger) => (
                  <Table.Row key={trigger.id}>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                        {trigger.name}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="line-clamp-1 text-body font-body text-neutral-500">
                        {trigger.pattern}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Switch
                        checked={trigger.status}
                        onCheckedChange={(checked: boolean) => {
                          setTriggers(prev => prev.map(t => 
                            t.id === trigger.id ? { ...t, status: checked } : t
                          ));
                        }}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex grow shrink-0 basis-0 items-center justify-end">
                        <Button
                          onClick={() => handleOpenTrigger(trigger)}
                        >
                          Open
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table>
            </div>
          </div>

          {/* Middle Panel - Chatbot Interface */}
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background p-4 h-[calc(100vh-12rem)]">
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Create Trigger
              </span>
              <span className="text-body font-body text-subtext-color">
                Chat with the assistant to create and configure triggers
              </span>
            </div>
            <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 overflow-auto">
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
            <div className="flex w-full items-center gap-2 pt-4 border-t border-solid border-neutral-border">
              <TextField
                className="grow shrink-0 basis-0"
                variant="filled"
                label=""
                helpText=""
              >
                <TextField.Input
                  placeholder="Type your message..."
                  value={currentMessage}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                    setCurrentMessage(event.target.value)}
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

          {/* Right Panel - Prompt/Code */}
          <div className="flex w-1/3 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background p-4 h-[calc(100vh-12rem)]">
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Trigger Format
              </span>
              <span className="text-body font-body text-subtext-color">
                {chatMessages.length > 0 ? 'Current Trigger' : 'Send a message to see trigger format'}
              </span>
            </div>
            <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 overflow-auto">
              {chatMessages.length > 0 ? (
                renderTriggerFormat(currentTrigger)
              ) : (
                <div className="flex w-full h-full items-center justify-center">
                  <span className="text-body font-body text-neutral-500">
                    Type a message in the chat to see the trigger format
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <TriggerDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        trigger={selectedTrigger}
        onSave={handleSaveTrigger}
      />
    </DefaultPageLayout>
  );
}

export default TriggerCreationPage; 