import { ReactNode } from "react";

type Props = {
  title: string;
  value: number | string;
  icon?: ReactNode;
  description?: string;
};

export function KpiCard({
  title,
  value,
  icon,
  description,
}: Props) {
  return (
    <div
      className="
      group
      rounded-xl
      border
      bg-card
      p-5
      transition-all
      hover:shadow-md
      hover:-translate-y-0.5
      "
    >
      <div
        className="
        flex
        items-start
        justify-between
        gap-3
        "
      >
        <div className="space-y-1">
          <p
            className="
            text-sm
            text-muted-foreground
            "
          >
            {title}
          </p>

          <h3
            className="
            text-3xl
            font-bold
            tracking-tight
            "
          >
            {value}
          </h3>

          {description && (
            <p
              className="
              text-xs
              text-muted-foreground
              "
            >
              {description}
            </p>
          )}
        </div>

        {icon && (
          <div
            className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            border
            bg-muted/50
            text-muted-foreground
            transition-colors
            group-hover:text-primary
            "
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}