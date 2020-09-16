import * as React from "react";

export interface HelloProps {
  message: string;
}

export function HelloWorld(props: HelloProps) {
  return <div>Hello {props.message}</div>;
}
