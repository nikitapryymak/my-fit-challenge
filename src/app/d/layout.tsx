import Nav from "./nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex">
      <Nav />
      <div className="py-12 px-5 w-full">{children}</div>
    </div>
  );
}
