import "./globals.css";
import { Inter } from "next/font/google";
import HeaderPage from "./head";
import MainLayout from "./layout/MainLayout";
import { Providers } from "@/redux/provider";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shoe Store",
  description: "Nike Store Real",
  image:
    "https://res.cloudinary.com/dvtv1j2rn/image/upload/v1683883491/Ecommerce%20Boutique/Images-6_ktn6lg.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <HeaderPage />
      <body className={inter.className}>
        <ClerkProvider>
          <Providers>
            {" "}
            <MainLayout>{children}</MainLayout>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
