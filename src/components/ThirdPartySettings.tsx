import SettingRow from "./SettingRow";
import SettingSection from "./SettingSection";

export default function ThirdPartySettings() {
  return (
    <SettingSection title="Third Party Account Settings">
      <SettingRow label="Spotify" buttonText="Connect" buttonColor="#1DB954" />
    </SettingSection>
  );
}
