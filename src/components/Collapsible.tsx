import type { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function Collapsible({ title, children, defaultOpen = false }: Props) {
  return (
    <details
      className="my-4 rounded-lg border border-gray-200 bg-gray-50 p-4 transition-all dark:border-gray-700 dark:bg-gray-800"
      open={defaultOpen}
    >
      <summary className="cursor-pointer font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}
