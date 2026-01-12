type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function SettingSection({ title, children }: SectionProps) {
  return (
    <div className="mb-10">
      <hr className="border-gray-300 mb-6" />
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
