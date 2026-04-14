'use client';

import type { GalleryPhoto } from '@/lib/types';
import { motion } from 'framer-motion';

interface Props {
  photos: GalleryPhoto[];
}

const PLACEHOLDER_COUNT = 8;

export default function GalleryMarquee({ photos }: Props) {
  const hasPhotos = photos.length > 0;
  const items = hasPhotos ? [...photos, ...photos] : Array.from({ length: PLACEHOLDER_COUNT * 2 });

  return (
    <section className="py-20 md:py-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="mb-10 md:mb-12 text-center px-8"
      >
        <p
          className="text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-gray-400 mb-2"
          style={{ fontFamily: 'var(--font-accent)' }}
        >
          Gallery
        </p>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
          테구아일랜드 갤러리
        </h2>
      </motion.div>

      <div className="flex animate-marquee">
        {items.map((item, i) => {
          const photo = item as GalleryPhoto | undefined;
          return (
            <div
              key={`${hasPhotos ? photo?.id : 'ph'}-${i}`}
              className="shrink-0 w-64 md:w-80 aspect-[4/3] mx-2 md:mx-3 rounded-2xl overflow-hidden bg-gray-100"
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
