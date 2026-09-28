import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export default function FetchPackages() {
  const {
    data: packages = [],
    isLoading: loading,
    refetch: fetchPackages,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const response = await api.get("/packages");
      return response.data;
    },
  });

  return { packages, fetchPackages, loading };
}
