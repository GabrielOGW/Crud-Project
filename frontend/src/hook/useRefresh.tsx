import { useState } from "react";

export default function useRefresh() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return { refresh, handleRefresh };
}
