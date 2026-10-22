import { Metadata } from 'next';
import CollectionPageView from '@/components/CollectionPageView';
import { collectionsCatalog } from '@/lib/collections-data';

export const metadata: Metadata = {
  title: 'Handpainted tiles – European Heritage',
  description:
    'Explore our range of handpainted effect tiles influenced by heritage styles like Delft tiles. Ideal for kitchen splashbacks, bathroom walls, and decorative features.',
  openGraph: {
    title: 'Handpainted tiles – European Heritage',
    description:
      'Explore our range of handpainted effect tiles influenced by heritage styles like Delft tiles.',
    images: [
      {
        url: collectionsCatalog['handpainted-tiles'].heroImage,
        alt: 'Handpainted tiles',
      },
    ],
  },
};

export default function HandpaintedTilesPage() {
  return <CollectionPageView collection={collectionsCatalog['handpainted-tiles']} />;
}
