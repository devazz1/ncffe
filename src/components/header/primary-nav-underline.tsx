type PrimaryNavUnderlineProps = {
  /** When true, line stays visible (e.g. while a dropdown is open). */
  pinned?: boolean;
};

export function PrimaryNavUnderline({ pinned = false }: PrimaryNavUnderlineProps) {
  return (
    <span
      aria-hidden
      className={`mt-1 block h-0.75 w-10 origin-left bg-current transition-transform duration-300 ease-out motion-reduce:transition-none ${
        pinned ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`}
    />
  );
}
