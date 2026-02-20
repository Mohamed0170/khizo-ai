import { Collection } from "@/components/shared/Collection"
import CreditSync from "@/components/shared/CreditSync"
import { navLinks } from "@/constants"
import { getAllImages } from "@/lib/actions/image.actions"
import { getUserById } from "@/lib/actions/user.actions"
import { auth } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard - Browse AI Transformed Images",
  description:
    "Browse and search through AI-transformed images. View restorations, generative fills, object removals, recolors, and background removals created with Khizo AI.",
};

const Dashboard = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery})

  // Get the user's MongoDB _id for credit sync
  const { userId } = auth();
  let buyerId = "";
  if (userId) {
    try {
      const user = await getUserById(userId);
      buyerId = user?._id || "";
    } catch (err) {
      console.error("Error getting user for credit sync:", err);
    }
  }

  return (
    <>
      {/* Credit sync component - handles post-payment credit verification */}
      <Suspense fallback={null}>
        <CreditSync buyerId={buyerId} />
      </Suspense>

      <section className="home">
        {/* Decorative floating shapes */}
        <div className="home-decoration">
          <div className="home-shape home-shape-1" />
          <div className="home-shape home-shape-2" />
          <div className="home-shape home-shape-3" />
        </div>

        <h1 className="home-heading">
          Unleash Your Creative Vision with Khizo AI
        </h1>
        <p className="text-white/70 text-sm md:text-base mt-1 max-w-md text-center">
          Transform your images with powerful AI tools
        </p>

        <ul className="flex-center w-full gap-6 sm:gap-10 md:gap-16 lg:gap-20 mt-4 flex-wrap">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="home-tool-link group"
            >
              <li className="home-tool-icon">
                <Image src={link.icon} alt="image" width={24} height={24} className="group-hover:scale-110 transition-transform duration-300" />
              </li>
              <p className="p-14-medium text-center text-white/90 group-hover:text-white transition-colors">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection 
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  )
}

export default Dashboard
