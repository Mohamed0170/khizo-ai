import { Collection } from "@/components/shared/Collection"
import CreditSync from "@/components/shared/CreditSync"
import { navLinks } from "@/constants"
import { getAllImages } from "@/lib/actions/image.actions"
import { getUserById } from "@/lib/actions/user.actions"
import { auth } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

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
        <h1 className="home-heading">
          Unleash Your Creative Vision with Khizo AI
        </h1>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
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
