const snapshot = {2015:4204,2016:5577,2017:7567,2018:11049,2019:15157,2020:18897,2021:22069,2022:24933,2023:33121,2024:36615,2025:38029,2026:25668};

const now = new Date();
const isoDate = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
const monthYear = new Intl.DateTimeFormat('en-US',{month:'long',year:'numeric'}).format(now);
document.querySelector('#access-date').textContent = monthYear;
document.querySelector('#year').textContent = now.getFullYear();

const search = '"autonomous vehicle" OR "autonomous robot"';
const params = new URLSearchParams({search,filter:`from_publication_date:2015-01-01,to_publication_date:${isoDate}`,group_by:'publication_year','per-page':'200',mailto:'arjangupta95@gmail.com'});
const apiUrl = `https://api.openalex.org/works?${params}`;
document.querySelector('#live-query-link').href = apiUrl;

function render(raw, live=true){
  const endYear=now.getFullYear();
  const data=[];
  for(let year=2015;year<=endYear;year++) data.push({year,count:Number(raw[year]||0)});
  const fullYears=data.filter(d=>d.year<endYear);
  const first=fullYears[0]?.count||data[0].count;
  const last=fullYears.at(-1)?.count||data.at(-1).count;
  const growth=first ? ((last/first-1)*100) : 0;
  document.querySelector('#growth-value').textContent=`${growth.toLocaleString(undefined,{maximumFractionDigits:0})}%`;
  document.querySelector('#growth-label').textContent=`growth, 2015–${endYear-1}`;
  document.querySelector('#coverage-note').textContent=`Current year is YTD through ${monthYear}${live?' · live':' · cached snapshot'}`;
  drawChart(data);
  document.querySelector('#chart-status').hidden=true;
}

function drawChart(data){
  const svg=document.querySelector('#trend-chart');
  const W=960,H=480,m={t:45,r:34,b:65,l:76};
  const innerW=W-m.l-m.r,innerH=H-m.t-m.b;
  const max=Math.ceil(Math.max(...data.map(d=>d.count))/10000)*10000||10000;
  const x=i=>m.l+i*(innerW/(data.length-1));
  const y=v=>m.t+innerH-(v/max)*innerH;
  const ns='http://www.w3.org/2000/svg';
  const add=(tag,attrs,text)=>{const el=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));if(text!=null)el.textContent=text;svg.appendChild(el);return el};
  [...svg.querySelectorAll(':scope > :not(title):not(desc)')].forEach(n=>n.remove());
  const defs=add('defs',{});const grad=document.createElementNS(ns,'linearGradient');grad.id='areaFill';grad.setAttribute('x1','0');grad.setAttribute('y1','0');grad.setAttribute('x2','0');grad.setAttribute('y2','1');grad.innerHTML='<stop offset="0" stop-color="#68f0ba" stop-opacity=".28"/><stop offset="1" stop-color="#68f0ba" stop-opacity="0"/>';defs.appendChild(grad);
  for(let i=0;i<=4;i++){const value=max*i/4;const yy=y(value);add('line',{x1:m.l,y1:yy,x2:W-m.r,y2:yy,class:'gridline'});add('text',{x:m.l-14,y:yy+4,'text-anchor':'end',class:'tick'},value===0?'0':`${Math.round(value/1000)}k`)}
  data.forEach((d,i)=>add('text',{x:x(i),y:H-30,'text-anchor':'middle',class:'tick'},d.year===now.getFullYear()?`${d.year} YTD`:d.year));
  const points=data.map((d,i)=>`${x(i)},${y(d.count)}`).join(' ');
  add('path',{d:`M ${x(0)} ${m.t+innerH} L ${points.replaceAll(' ', ' L ')} L ${x(data.length-1)} ${m.t+innerH} Z`,class:'area'});
  add('polyline',{points,class:'trend'});
  data.forEach((d,i)=>{add('circle',{cx:x(i),cy:y(d.count),r:i===data.length-1?7:4,class:'dot'});if(i===data.length-1)add('circle',{cx:x(i),cy:y(d.count),r:14,class:'latest-ring'});});
  const latest=data.at(-1);add('text',{x:x(data.length-1)-4,y:y(latest.count)-22,'text-anchor':'end',class:'value-label'},latest.count.toLocaleString());
}

fetch(apiUrl,{headers:{Accept:'application/json'}})
  .then(r=>{if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.json()})
  .then(body=>{const values={};(body.group_by||[]).forEach(row=>values[row.key]=row.count);if(!Object.keys(values).length)throw new Error('No groups returned');render(values,true)})
  .catch(()=>render(snapshot,false));
