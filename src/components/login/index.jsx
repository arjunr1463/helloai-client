"use client";

//modules
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

//lib
import axiosInstance from "@/lib/axiosInstance";

const Login = () => {
  const router = useRouter();

  const handleLogin = async (credentialResponse) => {
    try {
      const userData = jwtDecode(credentialResponse.credential);
      const { data } = await axiosInstance.post("/v1/user/login", {
        name: userData.name,
        email: userData.email,
        profile_picture: userData.picture,
      });
      if (data.status) {
        Cookie.set("token", data.data);
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <div className="bg-[#171717] text-white h-screen flex flex-col gap-8 xl:gap-6 items-center justify-center">
      <div className="flex flex-col text-center">
        <h1 className="text-[32px] xl:text-[55px] font-monasansSemibold tracking-wider">
          Empowering Education with AI
        </h1>
        <h1 className="font-monasans tracking-wide hidden xl:flex xl:text-[16px]">
          Revolutionize learning and discovery with HelloAI, your intelligent
          companion for academic exploration.
        </h1>
      </div>
      <div>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => toast.error("login failed! Something went wrong")}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default Login;
