import type { Meta, StoryObj } from '@storybook/react';
import { Item } from "react-stately";
import { Select, SelectProps } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

const Template =
  ({ elements, ...args }: SelectProps<object> & { elements: { label: string }[] }) => {
    return (
      <Select {...args} label={args.label}>
        {elements.map(({ label }: { label: string }) => (
          <Item key={label} aria-label={label}>
            {label}
          </Item>
        ))}
      </Select>
    );
  };

export const Default: Story = {
  args: {
    elements: [{ label: "Français" }, { label: "English" }, { label: "Русский" }],
  },
};

export const FixedWidth: Story = {
  render: Template,
  args: {
    elements: [{ label: "Français" }, { label: "English" }, { label: "Русский" }],
    fill: "fixedWidth",
    buttonClassName: "w-[145px]",
  },
};

export const FillContainer: Story = {
  render: Template,
  args: {
    elements: [{ label: "Français" }, { label: "English" }, { label: "Русский" }],
    fill: "fillContainer",
  },
};

export const HugContent: Story = {
  render: Template,
  args: {
    elements: [{ label: "Français" }, { label: "English" }, { label: "Русский" }],
    fill: "hugContent",
  },
};
