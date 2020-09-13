import * as React from "react";

export const ThBlock: React.FC<any> = ({ children, ...props }) =>
React.createElement('th:block', props, children)


function useStaticContent() {
  const ref = React.useRef<HTMLElement>(null);
  const [render, setRender] = React.useState(typeof window === "undefined" || process.env.NODE_ENV === "development");

  React.useEffect(() => {
    // check if the innerHTML is empty as client side navigation
    // need to render the component without server-side backup
    const isEmpty = ref.current?.innerHTML === "";
    if (isEmpty) {
      setRender(true);
    }
  }, []);

  return [render, ref];
}

export function StaticContent({
  children,
  element = "div",
  ...props
}: {
  children: React.ReactChild[] | React.ReactChild;
  element: string;
  [x: string]: any;
}) {
  const [render, ref] = useStaticContent();

  // if we're in the server or a spa navigation, just render it
  if (render) {
    return React.createElement(element, {
      ...props,
      children
    });
  }

  // avoid re-render on the client
  return React.createElement(element, {
    ...props,
    ref,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: { __html: "" }
  });
}
