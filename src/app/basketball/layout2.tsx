export default function BasketballLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" bg-white px-20 py-10">
      {children}
    </div>
  );
}
