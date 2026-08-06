/**
 * Shared page/section container.
 * Keeps content centered with consistent horizontal padding.
 */
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full container px-4 sm:px-6 lg:px-16",
        className,
      )}
    >
      {children}
    </div>
  );
}
