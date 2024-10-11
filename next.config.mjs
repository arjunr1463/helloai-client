const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
        {
          protocol: "http",
          hostname: "**",
        },
      ],
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(mp4|webm|ogg|swf|ogv|ttf|woff|woff2|eot|otf)$/,
        type: "asset/resource",
      });
      return config;
    },
  };
  
  export default nextConfig;