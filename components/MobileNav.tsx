"use client";

import React from "react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-64">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="hamburger icons"
            className="cursor-pointer sm:hidden "
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              width={32}
              height={32}
              alt="MeetStack Logo"
              className="max-sm:size-10"
            />
            <p className="text-[26px] font-extrabold text-white ">MeetStack</p>
          </Link>

          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((link) => {
                  const isActive =
                    pathname === link.route ||
                    (link.route !== "/" && pathname.startsWith(link.route));

                  return (
                    <SheetClose key={link.route}>
                      <Link
                        key={link.label}
                        href={link.route}
                        className={cn(
                          "flex items-center gap-4 rounded-lg p-4 w-full max-w-60",
                          {
                            "bg-blue-1": isActive,
                          },
                        )}
                      >
                        <Image
                          src={link.imgUrl}
                          alt={link.label}
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold  ">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
