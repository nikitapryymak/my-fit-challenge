import Nav from "./nav";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex">
      <Nav />
      <div className="py-12 px-5">{children}</div>
    </div>
  );
}
