import { createFileRoute } from '@tanstack/react-router';
import { Explorer } from '@/components/intelligence/explorer';
export const Route = createFileRoute('/explorer')({
 validateSearch: (search: Record<string, unknown>): {q?:string;region?:string;priority?:string;specialty?:string} => ({q:typeof search.q==='string'?search.q:undefined, region:typeof search.region==='string'?search.region:undefined, priority:typeof search.priority==='string'?search.priority:undefined, specialty:typeof search.specialty==='string'?search.specialty:undefined}),
 head: () => ({meta:[{title:'HCP Explorer — Takeda IBD Intelligence'},{name:'description',content:'Discover and filter synthetic IBD physicians by region, specialty, scientific activity and engagement priority.'},{property:'og:title',content:'HCP Explorer — Takeda IBD Intelligence'},{property:'og:description',content:'Discover scientific voices and engagement opportunities in IBD.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: ExplorerPage,
});
function ExplorerPage(){const search=Route.useSearch();return <Explorer key={JSON.stringify(search)} initial={search}/>}
