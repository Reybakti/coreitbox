import { useMemo } from "react";

import { useSettings } from "@/hooks/use-settings";

export function useAppSettings() {
  const {
    data = [],
    ...rest
  } = useSettings();

  const settings =
    useMemo(() => {
      return data.reduce(
        (
          acc: Record<
            string,
            string
          >,
          item: any,
        ) => {
          acc[item.key] =
            item.value;

          return acc;
        },
        {},
      );
    }, [data]);

  return {
    settings,
    ...rest,
  };
}