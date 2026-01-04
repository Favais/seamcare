import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const fetchDocuments = async ({ uploaderId }) => {
  try {
    const res = await api.get(`/uploadDocs`);
    return res.data.documents;
  } catch (error) {
    console.error("Fetch Documents Error:", error);
    return [];
  }
};

export const useDocument = () => {
  return useQuery({
    queryKey: ["documents"],
    queryFn: fetchDocuments,
  });
};
