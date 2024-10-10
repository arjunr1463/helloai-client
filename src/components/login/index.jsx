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
    <div>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => toast.error("login failed! Something went wrong")}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
