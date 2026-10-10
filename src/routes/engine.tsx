import { createFileRoute } from '@tanstack/react-router';
import { Engine } from '@/components/intelligence/views';
export const Route = createFileRoute('/engine')({
 head: () => ({ meta: [{title: 'AI Scientific Engagement Engine — Takeda IBD Intelligence'}, {name:'description',content:'Explore explainable scoring, scientific networks and a simulated AI analysis pipeline.'}, {property:'og:title',content:'AI Scientific Engagement Engine — Takeda IBD Intelligence'}, {property:'og:description',content:'Explore explainable scoring, scientific networks and a simulated AI analysis pipeline.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}] }),
 component: Engine,
});
