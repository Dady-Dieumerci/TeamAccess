import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./Provider/AuthProvider";


export const metadata: Metadata = {
  title: "Team Access Control",
  description: "Role-Based Access control system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    suppressHydrationWarning
    >
      <body className="min-h-screen  bg-black ">
        <AuthProvider>{children}</AuthProvider>
</body>
    </html>
  );
}
