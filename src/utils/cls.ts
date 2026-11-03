const cls = (
  ...args: [...classNames: string[]] | [...classNames: string[], opt: Record<string, boolean> | undefined]
) => {
  const opt = typeof args.at(-1) === "object" ? args.at(-1) : undefined;
  const classNames = opt ? args.slice(0, -1) : args; // Get all elements except the last

  const finalClassNames = [...classNames];

  if (opt) {
    Object.entries(opt).forEach(([key, value]) => {
      if (value) {
        finalClassNames.push(key);
      }
    });
  }
  return finalClassNames.join(" ");
};

export default cls;