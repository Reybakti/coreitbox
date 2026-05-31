import {
  Package,
} from "lucide-react";

export function MaterialCard({
  material,
}: {
  material: any;
}) {
  return (
    <div
      className="
      rounded-2xl
      border
      bg-card
      p-4
      "
    >
      <div
        className="
        flex
        items-start
        gap-3
        "
      >
        <div
          className="
          h-10
          w-10

          rounded-xl

          bg-blue-600

          text-white

          flex
          items-center
          justify-center
          "
        >
          <Package size={18} />
        </div>

        <div className="flex-1 min-w-0">
          <div
            className="
            flex
            flex-wrap

            items-center

            gap-2
            "
          >
            <h3
              className="
              font-semibold

              truncate
              "
            >
              {
                material.materialName
              }
            </h3>

            <span
              className="
              px-2
              py-1

              rounded-full

              text-xs

              bg-blue-100
              dark:bg-blue-900
              "
            >
              {material.quantity}
              {" "}
              {material.unit}
            </span>
          </div>

          {material.note && (
            <p
              className="
              mt-2

              text-sm

              text-muted-foreground

              break-words
              "
            >
              {material.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}