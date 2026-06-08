/* ABT CODE — Assistant IA Guide (bouton flottant ✦ sur toutes les pages) */
(function(){
'use strict';
// Ne pas afficher dans l'IDE
if(window.location.pathname.includes('abt_ide'))return;

const STYLE=`
#_abt_ai_btn{position:fixed;bottom:20px;right:20px;z-index:9997;width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#4f8ef7,#a78bfa);border:none;cursor:pointer;color:white;font-weight:800;font-size:0.85rem;box-shadow:0 4px 20px rgba(79,142,247,0.4);display:flex;align-items:center;justify-content:center;transition:all 0.3s;animation:abtPulse 3s infinite;}
@keyframes abtPulse{0%,100%{box-shadow:0 4px 20px rgba(79,142,247,0.4);}50%{box-shadow:0 4px 30px rgba(79,142,247,0.7);}}
#_abt_ai_btn:hover{transform:scale(1.1);}
#_abt_ai_panel{position:fixed;bottom:80px;right:18px;z-index:9996;width:320px;max-width:calc(100vw - 28px);background:var(--bg2,#141720);border:1px solid var(--border,#2a2f45);border-radius:14px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.5);display:none;flex-direction:column;max-height:460px;font-family:'Segoe UI',sans-serif;}
#_abt_ai_panel.open{display:flex;animation:abtOpen 0.2s ease;}
@keyframes abtOpen{from{opacity:0;transform:translateY(10px) scale(0.97);}to{opacity:1;transform:none;}}
._abt_hd{background:linear-gradient(135deg,#1a2040,#1a1040);padding:12px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border,#2a2f45);}
._abt_av{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#4f8ef7,#a78bfa);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.8rem;color:white;flex-shrink:0;}
._abt_nm{font-weight:700;font-size:0.88rem;color:var(--text,#e2e8f0);}
._abt_st{font-size:0.7rem;color:#48bb78;}
._abt_cl{margin-left:auto;background:none;border:none;color:var(--muted,#64748b);cursor:pointer;font-size:1rem;padding:2px 6px;border-radius:4px;}
._abt_cl:hover{background:rgba(255,255,255,0.08);}
._abt_msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;scrollbar-width:thin;}
._abt_msg{max-width:90%;padding:9px 12px;border-radius:10px;font-size:0.83rem;line-height:1.5;word-break:break-word;}
._abt_msg.ai{background:rgba(79,142,247,0.1);border:1px solid rgba(79,142,247,0.2);align-self:flex-start;border-bottom-left-radius:3px;color:var(--text,#e2e8f0);}
._abt_msg.user{background:rgba(79,142,247,0.18);border:1px solid rgba(79,142,247,0.3);align-self:flex-end;border-bottom-right-radius:3px;color:var(--text,#e2e8f0);}
._abt_link{color:#4f8ef7;text-decoration:none;font-weight:600;}
._abt_link:hover{text-decoration:underline;}
._abt_sugg{color:#4f8ef7;cursor:pointer;text-decoration:underline dotted;font-size:0.8rem;}
._abt_sugg:hover{color:#7ab3ff;}
._abt_qs{padding:6px 10px;display:flex;gap:5px;flex-wrap:wrap;border-top:1px solid var(--border,#2a2f45);}
._abt_q{background:var(--bg3,#1c2030);border:1px solid var(--border,#2a2f45);color:var(--muted,#64748b);padding:4px 10px;border-radius:12px;font-size:0.72rem;cursor:pointer;transition:all 0.2s;white-space:nowrap;}
._abt_q:hover{border-color:#4f8ef7;color:#4f8ef7;}
._abt_inp{padding:8px 10px;border-top:1px solid var(--border,#2a2f45);display:flex;gap:7px;align-items:center;}
#_abt_input{flex:1;background:var(--bg3,#1c2030);border:1px solid var(--border,#2a2f45);color:var(--text,#e2e8f0);padding:7px 11px;border-radius:18px;font-size:0.83rem;outline:none;}
#_abt_input:focus{border-color:#4f8ef7;}
._abt_send{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#4f8ef7,#a78bfa);border:none;cursor:pointer;color:white;font-size:0.9rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:opacity 0.2s;}
._abt_send:hover{opacity:0.85;}
._abt_dots{display:flex;gap:4px;padding:2px 0;}
._abt_dot{width:6px;height:6px;border-radius:50%;background:var(--muted,#64748b);animation:abtDot 1.2s infinite;}
._abt_dot:nth-child(2){animation-delay:0.2s;}._abt_dot:nth-child(3){animation-delay:0.4s;}
@keyframes abtDot{0%,80%,100%{transform:scale(0.8);opacity:0.4;}40%{transform:scale(1);opacity:1;}}
@media(max-width:600px){#_abt_ai_panel{width:calc(100vw - 24px);right:12px;bottom:76px;}#_abt_ai_btn{bottom:14px;right:14px;width:44px;height:44px;font-size:0.78rem;}}`;

// ── Base de connaissances ──
const KB={
  pages:{
    accueil:{url:'accueil.html',label:'Page d\'inscription'},
    connexion:{url:'Entre.html',label:'Page de connexion'},
    dashboard:{url:'dashboard.html',label:'Tableau de bord'},
    apprendre:{url:'apprendre.html',label:'Cours Python et R'},
    ide:{url:'abt_ide.html',label:'IDE ABT-Code'},
    ia:{url:'abt_ia_page.html',label:'ABT IA (assistant éducatif)'},
    parametres:{url:'parametres.html',label:'Paramètres'},
    admin:{url:'admin.html',label:'Panneau administrateur'},
    exo_py:{url:'exercices_python.html',label:'Exercices Python'},
    exo_r:{url:'exercices_r.html',label:'Exercices R'},
  },
  python:[
    {n:1,titre:'Introduction à Python',url:'notion1_cour.html'},
    {n:2,titre:'Variables & Mémoire',url:'notion2_exemple.html'},
    {n:3,titre:'Conditions',url:'notion3_exercice.html'},
    {n:4,titre:'Boucles',url:'notion4_operateurs.html'},
    {n:5,titre:'Fonctions',url:'notion5_fonctions.html'},
  ],
  r:[
    {n:1,titre:'Introduction à R',url:'r1_introduction.html'},
    {n:2,titre:'Vecteurs & Objets',url:'r2_vecteurs.html'},
    {n:3,titre:'Opérateurs',url:'r3_operateurs.html'},
    {n:4,titre:'Boucles',url:'r4_boucles.html'},
    {n:5,titre:'Fonctions',url:'r5_fonctions.html'},
  ],
};

function getResp(msg){
  const m=msg.toLowerCase().trim();
  const prenom=localStorage.getItem('abt_session_prenom')||'Étudiant';

  // Salutations
  if(/^(bonjour|bonsoir|salut|hello|hi|coucou)/.test(m))
    return `Bonjour ${prenom} ! 👋 Je suis <b>ABT-AI</b>, votre guide sur la plateforme.<br><br>Demandez-moi :<br>• Comment débuter un cours<br>• Comment ouvrir l'IDE<br>• Où trouver les exercices<br>• Comment changer le thème`;

  // Merci
  if(/merci|super|parfait|génial/.test(m)) return `De rien ! 😊 N'hésitez pas si vous avez d'autres questions.`;

  // Cours Python
  if(/cours python|python ch|chapitre python/.test(m)){
    const num=m.match(/(\d+)/)?.[1];
    if(num){const ch=KB.python[parseInt(num)-1];if(ch)return `Chapitre ${ch.n} Python : <b>${ch.titre}</b><br><a href="${ch.url}" class="_abt_link">→ Ouvrir le chapitre ${ch.n}</a>`;}
    return `Cours Python — 5 chapitres :<br>${KB.python.map(c=>`<a href="${c.url}" class="_abt_link">Ch.${c.n} — ${c.titre}</a>`).join('<br>')}`;
  }
  // Cours R
  if(/cours r|r ch|chapitre r/.test(m)&&!m.includes('arrêt')){
    const num=m.match(/(\d+)/)?.[1];
    if(num){const ch=KB.r[parseInt(num)-1];if(ch)return `Chapitre ${ch.n} R : <b>${ch.titre}</b><br><a href="${ch.url}" class="_abt_link">→ Ouvrir le chapitre ${ch.n}</a>`;}
    return `Cours R — 5 chapitres :<br>${KB.r.map(c=>`<a href="${c.url}" class="_abt_link">Ch.${c.n} — ${c.titre}</a>`).join('<br>')}`;
  }
  // IDE
  if(/ide|vscode|vs code|éditeur|coder|environnement/.test(m))
    return `L'<b>ABT-Code IDE</b> est disponible ici :<br><a href="abt_ide.html" class="_abt_link">💻 Ouvrir ABT-Code IDE →</a><br><br>Il supporte : Python, R, SQL, HTML, CSS, JavaScript, TypeScript, Java, PHP, Bash, C++`;

  // IA
  if(/abt ia|assistant ia|ia coding/.test(m))
    return `<b>ABT IA</b> est votre assistant éducatif IA :<br><a href="abt_ia_page.html" class="_abt_link">✦ Ouvrir ABT IA →</a><br><br>Il répond aux questions de programmation, génère du code et donne des idées de projets.`;

  // Exercices
  if(/exercice|pratiquer|s'entraîner/.test(m)){
    const pyDone=Object.values(JSON.parse(localStorage.getItem('abt_exo_py')||'{}')).filter(Boolean).length;
    const rDone =Object.values(JSON.parse(localStorage.getItem('abt_exo_r') ||'{}')).filter(Boolean).length;
    return `Vos exercices :<br>🐍 <b>Python</b> (${pyDone}/10) → <a href="exercices_python.html" class="_abt_link">Ouvrir</a><br>📊 <b>R</b> (${rDone}/16) → <a href="exercices_r.html" class="_abt_link">Ouvrir</a>`;
  }

  // Paramètres
  if(/paramètre|thème|langue|police|couleur/.test(m))
    return `Pour modifier les paramètres (thème, langue, taille):<br>→ Allez dans le <b>Tableau de bord → ⚙️ Paramètres</b><br>ou <a href="dashboard.html" class="_abt_link">Cliquez ici</a>`;

  // Connexion
  if(/connecter|connexion|mot de passe|login/.test(m))
    return `Pour vous connecter :<br><a href="Entre.html" class="_abt_link">→ Page de connexion</a><br><br>Si vous avez oublié votre mot de passe, cliquez sur <b>"Mot de passe oublié ?"</b> sur la page de connexion.`;

  // Inscription
  if(/inscrire|créer un compte|inscription/.test(m))
    return `Pour créer un compte :<br><a href="Entre.html" class="_abt_link">→ Page d'inscription</a><br><br>Remplissez le formulaire avec vos informations et cliquez sur <b>"Créer mon compte"</b>.`;

  // Raccourcis IDE
  if(/raccourci|shortcut|ctrl/.test(m))
    return `Raccourcis ABT-Code IDE :<br>• <code>Ctrl+Enter</code> — Exécuter<br>• <code>Ctrl+S</code> — Sauvegarder<br>• <code>Ctrl+B</code> — Sidebar<br>• <code>Ctrl+/</code> — Commenter<br>• <code>Ctrl+I</code> — ABT IA Coding<br>• <code>Ctrl+`</code> — Terminal`;

  // SQL
  if(/sql|base de donn/.test(m))
    return `La base de données SQL est dans l'IDE :<br><a href="abt_ide.html" class="_abt_link">🗄️ Ouvrir le simulateur SQL →</a><br><br>Contient 5 tables : etudiants, cours, notes, inscriptions, universites.`;

  // Communauté
  if(/communauté|groupe|forum/.test(m))
    return `La section <b>Communauté</b> se trouve dans le tableau de bord :<br>• Créer/rejoindre des groupes<br>• Écrire dans le forum<br><a href="dashboard.html" class="_abt_link">→ Tableau de bord</a>`;

  // Aide générale
  if(/aide|help|que peux-tu|comment/.test(m))
    return `Je peux vous guider sur :<br>📚 Les cours (Python, R)<br>💻 L'IDE ABT-Code<br>🎯 Les exercices<br>✦ ABT IA<br>⚙️ Les paramètres<br><br>Posez-moi une question précise !`;

  // Défaut
  return `Je n'ai pas compris. Essayez :<br><span class="_abt_sugg" onclick="window._abtAIAsk(this)">Cours Python</span><br><span class="_abt_sugg" onclick="window._abtAIAsk(this)">Ouvrir l'IDE</span><br><span class="_abt_sugg" onclick="window._abtAIAsk(this)">Exercices</span><br><span class="_abt_sugg" onclick="window._abtAIAsk(this)">Raccourcis IDE</span>`;
}

function create(){
  if(document.getElementById('_abt_ai_btn'))return;

  // Style
  const s=document.createElement('style');s.textContent=STYLE;document.head.appendChild(s);

  // Bouton
  const btn=document.createElement('button');
  btn.id='_abt_ai_btn';btn.innerHTML='✦<br><span style="font-size:0.6rem;margin-top:-2px;display:block;">AI</span>';btn.title='ABT-AI';
  btn.onclick=()=>{const p=document.getElementById('_abt_ai_panel');p.classList.toggle('open');};
  document.body.appendChild(btn);

  // Panneau
  const prenom=localStorage.getItem('abt_session_prenom')||'Étudiant';
  const panel=document.createElement('div');
  panel.id='_abt_ai_panel';
  panel.innerHTML=`
  <div class="_abt_hd">
    <div class="_abt_av">AI</div>
    <div><div class="_abt_nm">ABT-AI</div><div class="_abt_st">● En ligne</div></div>
    <button class="_abt_cl" onclick="document.getElementById('_abt_ai_panel').classList.remove('open')">✕</button>
  </div>
  <div class="_abt_msgs" id="_abt_msgs">
    <div class="_abt_msg ai">Bonjour ${prenom} ! 👋 Je suis <b>ABT-AI</b>, votre guide.<br>Comment puis-je vous aider ?</div>
  </div>
  <div class="_abt_qs">
    <span class="_abt_q" onclick="window._abtAIAsk(this)">Cours Python</span>
    <span class="_abt_q" onclick="window._abtAIAsk(this)">IDE</span>
    <span class="_abt_q" onclick="window._abtAIAsk(this)">Exercices</span>
    <span class="_abt_q" onclick="window._abtAIAsk(this)">Paramètres</span>
    <span class="_abt_q" onclick="window._abtAIAsk(this)">Aide</span>
  </div>
  <div class="_abt_inp">
    <input type="text" id="_abt_input" placeholder="Votre question..."
      onkeydown="if(event.key==='Enter')window._abtAISend()">
    <button class="_abt_send" onclick="window._abtAISend()">➤</button>
  </div>`;
  document.body.appendChild(panel);
}

function addMsg(role,html){
  const msgs=document.getElementById('_abt_msgs');if(!msgs)return;
  const d=document.createElement('div');d.className='_abt_msg '+role;d.innerHTML=html;
  msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;
}

function typing(){
  const msgs=document.getElementById('_abt_msgs');if(!msgs)return;
  const d=document.createElement('div');d.className='_abt_msg ai';d.id='_abt_typing';
  d.innerHTML='<div class="_abt_dots"><div class="_abt_dot"></div><div class="_abt_dot"></div><div class="_abt_dot"></div></div>';
  msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;
}

window._abtAISend=function(){
  const inp=document.getElementById('_abt_input');if(!inp)return;
  const q=inp.value.trim();if(!q)return;inp.value='';
  addMsg('user',q);typing();
  setTimeout(()=>{document.getElementById('_abt_typing')?.remove();addMsg('ai',getResp(q));},400+Math.random()*600);
};

window._abtAIAsk=function(el){
  const inp=document.getElementById('_abt_input');if(inp){inp.value=el.innerText||el.textContent;window._abtAISend();}
};

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',create);}else{create();}
})();
