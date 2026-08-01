import React, { useEffect, useState } from "react";
import api from "../../api/axios";

export default function FetchPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await api.get("/packages");
      console.log(response.data);
      setPackages(response.data);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return { packages, fetchPackages, loading, setPackages };
}
