import {
  Badge,
} from "@/components/ui/badge";

export function TicketDetailHeader({
  ticket,
}: any) {
  return (
    <div
      className="
      rounded-2xl

      border

      bg-card

      p-5
      "
    >
      <div
        className="
        flex

        flex-col
        gap-4

        lg:flex-row
        lg:justify-between
        "
      >
        <div>
          <p
            className="
            text-xs

            text-muted-foreground
            "
          >
            {
              ticket.ticketNumber
            }
          </p>

          <h1
            className="
            text-2xl
            font-bold
            "
          >
            {ticket.title}
          </h1>
        </div>

        <div
          className="
          flex
          gap-2
          "
        >
          <Badge>
            {ticket.priority}
          </Badge>

          <Badge
            variant="secondary"
          >
            {ticket.status}
          </Badge>
        </div>
      </div>
    </div>
  );
}