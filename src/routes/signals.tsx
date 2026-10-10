import { createFileRoute } from '@tanstack/react-router';
import { Signals } from '@/components/intelligence/views';
export const Route = createFileRoute('/signals')({
 head: () => ({ meta: [{title: 'Engagement Signals — Takeda IBD Intelligence'}, {name:'description',content:'Real-time synthetic scientific activity and engagement signal contributions.'}, {property:'og:title',content:'Engagement Signals — Takeda IBD Intelligence'}, {property:'og:description',content:'Real-time synthetic scientific activity and engagement signal contributions.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}] }),
 component: Signals,
});
