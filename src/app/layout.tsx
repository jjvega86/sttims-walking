import "./globals.css";

export const metadata = {
  title: "St. Timothy's Walking Club",
  description: "Statistics that extend Strava's features.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
