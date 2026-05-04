import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/types";

const primaryLinks = ["Home", "About us", "Impact Stories", "our Works", "Annual reports"] as const;
const supportLinks = ["FAQ", "Blogs", "Terms & Condition", "Privacy Policy"] as const;
const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/nandcarefoundation/",
    path: "M0 12C0 5.376 5.376 0 12 0C18.624 0 24 5.376 24 12C24 18.624 18.624 24 12 24C5.376 24 0 18.624 0 12ZM12.888 18.504V12.24H14.616L14.832 10.08H12.888V9C12.888 8.448 12.936 8.16 13.752 8.16H14.832V6H13.104C11.016 6 10.296 7.032 10.296 8.808V10.08H9V12.24H10.296V18.504H12.888Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nandcarefoundation/",
    path: "M0 12C0 5.376 5.376 0 12 0C18.624 0 24 5.376 24 12C24 18.624 18.624 24 12 24C5.376 24 0 18.624 0 12ZM12.24 6C10.56 6 10.344 6 9.672 6.024C9 6.072 8.544 6.168 8.16 6.312C7.752 6.48 7.392 6.696 7.056 7.032C6.696 7.392 6.48 7.728 6.336 8.16C6.168 8.544 6.072 9 6.048 9.672C6 10.344 6 10.536 6 12.24C6 13.944 6 14.16 6.048 14.832C6.072 15.48 6.168 15.936 6.336 16.344C6.48 16.752 6.696 17.088 7.056 17.448C7.392 17.784 7.752 18 8.16 18.168C8.544 18.312 9 18.432 9.672 18.456C10.344 18.48 10.56 18.504 12.24 18.504C13.944 18.504 14.16 18.48 14.832 18.456C15.504 18.432 15.936 18.312 16.344 18.168C16.752 18 17.112 17.784 17.448 17.448C17.808 17.088 18.024 16.752 18.168 16.344C18.336 15.936 18.432 15.48 18.456 14.832C18.504 14.16 18.504 13.944 18.504 12.24C18.504 10.536 18.504 10.344 18.456 9.672C18.432 9 18.336 8.544 18.168 8.16C18.024 7.728 17.808 7.392 17.448 7.032C17.112 6.696 16.752 6.48 16.344 6.312C15.936 6.168 15.48 6.072 14.832 6.024C14.16 6 13.944 6 12.24 6ZM11.688 7.128C11.856 7.128 12.048 7.128 12.24 7.128C13.92 7.128 14.112 7.128 14.784 7.152C15.384 7.176 15.72 7.296 15.936 7.368C16.224 7.488 16.44 7.632 16.656 7.848C16.872 8.064 17.016 8.256 17.112 8.568C17.208 8.784 17.304 9.12 17.328 9.72C17.376 10.368 17.376 10.584 17.376 12.24C17.376 13.92 17.376 14.112 17.328 14.76C17.304 15.384 17.208 15.72 17.112 15.936C17.016 16.224 16.872 16.416 16.656 16.656C16.44 16.872 16.224 16.992 15.936 17.112C15.72 17.208 15.384 17.304 14.784 17.328C14.112 17.352 13.92 17.376 12.24 17.376C10.584 17.376 10.392 17.352 9.72 17.328C9.12 17.304 8.784 17.208 8.568 17.112C8.28 16.992 8.064 16.872 7.848 16.656C7.632 16.44 7.488 16.224 7.368 15.936C7.296 15.696 7.2 15.384 7.152 14.76C7.128 14.112 7.128 13.92 7.128 12.24C7.128 10.584 7.128 10.368 7.152 9.72C7.2 9.096 7.296 8.784 7.368 8.568C7.488 8.256 7.632 8.064 7.848 7.848C8.064 7.632 8.28 7.488 8.568 7.368C8.784 7.296 9.12 7.176 9.72 7.152C10.296 7.128 10.536 7.128 11.688 7.128ZM15.576 8.16C15.168 8.16 14.832 8.496 14.832 8.904C14.832 9.312 15.168 9.648 15.576 9.648C16.008 9.648 16.344 9.312 16.344 8.904C16.344 8.496 16.008 8.16 15.576 8.16ZM12.24 9.024C10.488 9.024 9.048 10.464 9.048 12.24C9.048 14.016 10.488 15.456 12.24 15.456C13.992 15.456 15.456 14.016 15.456 12.24C15.456 10.464 14.016 9.024 12.24 9.024ZM12.24 10.152C13.392 10.152 14.328 11.088 14.328 12.24C14.328 13.392 13.392 14.328 12.24 14.328C11.112 14.328 10.176 13.392 10.176 12.24C10.176 11.088 11.112 10.152 12.24 10.152Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/swdeepak",
    path: "M0 12C0 5.376 5.376 0 12 0C18.624 0 24 5.376 24 12C24 18.624 18.624 24 12 24C5.376 24 0 18.624 0 12ZM8.472 10.056H5.664V18.504H8.472V10.056ZM8.664 7.44C8.64 6.624 8.04 6 7.08 6C6.12 6 5.496 6.624 5.496 7.44C5.496 8.256 6.12 8.904 7.056 8.904H7.08C8.04 8.904 8.664 8.256 8.664 7.44ZM18.6 13.656C18.6 11.064 17.208 9.864 15.36 9.864C13.872 9.864 13.2 10.68 12.84 11.256V10.056H10.032C10.056 10.848 10.032 18.504 10.032 18.504H12.84V13.776C12.84 13.536 12.864 13.272 12.936 13.104C13.128 12.6 13.584 12.072 14.376 12.072C15.384 12.072 15.792 12.84 15.792 13.992V18.504H18.6V13.656Z",
  },
] as const;

type SiteFooterProps = {
  categories: Category[];
};

export function SiteFooter({ categories }: SiteFooterProps) {
  const categoryLinks =
    categories.length > 0
      ? [...categories].sort((a, b) => a.displayOrder - b.displayOrder)
      : [];

  return (
    <footer className="mt-auto border-t border-zinc-300 bg-white">
      <div className="mx-auto w-full max-w-screen-2xl px-3 py-4 md:px-6 md:py-8 xl:px-16">
        <div className="flex flex-col gap-10 lg:gap-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:justify-between lg:gap-10">
            <div className="w-full max-w-2xl">
              <div className="flex items-center gap-3">
                <Image
                  src="/ncf_logo_nobg.png"
                  alt="Nand Care Foundation logo"
                  width={20}
                  height={20}
                  className="h-8 w-8 rounded-[10px] object-cover"
                />
                <div>
                  <p className="text-xs font-light">Nand Care</p>
                  <p className="text-sm font-normal">Foundation</p>
                </div>
              </div>
              <p className="mt-4 max-w-84 text-xs leading-6 text-[#767676] lg:max-w-2xl lg:text-sm lg:leading-8">
                Nand Care Foundation is a non-profit organization based in Dhanbad, dedicated to
                improving the lives of underprivileged communities. We work closely with local
                families to address critical issues such as poverty, lack of education, hunger, and
                child welfare.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-1 text-xs text-[#1e1e1e] sm:flex-row sm:gap-12 lg:gap-20 lg:pt-0 lg:text-sm">
              <nav className="space-y-2" aria-label="Primary links">
                {primaryLinks.map((item) => (
                  <Link key={item} href="#" className="block transition hover:text-zinc-900/75">
                    {item}
                  </Link>
                ))}
              </nav>

              <nav className="space-y-2" aria-label="Causes links">
                {categoryLinks.length > 0 ? (
                  categoryLinks.map((category) => (
                    <Link
                      key={category.categoryId}
                      href={`/cause/${category.slug}`}
                      className="block transition hover:text-zinc-900/75"
                    >
                      {category.name}
                    </Link>
                  ))
                ) : (
                  <p className="text-[#767676]">No causes available</p>
                )}
              </nav>

              <nav className="space-y-2" aria-label="Support links">
                {supportLinks.map((item) => (
                  <Link key={item} href="#" className="block transition hover:text-zinc-900/75">
                    {item}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex flex-col gap-5 border-t border-zinc-200 pt-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:pt-8">
            <div className="space-y-1.5 text-xs leading-6 text-[#767676] lg:text-sm lg:leading-7">
              <p><span className="font-bold">Contact No :</span> +91 - 7909054585</p>
              <p><span className="font-bold">Mail :</span> Nandcarefoundation@gmail.com</p>
              <p className="max-w-84 lg:max-w-3xl">
                <span className="font-bold">Registered office :</span> 2-A/3 SECOND FLOOR FRONT SIDE ASAF ALI ROAD
                TURKMAN GATE, New Delhi, DELHI, Delhi, India, 110002
              </p>
              <p><span className="font-bold">Working Area:</span> Dhanbad Jharkhand</p>
              <p>
                <span className="font-bold">CIN:</span> U85320DL2019NPL358219
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-[#1e1e1e]">Social Media</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="text-[#363333] transition hover:opacity-75"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d={item.path} fill="#363333" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-xs font-medium text-[#3a3a3a]">
            © 2025 Nandcarefoundation. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
