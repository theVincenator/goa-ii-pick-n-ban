import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "GoA II Pick 'n' Ban Tool",
  description: 'Game & Art by wolffdesigna.',
};

export default function RootLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
