"use client";
import Link from "next/link";
import { useAuth } from "@/app/Provider/AuthProvider";
import { User } from "@/app/types";
import { usePathname } from "next/navigation";


interface HeaderProps {
  user: User | null;
}

const Header = ({ user }: HeaderProps) => {
  const pathname = usePathname();
  const { logout } = useAuth();

  const navigation = [
    {
      name: "Home",
      href: "/",
      show: true,
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      show: true,
    },
  ].filter((item) => item.show);

  const getNavItemClass = (href: string) => {
    let isActive = false;

    if (href === "/") {
      isActive = pathname === "/";
    } else if (href === "/dashboard") {
      isActive = pathname.startsWith(href);
    }

    return `px-3 py-2 rounded text-sm font-medium transition-colors ${
      isActive
        ? "bg-orange-400 hover:bg-orange-300 text-black"
        : "text-white hover:text-gray-700"
    }`;
  };

  return (
    <header className="border-b border-gray-800 border-b-1 p-3">
      <div className="container mx-auto px-4">
        <div className="flex h-10 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-orange-400">
            TeamAccess
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={getNavItemClass(item.href)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-300">
                  {user.name}  ({user.role})
                </span>

                <button onClick={logout} className="rounded bg-red-500 px-3 py-2 text-white transition-colors hover:bg-red-700">
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="rounded bg-orange-400 px-4 py-2 text-black transition-colors hover:bg-orange-300"
                >
                  Log In
                </Link>

                <Link
                  href="/register"
                  className="rounded px-4 py-2 text-white transition-colors hover:text-gray-400"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;