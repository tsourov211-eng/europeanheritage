import { Metadata } from 'next';
import CollectionPageView from '@/components/CollectionPageView';
import { collectionsCatalog, getCollection } from '@/lib/collections-data';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.keys(collectionsCatalog).map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const collection = getCollection(params.slug);
  return {
    title: `${collection.title} – European Heritage`,
    description: collection.description,
    openGraph: {
      title: `${collection.title} – European Heritage`,
      description: collection.description,
      images: [
        {
          url: collection.heroImage,
          alt: collection.title,
        },
      ],
    },
  };
}

export default function CollectionDynamicPage({ params }: PageProps) {
  const collection = getCollection(params.slug);
  return <CollectionPageView collection={collection} />;
}
