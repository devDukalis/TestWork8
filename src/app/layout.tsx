import { AppErrorBoundary } from "@/components/AppErrorBoundary";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppErrorBoundary>{children}</AppErrorBoundary>
      </body>
    </html>
  );
}

export default RootLayout;
