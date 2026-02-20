import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

const typeMetadata: Record<string, { title: string; description: string }> = {
  restore: {
    title: "Image Restore - Fix Old & Damaged Photos with AI",
    description:
      "Restore old, damaged, or blurry photos using AI. Automatically enhance image quality, fix scratches, and bring old memories back to life.",
  },
  fill: {
    title: "Generative Fill - Expand Images with AI",
    description:
      "Expand your images beyond their borders using AI generative fill. Choose from multiple aspect ratios including 16:9, 4:3, 1:1, and more.",
  },
  remove: {
    title: "Object Remove - Remove Unwanted Objects from Photos",
    description:
      "Remove unwanted objects, people, or text from your photos using AI. Clean up your images instantly and seamlessly.",
  },
  recolor: {
    title: "Object Recolor - Change Object Colors with AI",
    description:
      "Change the color of any object in your photos using AI. Recolor clothes, cars, furniture, and more with a single click.",
  },
  removeBackground: {
    title: "Background Remove - Remove Image Backgrounds with AI",
    description:
      "Remove backgrounds from images instantly using AI. Get transparent or clean backgrounds for product photos, portraits, and more.",
  },
};

export async function generateMetadata({
  params: { type },
}: SearchParamProps): Promise<Metadata> {
  const meta = typeMetadata[type] || {
    title: "AI Image Transformation",
    description: "Transform your images using AI-powered tools.",
  };
  return {
    title: meta.title,
    description: meta.description,
  };
}

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const { userId } = auth();
  const transformation = transformationTypes[type];

  if(!userId) redirect('/sign-in')

  const user = await getUserById(userId);

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
    
      <section className="mt-10">
        <TransformationForm 
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTransformationTypePage