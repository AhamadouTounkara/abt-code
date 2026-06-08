/* ABT CODE — SETTINGS GLOBAL */
(function(){
  const THEMES={
    dark:{'--bg':'#0d0f14','--bg2':'#141720','--bg3':'#1c2030','--border':'#2a2f45','--text':'#e2e8f0','--muted':'#64748b','--accent':'#4f8ef7','--accent2':'#a78bfa'},
    ocean:{'--bg':'#0a1628','--bg2':'#0d2040','--bg3':'#112952','--border':'#1e3a6e','--text':'#e0f2fe','--muted':'#7cb9e8','--accent':'#38bdf8','--accent2':'#818cf8'},
    forest:{'--bg':'#0a1a0f','--bg2':'#0d2015','--bg3':'#122b1a','--border':'#1a4027','--text':'#d1fae5','--muted':'#6ee7b7','--accent':'#34d399','--accent2':'#a3e635'},
    sunset:{'--bg':'#1a0a00','--bg2':'#2a1200','--bg3':'#3a1a00','--border':'#5a2d00','--text':'#fef3c7','--muted':'#fbbf24','--accent':'#f59e0b','--accent2':'#f97316'},
    purple:{'--bg':'#120a1e','--bg2':'#1c1030','--bg3':'#251540','--border':'#3d2060','--text':'#ede9fe','--muted':'#a78bfa','--accent':'#8b5cf6','--accent2':'#ec4899'},
    rose:{'--bg':'#1a0a10','--bg2':'#2a1020','--bg3':'#3a1530','--border':'#6b2045','--text':'#fce7f3','--muted':'#f9a8d4','--accent':'#f472b6','--accent2':'#fb7185'},
    light:{'--bg':'#f8fafc','--bg2':'#ffffff','--bg3':'#f1f5f9','--border':'#e2e8f0','--text':'#1e293b','--muted':'#64748b','--accent':'#3b82f6','--accent2':'#8b5cf6'},
    contrast:{'--bg':'#000000','--bg2':'#111111','--bg3':'#1a1a1a','--border':'#333333','--text':'#ffffff','--muted':'#aaaaaa','--accent':'#ffff00','--accent2':'#00ffff'},
  };
  const s=JSON.parse(localStorage.getItem('abt_settings')||'{}');
  const t=THEMES[s.theme||'dark']||THEMES.dark;
  const r=document.documentElement;
  Object.entries(t).forEach(([k,v])=>r.style.setProperty(k,v));
  if(s.fontSize) r.style.setProperty('--font-size',s.fontSize+'px');
  if(s.lineHeight) r.style.setProperty('--line-height',s.lineHeight);
  document.documentElement.lang=s.lang||'fr';
  document.documentElement.dir=s.lang==='ar'?'rtl':'ltr';
})();

window.ABT={
  getSettings:()=>JSON.parse(localStorage.getItem('abt_settings')||'{}'),
  setSetting:(k,v)=>{const s=JSON.parse(localStorage.getItem('abt_settings')||'{}');s[k]=v;localStorage.setItem('abt_settings',JSON.stringify(s));},
  getUser:()=>({email:localStorage.getItem('abt_session_email')||'',prenom:localStorage.getItem('abt_session_prenom')||'',connecte:localStorage.getItem('abt_connecte')==='true'}),
  toast:(msg,dur=2500)=>{
    let t=document.getElementById('_abt_toast');
    if(!t){t=document.createElement('div');t.id='_abt_toast';t.className='abt-toast';document.body.appendChild(t);}
    t.innerText=msg;t.classList.add('show');
    clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),dur);
  },
  checkLogin:()=>{if(localStorage.getItem('abt_connecte')!=='true'){window.location.href='Entre.html';return false;}return true;},
};
