export type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
};
