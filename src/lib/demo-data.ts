export const alignmentWeights = { clinicalOutcomes: 5, practiceCharacteristics: 10, scientificExchange: 10, patientBurden: 20, treatmentExperience: 20, scientificLeadership: 15, otherStrategicFactors: 20 };
export function alignmentScore(values: Record<keyof typeof alignmentWeights, number>) { return Object.entries(alignmentWeights).reduce((sum, [key, weight]) => sum + values[key as keyof typeof alignmentWeights] * weight / 100, 0); }
export function evolvedScore(base: number, signals: { msl: number; publications: number; advisory: number; mentions: number }) { return Math.min(10, base + signals.msl * .5 + signals.publications + signals.advisory + signals.mentions * .125); }
const people = [
 ['Jane Smith','Mount Sinai Hospital','North America','IBD Specialist',96,9.8,24,18],
 ['Michael Chen','Mayo Clinic','North America','Gastroenterology',94,9.6,31,12],
 ['Sarah Williams','King’s College Hospital','Europe','IBD Specialist',91,9.4,22,24],
 ['David Müller','Charité Berlin','Europe','Gastroenterology',89,9.2,19,9],
 ['Priya Sharma','AIIMS New Delhi','Asia Pacific','IBD Specialist',87,9.0,17,32],
 ['James Anderson','Cleveland Clinic','North America','Gastroenterology',88,8.8,26,7],
 ['Elena Rossi','San Raffaele Hospital','Europe','Clinical Research',85,8.7,23,21],
 ['Yuki Tanaka','University of Tokyo','Asia Pacific','IBD Specialist',84,8.5,16,28],
 ['Robert Garcia','Hospital Clínic Barcelona','Europe','Gastroenterology',82,8.3,14,-3],
 ['Amina Hassan','King Faisal Hospital','Middle East','Clinical Research',80,8.1,18,35],
 ['Lucas Silva','São Paulo University','Latin America','IBD Specialist',79,7.9,12,19],
 ['Emily Johnson','Johns Hopkins','North America','Gastroenterology',78,7.7,21,8],
 ['Oliver Brown','Oxford University Hospital','Europe','Clinical Research',76,7.5,11,-5],
 ['Sofia Martinez','Hospital Italiano','Latin America','IBD Specialist',73,7.2,9,27],
 ['Wei Zhang','Peking Union Medical College','Asia Pacific','Gastroenterology',71,6.9,13,16],
 ['Noah Wilson','University of Toronto','North America','Clinical Research',68,6.6,8,11],
 ['Fatima Al-Sayed','Dubai Health','Middle East','IBD Specialist',65,6.3,7,14],
 ['Anna Kowalski','Warsaw Medical University','Europe','Gastroenterology',62,5.9,6,6],
 ['Daniel Lee','Seoul National University','Asia Pacific','Clinical Research',58,5.5,5,-2],
 ['Isabella Costa','Porto University Hospital','Europe','IBD Specialist',54,4.8,4,4],
] as const;
export const hcps = people.map((p,i)=>({id:String(i+1),name:`Dr. ${p[0]}`,institution:p[1],region:p[2],specialty:p[3],alignment:p[4],score:p[5],publications:p[6],growth:p[7],rank:i+1,priority:p[5]>=8?'High':p[5]>=6?'Medium':'Low',trials:Math.max(1,8-Math.floor(i/3)), initials:p[0].split(' ').map(n=>n[0]).join('')}));
export type HCP = typeof hcps[number];
export const months = ['May','Jun','Jul','Aug','Sep','Oct'];
export const activityData = months.map((month,i)=>({month,interactions:[184,225,207,278,310,364][i],publications:[65,78,72,98,118,145][i]}));
export const regions = [{name:'North America',count:486,percent:39,change:12},{name:'Europe',count:398,percent:32,change:9},{name:'Asia Pacific',count:224,percent:18,change:18},{name:'Latin America',count:87,percent:7,change:7},{name:'Middle East',count:53,percent:4,change:14}];
export const signals = [
 {type:'Publication',name:'Dr. Jane Smith',title:'New research on biologic treatment sequencing',detail:'Journal of Crohn’s and Colitis · Peer-reviewed publication',impact:0.8,time:'12 minutes ago',level:'High'},
 {type:'MSL Interaction',name:'Dr. Michael Chen',title:'Scientific exchange on emerging IBD therapies',detail:'Medical science liaison · North America',impact:0.5,time:'38 minutes ago',level:'High'},
 {type:'Congress',name:'Dr. Sarah Williams',title:'Invited plenary speaker at UEG Week',detail:'Vienna, Austria · Scientific leadership',impact:0.7,time:'1 hour ago',level:'High'},
 {type:'Clinical Trial',name:'Dr. Priya Sharma',title:'Appointed principal investigator for IBD study',detail:'Phase III · Multicenter clinical trial',impact:0.9,time:'2 hours ago',level:'High'},
 {type:'Advisory Board',name:'Dr. Elena Rossi',title:'Participated in scientific advisory board',detail:'Treatment optimization · European region',impact:0.6,time:'3 hours ago',level:'Medium'},
 {type:'Peer Recognition',name:'Dr. Amina Hassan',title:'Recognized for patient advocacy leadership',detail:'Regional IBD network · Scientific community',impact:0.3,time:'4 hours ago',level:'Medium'},
];
export const navigation = [{path:'/',label:'Executive dashboard',icon:'dashboard'},{path:'/explorer',label:'HCP explorer',icon:'users'},{path:'/signals',label:'Engagement signals',icon:'activity'},{path:'/engine',label:'AI engagement engine',icon:'brain'},{path:'/recommendations',label:'Results & recommendations',icon:'sparkles'},{path:'/leaderboard',label:'Influencer leaderboard',icon:'trophy'},{path:'/emerging',label:'Emerging influencers',icon:'trending'},{path:'/command-center',label:'Command center',icon:'command'}] as const;
