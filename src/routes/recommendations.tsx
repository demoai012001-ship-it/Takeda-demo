import { createFileRoute } from '@tanstack/react-router';
import { Recommendations } from '@/components/intelligence/views';
export const Route = createFileRoute('/recommendations')({
 head: () => ({ meta: [{title: 'Results & Recommendations — Takeda IBD Intelligence'}, {name:'description',content:'Explore engagement score evolution and plan recommended scientific interactions.'}, {property:'og:title',content:'Results & Recommendations — Takeda IBD Intelligence'}, {property:'og:description',content:'Explore engagement score evolution and plan recommended scientific interactions.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}] }),
 component: Recommendations,
});
