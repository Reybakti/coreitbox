"use client";

import {
  useReportSummary,
} from "@/hooks/use-report-summary";

import {
  useReportPriority,
} from "@/hooks/use-report-priority";

import {
  useReportCategory,
} from "@/hooks/use-report-category";

import {
  useReportTechnicians,
} from "@/hooks/use-report-technicians";

export function ReportsDashboard() {
  const {
    data: summary,
  } = useReportSummary();

  const {
    data: priority,
  } = useReportPriority();

  const {
    data: categories,
  } = useReportCategory();

  const {
    data: technicians,
  } = useReportTechnicians();

  return (
    <div
      className="
      space-y-6
      "
    >
      <div
        className="
        grid
        gap-4

        md:grid-cols-2
        xl:grid-cols-4
        "
      >
        <Card
          title="Total Ticket"
          value={
            summary?.totalTickets || 0
          }
        />

        <Card
          title="Open"
          value={
            summary?.openTickets || 0
          }
        />

        <Card
          title="In Progress"
          value={
            summary?.inProgressTickets ||
            0
          }
        />

        <Card
          title="Closed"
          value={
            summary?.closedTickets || 0
          }
        />
      </div>

      <div
        className="
        grid
        gap-6

        lg:grid-cols-2
        "
      >
        <section
          className="
          rounded-3xl
          border

          bg-card

          p-6
          "
        >
          <h2
            className="
            text-lg
            font-semibold

            mb-5
            "
          >
            Ticket By Priority
          </h2>

          <div
            className="
            space-y-3
            "
          >
            <PriorityRow
              label="Low"
              value={
                priority?.low || 0
              }
            />

            <PriorityRow
              label="Medium"
              value={
                priority?.medium || 0
              }
            />

            <PriorityRow
              label="High"
              value={
                priority?.high || 0
              }
            />

            <PriorityRow
              label="Critical"
              value={
                priority?.critical || 0
              }
            />
          </div>
        </section>

        <section
          className="
          rounded-3xl
          border

          bg-card

          p-6
          "
        >
          <h2
            className="
            text-lg
            font-semibold

            mb-5
            "
          >
            Ticket By Category
          </h2>

          <div
            className="
            space-y-3
            "
          >
            {categories?.map(
              (
                item: any,
              ) => (
                <div
                  key={
                    item.id
                  }
                  className="
                  flex
                  items-center
                  justify-between

                  rounded-xl
                  border

                  p-4
                  "
                >
                  <span>
                    {
                      item.category
                    }
                  </span>

                  <span
                    className="
                    font-semibold
                    "
                  >
                    {
                      item.total
                    }{" "}
                    Ticket
                  </span>
                </div>
              ),
            )}

            {!categories
              ?.length && (
              <div
                className="
                text-sm
                text-muted-foreground
                "
              >
                No Data
              </div>
            )}
          </div>
        </section>
      </div>

      <section
        className="
        rounded-3xl
        border

        bg-card

        p-6
        "
      >
        <h2
          className="
          text-lg
          font-semibold

          mb-5
          "
        >
          Technician Performance
        </h2>

        <div
          className="
          grid
          gap-4

          md:grid-cols-2
          xl:grid-cols-3
          "
        >
          {technicians?.map(
            (
              tech: any,
            ) => (
              <div
                key={
                  tech.id
                }
                className="
                rounded-2xl
                border

                p-5
                "
              >
                <div
                  className="
                  font-semibold
                  text-lg
                  "
                >
                  {
                    tech.fullName
                  }
                </div>

                <div
                  className="
                  text-sm
                  text-muted-foreground
                  "
                >
                  @
                  {
                    tech.username
                  }
                </div>

                <div
                  className="
                  mt-4

                  grid
                  grid-cols-3

                  gap-2

                  text-center
                  "
                >
                  <div>
                    <div
                      className="
                      text-xs
                      text-muted-foreground
                      "
                    >
                      Assigned
                    </div>

                    <div
                      className="
                      text-xl
                      font-bold
                      "
                    >
                      {
                        tech.assigned
                      }
                    </div>
                  </div>

                  <div>
                    <div
                      className="
                      text-xs
                      text-muted-foreground
                      "
                    >
                      Resolved
                    </div>

                    <div
                      className="
                      text-xl
                      font-bold
                      "
                    >
                      {
                        tech.resolved
                      }
                    </div>
                  </div>

                  <div>
                    <div
                      className="
                      text-xs
                      text-muted-foreground
                      "
                    >
                      Closed
                    </div>

                    <div
                      className="
                      text-xl
                      font-bold
                      "
                    >
                      {
                        tech.closed
                      }
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}

          {!technicians
            ?.length && (
            <div
              className="
              text-sm
              text-muted-foreground
              "
            >
              No Data
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div
      className="
      rounded-3xl
      border

      bg-card

      p-6
      "
    >
      <div
        className="
        text-sm
        text-muted-foreground
        "
      >
        {title}
      </div>

      <div
        className="
        mt-3

        text-5xl
        font-bold
        "
      >
        {value}
      </div>
    </div>
  );
}

function PriorityRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div
      className="
      flex
      items-center
      justify-between

      rounded-xl
      border

      p-4
      "
    >
      <span>
        {label}
      </span>

      <span
        className="
        font-semibold
        text-lg
        "
      >
        {value}
      </span>
    </div>
  );
}