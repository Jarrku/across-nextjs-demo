import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import { HelloWorld, HelloProps } from "../components/HelloWorld";

export default { title: "Hello World", component: HelloWorld } as Meta;

const Template: Story<HelloProps> = (args) => <HelloWorld {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: "Simon",
};
