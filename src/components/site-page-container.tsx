import type { ReactNode } from "react";

type SitePageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function SitePageContainer({ children, className }: SitePageContainerProps) {
  return (
    <div
      className={["mx-auto w-full max-w-7xl px-4 py-6", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
