import { Select } from "@konj-org/react-ui";

export const SelectDemo = () => {
  return (
    <Select
      label="Choose your color preference"
      defaultValueKey="systemDefault"
      values={[
        {
          label: <span>Dark Mode</span>,
          key: "darkMode",
        },
        {
          label: <span>Light Mode</span>,
          key: "lightMode",
        },
        {
          label: <span>System default</span>,
          key: "systemDefault",
        },
      ]}
    />
  );
};
