import { cn } from "@/shared/lib/helpers/styles";

import styles from "./Button.module.scss";

import { Link } from "@/i18n/navigation";

export const Button = ({
  children,
  variant,
  url,
  type,
  service,
  onClick,
  disabled,
  target,
}: {
  children: React.ReactNode;
  variant: "white" | "blue" | "bordered" | "black";
  url?: string;
  type: "button" | "submit" | "link";
  service?: string;
  onClick?: () => void;
  disabled?: boolean;
  target?: string;
}) => {
  const buttonUrl = service ? `/service-request-form?service=${service}` : url;

  return type === "link" ? (
    <Link
      href={buttonUrl ?? ""}
      className={cn(styles.button, styles[variant], styles.link)}
      target={target}
    >
      {children}
    </Link>
  ) : (
    <button
      type={type}
      className={cn(styles.button, styles[variant])}
      onClick={onClick ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
