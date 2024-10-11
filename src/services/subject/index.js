//lib
import axiosInstance from "@/lib/axiosInstance";

const SubjectService = () => {
  const getSubject = async (url) => {
    try {
      const { data } = await axiosInstance.get(url);
      console.log("Data",data)
      return data.data
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return {
    getSubject,
  };
};

export default SubjectService;
