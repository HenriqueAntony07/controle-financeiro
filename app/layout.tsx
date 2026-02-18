import "./globals.css";
<link rel="icon" type="image/png" href="/favicon.png" />
export const metadata = {
  title: "Controle Financeiro Pessoal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
