'use client';

import type { GalleryPhoto } from '@/lib/types';

interface Props {
  photos: GalleryPhoto[];
}

const PLACEHOLDER_COUNT = 8;

export default function GalleryMarquee({ photos }: Props) {
  const hasPhotos = photos.length > 0;
  const items = hasPhotos ? [...photos, ...photos] : Array.from({ length: PLACEHOLDER_COUNT * 2 });

  return (
    <section className="py-20 md:py-24 overflow-hidden">
      <div className="flex animate-marquee">
        {items.map((item, i) => {
          const photo = item as GalleryPhoto | undefined;
          return (
            <div
              key={`${hasPhotos ? photo?.id : 'ph'}-${i}`}
              className="shrink-0 w-[420px] md:w-[560px] aspect-[4/3] mx-3 md:mx-4 rounded-2xl overflow-hidden bg-gray-100"
            >
              {hasPhotos && photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo.image_url}
                  alt={photo.caption || ''}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, #e5e7eb 0, #e5e7eb 1px, transparent 1px, transparent 12px)',
                    backgroundColor: '#f9fafb',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
