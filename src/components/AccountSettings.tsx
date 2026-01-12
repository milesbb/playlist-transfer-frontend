import SettingRow from "./SettingRow";
import SettingSection from "./SettingSection";

export default function AccountSettings() {
  return (
    <SettingSection title="Account">
      <SettingRow label="Email address" buttonText="Change" />
      <SettingRow label="Password" buttonText="Update" />
      <SettingRow
        label="Delete Account"
        buttonText="Delete"
        buttonColor="#EF4444"
      />
    </SettingSection>
  );
}
