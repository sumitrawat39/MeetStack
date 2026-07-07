"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route ||
            (link.route !== "/" && pathname.startsWith(link.route));

          return (
            <Link
              key={link.label}
              href={link.route}
              className={cn(
                "flex items-center gap-4 rounded-lg p-4 justify-start",
                {
                  "bg-blue-1": isActive,
                }
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;