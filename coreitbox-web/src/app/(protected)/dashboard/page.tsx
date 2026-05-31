"use client";

import {
  Ticket,
  Clock3,
  CheckCircle2,
  Users,
  UserCog,
  AlertTriangle,
  Activity,
} from "lucide-react";

import {
  KpiCard,
} from "@/components/dashboard/kpi-card";

import {
  useDashboardSummary,
} from "@/hooks/use-dashboard-summary";

export default function DashboardPage() {
  const {
    data,
    isLoading,
  } =
    useDashboardSummary();

  if (isLoading) {
    return (
      <div
        className="
        flex
        items-center
        justify-center
        h-[400px]
        "
      >
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div>
        <h1
          className="
          text-3xl
          font-bold
          tracking-tight
          "
        >
          Dashboard
        </h1>

        <p
          className="
          text-muted-foreground
          "
        >
          Overview CoreITBox
        </p>
      </div>

      {/* HIGHLIGHT */}

      <div
        className="
        rounded-xl
        border
        bg-card
        p-6
        "
      >
        <h2
          className="
          text-lg
          font-semibold
          "
        >
          Ticket Overview
        </h2>

        <p
          className="
          mt-2
          text-muted-foreground
          "
        >
          Saat ini terdapat{" "}
          <span
            className="
            font-semibold
            text-foreground
            "
          >
            {data?.openTickets ?? 0}
          </span>{" "}
          ticket terbuka yang
          memerlukan tindak lanjut.
        </p>
      </div>

      {/* TICKET KPI */}

      <div
        className="
        grid
        gap-4

        sm:grid-cols-2
        lg:grid-cols-5
        "
      >
        <KpiCard
          title="Total Ticket"
          value={
            data?.totalTickets ??
            0
          }
          icon={
            <Ticket size={18} />
          }
        />

        <KpiCard
          title="Open"
          value={
            data?.openTickets ??
            0
          }
          icon={
            <AlertTriangle
              size={18}
            />
          }
        />

        <KpiCard
          title="Assigned"
          value={
            data?.assignedTickets ??
            0
          }
          icon={
            <Users size={18} />
          }
        />

        <KpiCard
          title="In Progress"
          value={
            data?.inProgressTickets ??
            0
          }
          icon={
            <Clock3 size={18} />
          }
        />

        <KpiCard
          title="Closed"
          value={
            data?.closedTickets ??
            0
          }
          icon={
            <CheckCircle2
              size={18}
            />
          }
        />
      </div>

      {/* USER KPI */}

      <div
        className="
        grid
        gap-4

        sm:grid-cols-2
        lg:grid-cols-2
        "
      >
        <KpiCard
          title="Total Users"
          value={
            data?.totalUsers ??
            0
          }
          icon={
            <Users size={18} />
          }
        />

        <KpiCard
          title="Technicians"
          value={
            data?.totalTechnicians ??
            0
          }
          icon={
            <UserCog
              size={18}
            />
          }
        />
      </div>

      {/* QUICK INFO */}

      <div
        className="
        rounded-xl
        border
        bg-card
        p-5
        "
      >
        <div
          className="
          flex
          items-center
          gap-2
          mb-3
          "
        >
          <Activity
            size={18}
          />

          <h3
            className="
            font-semibold
            "
          >
            Quick Summary
          </h3>
        </div>

        <ul
          className="
          space-y-2
          text-sm
          text-muted-foreground
          "
        >
          <li>
            • Total ticket:
            {" "}
            <strong>
              {data?.totalTickets ??
                0}
            </strong>
          </li>

          <li>
            • Ticket aktif:
            {" "}
            <strong>
              {(data?.openTickets ??
                0) +
                (data?.assignedTickets ??
                  0) +
                (data?.inProgressTickets ??
                  0)}
            </strong>
          </li>

          <li>
            • Ticket selesai:
            {" "}
            <strong>
              {data?.closedTickets ??
                0}
            </strong>
          </li>

          <li>
            • Total teknisi:
            {" "}
            <strong>
              {data?.totalTechnicians ??
                0}
            </strong>
          </li>
        </ul>
      </div>
    </div>
  );
}