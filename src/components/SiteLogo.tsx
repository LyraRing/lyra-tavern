import Link from "next/link";

export default function SiteLogo() {
  return (
    <h1 className="text-xl font-bold text-blue-600">
      <Link href="/" className="hover:opacity-90">
        MySite
      </Link>
    </h1>
  );
}
