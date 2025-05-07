"use client";

import React from "react";
import { DrawerLayout } from "@/ui/layouts/DrawerLayout";
import { TextField } from "@/ui/components/TextField";
import { TextArea } from "@/ui/components/TextArea";
import { Select } from "@/ui/components/Select";
import { Switch } from "@/ui/components/Switch";
import { Button } from "@/ui/components/Button";
import { FeatherX } from "@subframe/core";

interface Trigger {
  id: string;
  name: string;
  pattern: string;
  condition: string;
  action: string;
  status: boolean;
}

interface TriggerDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: Trigger;
  onSave?: (trigger: Trigger) => void;
}

export function TriggerDrawer({ open, onOpenChange, trigger, onSave }: TriggerDrawerProps) {
  const [formData, setFormData] = React.useState<Trigger>({
    id: '',
    name: '',
    pattern: '',
    condition: '',
    action: '',
    status: false
  });

  React.useEffect(() => {
    if (trigger) {
      setFormData(trigger);
    }
  }, [trigger]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    onOpenChange(false);
  };

  return (
    <DrawerLayout open={open} onOpenChange={onOpenChange}>
      <div className="flex h-full w-full flex-col items-start gap-6 bg-default-background">
        <div className="flex w-full items-center justify-between border-b border-solid border-neutral-border px-6 py-4">
          <div className="flex flex-col items-start gap-1">
            <span className="text-heading-3 font-heading-3 text-default-font">
              Edit Trigger
            </span>
            <span className="text-body font-body text-subtext-color">
              Modify trigger settings and conditions
            </span>
          </div>
          <Button
            variant="neutral-secondary"
            icon={<FeatherX />}
            onClick={() => onOpenChange(false)}
          />
        </div>
        <div className="flex w-full flex-col items-start gap-4 px-6">
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
            <div className="flex items-center gap-2">
              <Button
                variant="neutral-secondary"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DrawerLayout>
  );
} 