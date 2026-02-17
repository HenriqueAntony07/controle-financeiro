export const metadata = {
  title: "Controle Financeiro",
  description: "Gerencie suas finanças com gráficos e PDF",
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
