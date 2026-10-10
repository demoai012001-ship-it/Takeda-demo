import { createFileRoute } from '@tanstack/react-router';
import { Emerging } from '@/components/intelligence/views';
export const Route = createFileRoute('/emerging')({
 head: () => ({ meta: [{title: 'Emerging Influencers — Takeda IBD Intelligence'}, {name:'description',content:'Identify emerging thought leaders and accelerating scientific engagement.'}, {property:'og:title',content:'Emerging Influencers — Takeda IBD Intelligence'}, {property:'og:description',content:'Identify emerging thought leaders and accelerating scientific engagement.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}] }),
 component: Emerging,
});
