"use client";

import React, { useState } from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Breadcrumbs } from "@/ui/components/Breadcrumbs";
import { TextField } from "@/ui/components/TextField";
import { TextArea } from "@/ui/components/TextArea";
import { Select } from "@/ui/components/Select";
import { Switch } from "@/ui/components/Switch";
import { Button } from "@/ui/components/Button";
import { FeatherPlus } from "@subframe/core";
import { FeatherSearch } from "@subframe/core";
import { Table } from "@/ui/components/Table";
import { Badge } from "@/ui/components/Badge";
import { TriggerDrawer } from "../components/TriggerDrawer";

interface Trigger {
  id: string;
  name: string;
  pattern: string;
  condition: string;
  action: string;
  status: boolean;
}

function TriggerCreationPage() {
  const initialTriggers: Trigger[] = [
    {
      id: "1",
      name: "Support Inquiry",
      pattern: "Customer support{issue}",
      condition: "contains",
      action: "respond",
      status: false
    },
    {
      id: "2",
      name: "Feature Request",
      pattern: "I wish the product could",
      condition: "contains",
      action: "notify",
      status: false
    },
    {
      id: "3",
      name: "Urgent Issues",
      pattern: "URGENT:{message}",
      condition: "regex",
      action: "notify",
      status: false
    }
  ];

  const [triggers, setTriggers] = useState<Trigger[]>(initialTriggers);
  const [formData, setFormData] = useState({
    name: '',
    pattern: '',
    condition: '',
    action: '',
    status: false
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTrigger, setSelectedTrigger] = useState<Trigger | undefined>();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateTrigger = () => {
    if (!formData.name || !formData.pattern || !formData.condition || !formData.action) {
      return; // Don't create if required fields are empty
    }

    const newTrigger: Trigger = {
      id: Date.now().toString(),
      ...formData
    };

    setTriggers(prev => [newTrigger, ...prev]);
    
    // Reset form
    setFormData({
      name: '',
      pattern: '',
      condition: '',
      action: '',
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

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start gap-6 bg-default-background px-6 py-6 mobile:container mobile:max-w-none">
        <div className="flex w-full flex-col items-start">
          <Breadcrumbs>
            <Breadcrumbs.Item>Automation</Breadcrumbs.Item>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Item active={true}>Prompt Triggers</Breadcrumbs.Item>
          </Breadcrumbs>
        </div>
        <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6">
          <div className="flex w-full flex-col items-start gap-2">
            <span className="text-heading-2 font-heading-2 text-default-font">
              Create Trigger
            </span>
            <span className="text-body font-body text-subtext-color">
              Configure automated actions based on prompt patterns
            </span>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <TextField
              className="h-auto w-full flex-none"
              label="Trigger Name"
              helpText="Give your trigger a descriptive name"
            >
              <TextField.Input
                placeholder="e.g., Customer Support Response"
                value={formData.name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                  handleInputChange('name', event.target.value)}
              />
            </TextField>
            <TextArea
              className="h-auto w-full flex-none"
              label="Prompt Pattern"
              helpText="Enter the prompt pattern to match"
            >
              <TextArea.Input
                placeholder="e.g., When customer asks about {product}"
                value={formData.pattern}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => 
                  handleInputChange('pattern', event.target.value)}
              />
            </TextArea>
            <div className="flex w-full flex-wrap items-start gap-4">
              <Select
                label="Trigger Condition"
                placeholder=""
                helpText="When should this trigger activate"
                value={formData.condition}
                onValueChange={(value: string) => handleInputChange('condition', value)}
              >
                <Select.Item value="contains">contains</Select.Item>
                <Select.Item value="exact">exact</Select.Item>
                <Select.Item value="regex">regex</Select.Item>
              </Select>
              <Select
                label="Action"
                placeholder=""
                helpText="What action should be taken"
                value={formData.action}
                onValueChange={(value: string) => handleInputChange('action', value)}
              >
                <Select.Item value="respond">respond</Select.Item>
                <Select.Item value="notify">notify</Select.Item>
                <Select.Item value="tag">tag</Select.Item>
              </Select>
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.status}
                  onCheckedChange={(checked: boolean) => handleInputChange('status', checked)}
                />
                <span className="text-body-bold font-body-bold text-default-font">
                  Active
                </span>
              </div>
              <Button
                icon={<FeatherPlus />}
                onClick={handleCreateTrigger}
              >
                Create Trigger
              </Button>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-4">
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
          <div className="flex w-full flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-default-background shadow-sm overflow-auto">
            <Table
              header={
                <Table.HeaderRow>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Pattern</Table.HeaderCell>
                  <Table.HeaderCell>Condition</Table.HeaderCell>
                  <Table.HeaderCell>Action</Table.HeaderCell>
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
                    <span className="whitespace-nowrap text-body font-body text-neutral-500">
                      {trigger.pattern}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge>{trigger.condition}</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant={
                      trigger.action === 'respond' ? 'warning' :
                      trigger.action === 'notify' ? 'neutral' :
                      'error'
                    }>
                      {trigger.action}
                    </Badge>
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