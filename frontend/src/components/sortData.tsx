import { useState } from "react";
import { Devs } from "../interface/interfaces";

type SortBy = {
  key: keyof Devs;
  ascending: boolean;
};

export const useSortableData = (items: Devs[]) => {
  const [sortBy, setSortBy] = useState<SortBy>({ key: "id", ascending: true });

  const sortedItems = [...items].sort((a, b) => {
    const compareResult =
      a[sortBy.key] < b[sortBy.key]
        ? -1
        : a[sortBy.key] > b[sortBy.key]
        ? 1
        : 0;
    return sortBy.ascending ? compareResult : -compareResult;
  });

  const handleSort = (key: keyof Devs) => {
    if (sortBy.key === key) {
      setSortBy({ ...sortBy, ascending: !sortBy.ascending });
    } else {
      setSortBy({ key, ascending: true });
    }
  };

  return { sortedItems, handleSort };
};
