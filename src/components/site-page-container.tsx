import type { ReactNode } from "react";

type SitePageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function SitePageContainer({ children, className }: SitePageContainerProps) {
  return (
    <div
      className={["mx-auto w-full max-w-screen-2xl px-6 py-6", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
