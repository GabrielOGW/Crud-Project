import { useState } from "react";
import { Nivel } from "../../interface/interfaces";

type SortBy = {
  key: keyof Nivel;
  ascending: boolean;
};

export const SortNivelData = (items: Nivel[]) => {
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

  const handleSort = (key: keyof Nivel) => {
    if (sortBy.key === key) {
      setSortBy({ ...sortBy, ascending: !sortBy.ascending });
    } else {
      setSortBy({ key, ascending: true });
    }
  };

  return { sortedItems, handleSort };
};
