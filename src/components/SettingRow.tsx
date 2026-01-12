type SettingRowProps = {
  label: string;
  buttonText: string;
  buttonColor?: string;
};

export default function SettingRow({
  label,
  buttonText,
  buttonColor = "#F5F5F5",
}: SettingRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white">{label}</span>
      <button
        style={{ backgroundColor: buttonColor }}
        className="px-4 py-1.5 rounded-md border border-gray-300 text-sm font-medium
                     hover:bg-gray-100 transition bg-white text-black"
      >
        {buttonText}
      </button>
    </div>
  );
}
