import { createFileRoute } from '@tanstack/react-router';
import { Profile } from '@/components/intelligence/views';
import { hcps } from '@/lib/demo-data';
export const Route = createFileRoute('/hcp/$id')({
 head: ({params}) => { const name=hcps.find(h=>h.id===params.id)?.name??'Physician';return {meta:[{title:`${name} — Takeda IBD Scientific Profile`},{name:'description',content:`Explore ${name}'s synthetic scientific profile, publications, clinical trials and engagement insights.`},{property:'og:title',content:`${name} — Takeda IBD Scientific Profile`},{property:'og:description',content:'A 360-degree view of scientific leadership and engagement.'},{property:'og:type',content:'profile'},{name:'twitter:card',content:'summary_large_image'}]};},
 component: ProfilePage,
});
function ProfilePage(){const {id}=Route.useParams();return <Profile key={id} id={id}/>}
