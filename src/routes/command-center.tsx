import { createFileRoute } from '@tanstack/react-router';
import { CommandCenter } from '@/components/intelligence/views';
export const Route = createFileRoute('/command-center')({
 head: () => ({ meta: [{title: 'Medical Affairs Command Center — Takeda IBD Intelligence'}, {name:'description',content:'Strategic engagement opportunities, regional coverage and scientific events.'}, {property:'og:title',content:'Medical Affairs Command Center — Takeda IBD Intelligence'}, {property:'og:description',content:'Strategic engagement opportunities, regional coverage and scientific events.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}] }),
 component: CommandCenter,
});
