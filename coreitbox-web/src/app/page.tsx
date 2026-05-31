import { AppLayout }
from "@/components/layout/app-layout";

export default function HomePage() {
  return (
    <AppLayout>
      <div
        className="
        space-y-6
        "
      >
        <div>
          <h1
            className="
            text-3xl
            font-bold
            "
          >
            Dashboard
          </h1>

          <p
            className="
            text-muted-foreground
            "
          >
            Welcome to CoreITBox
          </p>
        </div>

        <div
          className="
          grid

          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4

          gap-4
          "
        >
          <div className="rounded-2xl border p-6">
            Total Tickets
          </div>

          <div className="rounded-2xl border p-6">
            Open
          </div>

          <div className="rounded-2xl border p-6">
            In Progress
          </div>

          <div className="rounded-2xl border p-6">
            Closed
          </div>
        </div>
      </div>
    </AppLayout>
  );
}