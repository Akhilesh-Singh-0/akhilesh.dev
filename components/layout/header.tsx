import Image from "next/image";
import Link from "next/link";

type NavItem = { label: string; href: string };

type HeaderProps = {
  nav: NavItem[];
  actions?: React.ReactNode;
};

export function Header({ nav, actions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-bg">
      <div className="mx-auto flex h-14 w-full max-w-2xl items-center justify-between gap-4 px-6 sm:border-x sm:border-rule">
        <div className="flex min-w-0 items-center gap-4">
          
        <Link
          href="/"
          aria-label="Akhilesh Singh — Home"
          className="flex shrink-0 items-center"
        >
          <Image
            src="/logo.png"
            alt="Akhilesh Singh"
            width={64}
            height={32}
            priority
            className="h-8 w-auto object-contain"
          />
        </Link>

          <nav
            aria-label="Main"
            className="-mx-2 flex min-w-0 items-center overflow-x-auto"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-2 py-1 text-sm font-medium underline-offset-4 hover:underline"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {actions}
      </div>
    </header>
  );
}