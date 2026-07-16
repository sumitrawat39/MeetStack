import StreamVideoProvider from "@/providers/StreamClientProviders";
import  { ReactNode } from "react";
import { Metadata } from "next";
export const metadata: Metadata= {
  title: "MeetStack",
  description: "Video calling app",
  icons:{
    icon:"/icons/logo.svg"
  }
};
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
