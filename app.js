(() => {
  "use strict";
  const main = document.getElementById("main");
  const dialog = document.getElementById("progress-dialog");
  const units = window.units;
  const practiceIds = units.flatMap((unit,i) => unit.lessons.map((_,j) => (i+1)+"/"+(j+1)));
  const foundationIds = window.foundations.map((_, i) => "start/"+(i+1));
  const ids = [...foundationIds, ...practiceIds];
  const lessonLink = id => "#" + (id.startsWith("start/") ? id : "lesson/"+id);
  const storeKey = "swift-lab-complete-v1";
  let completed = new Set(), storageWorks = true;
  try {
    const saved = JSON.parse(localStorage.getItem(storeKey) || "[]");
    if (Array.isArray(saved)) completed = new Set(saved.filter(id=>ids.includes(id)));
    for (const id of ids) if (localStorage.getItem(storeKey+":"+id)==="1") completed.add(id);
  } catch {storageWorks = false;}
  const pad = n=>String(n).padStart(2,"0");
  const escape = s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function icon(name){
    const paths={book:'<path d="M3 5q5-2 9 1 5-3 9-1v14q-5-2-9 1-4-3-9-1zM12 6v14"/>',play:'<path fill="currentColor" stroke="none" d="m7 4 13 8-13 8z"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'};
    return '<svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true">'+paths[name]+'</svg>';
  }
  const accent = ["#f8c9ad","#cadcc4","#c6dced","#ddd2ef","#f2dea4","#bccfc7"];
  const faces = ["#ef9e70","#9ab48d","#85b1d1","#b19dca","#cbb26c","#8ea997"];
  // Illustrations use shared ink and paper colors, with a different object for each unit.
  function cover(i){
    const f=faces[i], ink="#353a32", cream="#fff6de";
    const terminal='<g transform="rotate(-6 150 53)"><rect x="109" y="16" width="86" height="58" rx="5" fill="'+f+'"/><rect x="104" y="10" width="86" height="58" rx="5" fill="'+cream+'"/><path d="M104 23h86"/><g fill="'+ink+'" stroke="none"><circle cx="112" cy="17" r="1.8"/><circle cx="119" cy="17" r="1.8"/><circle cx="126" cy="17" r="1.8"/></g><path d="m119 35 11 9-11 8m17 0h13" stroke-width="3.5"/></g>';
    const cap=(x,y,letter)=>'<g transform="translate('+x+' '+y+')"><path d="m0 8 32-4 8 8 1 23-33 5-8-8z" fill="'+f+'"/><path d="m0 8 32-4 1 24-33 4z" fill="'+cream+'"/><path d="m33 28 8 7M32 4l1 24"/><text x="8" y="24" fill="'+ink+'" stroke="none" font-size="18" font-family="monospace" font-weight="bold">'+letter+'</text></g>';
    const graph='<g fill="'+cream+'"><path d="M150 22v13m-1 13v9m-40 9V52h81v14" fill="none"/><rect x="133" y="6" width="34" height="17" rx="4" fill="'+f+'"/><path d="m151 27 16 12-16 12-16-12z"/><rect x="95" y="62" width="30" height="16" rx="4"/><rect x="175" y="62" width="30" height="16" rx="4"/><path d="m104 69 4 4 6-7m72 1 6 6m-6 0 6-6"/></g>';
    const func='<g transform="rotate(-7 150 42)"><rect x="106" y="19" width="93" height="52" rx="6" fill="'+f+'"/><rect x="101" y="13" width="93" height="52" rx="6" fill="'+cream+'"/><text x="113" y="48" font-family="monospace" font-weight="bold" font-size="26" fill="'+ink+'" stroke="none">ƒ(x)</text></g>';
    const stack='<g transform="translate(103 5)" fill="'+cream+'"><path d="m0 46 54-17 41 13-53 18z" fill="'+f+'"/><path d="m0 46 42 14 53-18v8L42 69 0 54z"/><path d="m0 32 54-17 41 14-53 17z" fill="'+f+'"/><path d="m0 32 42 14 53-17v8L42 55 0 40z"/><path d="m0 18 54-17 41 14-53 17z"/><path d="m0 18 42 14 53-17v8L42 41 0 26z" fill="'+f+'"/></g>';
    const app='<g transform="rotate(4 150 42)"><rect x="101" y="15" width="105" height="62" rx="5" fill="'+f+'"/><rect x="96" y="10" width="105" height="62" rx="5" fill="'+cream+'"/><path d="M96 23h105M109 33v28m8-25h15m-15 8h11"/><rect x="144" y="32" width="41" height="25" rx="3" fill="'+f+'"/><path d="m159 41 4 4 8-8"/></g>';
    return '<svg aria-hidden="true" viewBox="0 0 300 88" fill="none" stroke="'+ink+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g stroke-width="1" opacity=".47"><path d="M68 30h8m-4-4v8m145 19h9m-4.5-4.5v9"/><path d="M94 75h11m104-54h6" stroke-dasharray="2 3"/></g>'+[terminal,cap(104,33,"A")+cap(139,10,"1")+cap(171,36,"#"),graph,func,stack,app][i]+'</svg>';
  }
  function firstIncomplete(){return ids.find(id=>!completed.has(id))||ids[0];}
  function card(u,i){
    const done = u.lessons.filter((_,j)=>completed.has((i+1)+"/"+(j+1))).length;
    const j = u.lessons.findIndex((_,j)=>!completed.has((i+1)+"/"+(j+1)));
    return '<a class="card" href="#lesson/'+(i+1)+'/'+(j<0?1:j+1)+'" aria-label="学习'+u.title+'"><div class="cover" style="--tint:'+accent[i]+'"><div class="card-top"><span class="unit-no">UNIT '+pad(i+1)+'</span><span class="level">'+u.level+'</span></div>'+cover(i)+'</div><div class="card-text"><h3>'+u.title+'</h3><p>'+u.summary+'</p><div class="card-meta">'+icon("book")+'<span>'+u.lessons.length+' 节课程</span><span class="end">'+(done?done+' / '+u.lessons.length+' 已完成':u.english)+'</span></div></div></a>';
  }
  function catalog(home){
    const tag=home?"h2":"h1";
    const topics=window.foundations.map((l,i)=>
      '<a href="#start/'+(i+1)+'"><span>'+pad(i+1)+'</span>'+escape(l.title)+'</a>'
    ).join("");
    return '<section class="catalog" aria-label="课程目录"><div class="section-code">LEARNING PATH</div><div class="catalog-head"><'+tag+' class="view-title">'+(home?"学习路线":"课程目录")+'<small>15 节课</small></'+tag+'></div>'+
      '<div class="start-strip"><div><h3>零基础导读</h3><p>这三课只需阅读和观察。</p></div><div class="start-links">'+topics+'</div></div>'+
      '<div class="track-heading"><h3>Swift 动手课程</h3><div class="tabs" aria-label="课程难度筛选">'+["全部","入门","进阶","实战"].map((name,i)=>'<button class="filter" aria-pressed="'+(!i)+'">'+name+'</button>').join("")+'</div></div><div class="cards">'+units.map(card).join("")+'</div></section>';
  }
  function home(){
    const action=completed.size===ids.length?"复习课程":completed.size?"继续学习":"从零开始学";
    return '<section class="hero"><div class="hero-content"><div class="kicker"><i></i>SWIFT LEARNING LAB</div><h1>在 <span>Mac</span> 上，<br>学会 <span>Swift.</span></h1><p>先从一部电影的时长认识什么是程序，<br>再读懂 Swift，亲手做一个 Mac 应用。</p><div class="hero-actions"><a href="'+lessonLink(firstIncomplete())+'" class="primary">'+icon("play")+action+'</a><a class="hero-link" href="#courses">'+icon("grid")+'浏览课程</a></div></div><div class="hero-art"><img src="hero.svg" alt="带有绿色命令提示符的复古 Macintosh 电脑插画"></div><span aria-hidden="true" class="corner c1">+</span><span aria-hidden="true" class="corner c2">+</span><span aria-hidden="true" class="corner c3">+</span><span aria-hidden="true" class="corner c4">+</span></section>'+catalog(true);
  }
  let preferredMode = "cli";
  try {
    if (localStorage.getItem("swift-lab-mode")==="playground") preferredMode="playground";
  } catch {}
  function openWorkshop(i,j) {
    const unit=units[i], lesson=unit.lessons[j], concept=window.concepts[i][j];
    const id=(i+1)+"/"+(j+1), next=ids[ids.indexOf(id)+1];
    const usesApp=i===5;
    let mode=usesApp?"app":preferredMode;
    let position=0;
    const nav=unit.lessons.map((l,k)=>'<a '+(k===j?'class="here" aria-current="page" ':'')+
      'href="#lesson/'+(i+1)+'/'+(k+1)+'">'+pad(k+1)+'　'+escape(l.title)+'</a>').join("");
    main.innerHTML='<div class="crumb"><a href="#courses">课程目录</a><span>/</span>'+escape(unit.title)+'</div>'+
      '<div class="lesson-layout"><aside class="lesson-nav"><h2>'+escape(unit.title)+'</h2>'+nav+'<a href="#start/1">回顾零基础导读</a></aside>'+
      '<article class="lesson-body workshop"><h1>'+escape(lesson.title)+'</h1><p class="workshop-goal">'+escape(lesson.mini.goal)+'</p>'+
      '<div id="environment"></div><div id="work-step"></div></article></div>';
    const environment=main.querySelector("#environment"), stage=main.querySelector("#work-step");
    const list=items=>'<ul class="step-list">'+items.map(v=>'<li>'+escape(v)+'</li>').join("")+'</ul>';
    const details=(label,body)=>'<details class="read-more"><summary>'+escape(label)+'</summary><div>'+body+'</div></details>';
    const output=()=>'<pre class="expected">'+escape(lesson.output)+'</pre>';
    function sourceFile() {
      if(mode==="playground")return "Playground.swift";
      return usesApp?"ContentView.swift":"main.swift";
    }
    function sourceCode() {
      if(mode!=="playground")return lesson.code;
      return 'import Playgrounds\n\n#Playground {\n'+
        lesson.code.split("\n").map(line=>line?"    "+line:"").join("\n")+'\n}';
    }
    function renderEnvironment() {
      const template=mode==="cli"?"macOS › Command Line Tool（命令行工具）":mode==="app"?"macOS › App（应用）":"Xcode 26+ › Playground";
      const choice=usesApp?"":'<div class="mode-picker" role="group" aria-label="选择练习方式">'+
        ['cli','playground'].map((kind,k)=>'<button type="button" data-mode="'+kind+'" aria-pressed="'+(kind===mode)+'">'+
        ['命令行项目','我打开了 Playground.swift'][k]+'</button>').join("")+'</div>';
      environment.innerHTML=choice+'<dl class="project-facts"><div><dt>'+(mode==="playground"?"练习方式":"项目类型")+'</dt><dd>'+template+'</dd></div>'+
        '<div><dt>代码写在</dt><dd>'+sourceFile()+'</dd></div></dl>';
      environment.querySelectorAll("[data-mode]").forEach(button=>button.onclick=()=>{
        if(mode===button.dataset.mode)return;
        mode=button.dataset.mode;preferredMode=mode;
        try{localStorage.setItem("swift-lab-mode",mode);}catch{}
        position=0;renderEnvironment();renderStep(true);
      });
    }
    function makeSteps() {
      const code=sourceCode(), file=sourceFile();
      const steps=(j===0&&(i===0||usesApp))?window.projectSetupSteps(mode):[];
      if(steps.length && mode!=="playground"){
        steps[0]={...steps[0],html:steps[0].html+details("还没安装 Xcode？","在 Mac 的 App Store 搜索 Xcode 并安装。第一次打开时，按提示装好组件。")};
      }
      const needsProject=!steps.length && mode!=="playground";
      if(needsProject) {
        steps.push({title:"打开上次的练习项目",html:'<p>打开 <strong>'+(usesApp?'StudyCounter':'SwiftPractice')+'</strong>，点左侧的 <strong>'+file+'</strong>。</p>'+
          '<a class="setup-help" href="#lesson/'+(usesApp?'6':'1')+'/1">第一次来？看怎么建项目</a>'});
      }
      const codeMarkup='<div class="code-box"><div class="code-head"><span>'+file+'</span><button class="copy" type="button">复制代码</button></div>'+
        '<pre><code>'+escape(code)+'</code></pre></div>';
      steps.push({type:"code",title:"把这段代码放进 "+file,html:'<p>'+escape(lesson.mini.idea)+'</p>'+
        '<p class="paste-hint">在这个练习文件中，用下面的整段代码替换原有内容。</p>'+codeMarkup+
        details("逐行看解释",list(concept.walkthrough))});
      const runInstruction=mode==="playground"?"打开 Editor › Canvas。画布若已暂停，点 Resume。":
        "在 Xcode 顶部选 My Mac，按 ⌘R 运行。";
      const where=mode==="playground"?"右侧画布":usesApp?"新打开的应用窗口":"底部控制台";
      const help=mode==="cli"?details("找不到控制台？","选择 View › Debug Area › Activate Console，或按 ⇧⌘C。"):"";
      steps.push({title:"运行，看看结果",html:'<p>'+runInstruction+'</p><div class="result-caption">'+where+'</div>'+output()+help});
      steps.push({title:"自己改一次",html:'<p>'+escape(lesson.mini.tryIt)+'</p>'+
        details("想多了解一点",'<p>'+escape(concept.definition)+'</p><p>'+escape(concept.analogy)+'</p>')});
      steps.push({type:"quiz",title:"考考你",html:'<p>'+escape(lesson.question)+'</p><div class="choices">'+
        lesson.choices.map((option,k)=>'<button type="button" data-choice="'+k+'">'+String.fromCharCode(65+k)+'.　'+escape(option)+'</button>').join("")+
        '</div><p role="status" class="feedback"></p><a id="next-lesson" class="primary '+(completed.has(id)?"":"hidden")+'" href="'+
        (next?lessonLink(next):"#courses")+'">'+(next?"学习下一课":"返回课程目录")+'</a>'});
      return steps;
    }
    async function copyCode(button) {
      try{await navigator.clipboard.writeText(sourceCode());button.textContent="已复制";}
      catch{const range=document.createRange();range.selectNodeContents(stage.querySelector("pre code"));const sel=getSelection();sel.removeAllRanges();sel.addRange(range);button.textContent="已选中，请复制";}
    }
    function renderStep(moveFocus=false) {
      const steps=makeSteps(), step=steps[position], codeIndex=steps.findIndex(s=>s.type==="code");
      stage.innerHTML='<div class="step-meter"><span>第 '+(position+1)+' / '+steps.length+' 步</span><progress aria-label="本课步骤" value="'+(position+1)+'" max="'+steps.length+'"></progress></div>'+
        '<div class="work-card"><h2 tabindex="-1">'+escape(step.title)+'</h2>'+step.html+'</div>'+
        '<div class="step-actions">'+(position>0?'<button type="button" class="lite" data-back>上一步</button>':'')+
        (position+1<steps.length?'<button type="button" class="primary" data-forward>'+(position===steps.length-2?"去答题":"下一步")+'</button>':'')+
        (position<codeIndex?'<button type="button" class="skip-setup" data-skip>已打开 '+sourceFile()+'</button>':'')+'</div>';
      const on=(selector,handler)=>{const el=stage.querySelector(selector);if(el)el.onclick=handler;};
      on('[data-back]',()=>{position--;renderStep(true);});
      on('[data-forward]',()=>{position++;renderStep(true);});
      on('[data-skip]',()=>{position=codeIndex;renderStep(true);});
      on('.copy',event=>copyCode(event.currentTarget));
      if(step.type==="quiz")bindQuestion(lesson,id);
      if(moveFocus)stage.querySelector("h2").focus();
    }
    renderEnvironment();renderStep();
  }
  function bindQuestion(l,id){
    main.querySelector(".choices").onclick=e=>{
      const b=e.target.closest("button[data-choice]");if(!b)return;
      const right=Number(b.dataset.choice)===l.answer;
      main.querySelectorAll(".choices button").forEach(el=>el.classList.remove("right","wrong"));
      b.classList.add(right?"right":"wrong");
      main.querySelector(".feedback").textContent=right?"答对了！"+l.explanation:"再想一想。"+l.explanation+" 你可以重新选一次。";
      if(right){
        completed.add(id);
        try{localStorage.setItem(storeKey+":"+id,"1");}catch{storageWorks=false;}
        main.querySelector("#next-lesson").classList.remove("hidden");
      }
    };
  }
  function progress(){
    document.getElementById("progress-body").innerHTML='<p>已完成 <b>'+completed.size+' / '+ids.length+'</b> 节课</p><progress aria-label="已完成课程" value="'+completed.size+'" max="'+ids.length+'"></progress><p class="fine">'+(storageWorks?"答对随堂练习即可完成本课。进度保存在当前浏览器。":"答对随堂练习即可完成本课。当前浏览器仅在本次打开期间记录进度。")+ '</p><div class="progress-row"><span>零基础导读</span><span>'+foundationIds.filter(id=>completed.has(id)).length+' / 3</span></div>'+units.map((u,i)=>'<div class="progress-row"><span>'+pad(i+1)+'　'+u.title+'</span><span>'+u.lessons.filter((_,j)=>completed.has((i+1)+"/"+(j+1))).length+' / '+u.lessons.length+'</span></div>').join("")+'<a id="resume" class="primary dialog-action" href="'+lessonLink(firstIncomplete())+'">'+(completed.size===ids.length?"复习课程":"继续学习")+'</a>';
    dialog.showModal();document.getElementById("resume").onclick=()=>dialog.close();
  }
  document.getElementById("open-progress").onclick=progress;
  document.getElementById("close-progress").onclick=()=>dialog.close();
  dialog.addEventListener("click",e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  function render(){
    const hash=location.hash.slice(1), parts=hash.split("/");
    let page=parts[0]||"home", title="学习首页";
    if(dialog.open)dialog.close();
    if(page==="start"&&foundationIds.includes(hash)){
      const index=Number(parts[1])-1, l=window.foundations[index];
      title=l.title;main.innerHTML=window.foundationView(index,l,completed.has(hash));
      window.bindFoundationDemo(main,l);bindQuestion(l,hash);
    } else if(page==="lesson"&&practiceIds.includes(parts.slice(1).join("/"))){
      const i=Number(parts[1])-1,j=Number(parts[2])-1,l=units[i].lessons[j];
      openWorkshop(i,j);title=l.title;
    } else if(page==="practice"){
      title="代码练习";main.innerHTML='<div class="inner-head"><div class="section-code">CODE PLAYGROUND</div><h1 class="view-title">代码练习</h1><p class="lead">选一段示例，改改代码，在浏览器里观察输出。</p></div><div id="playground"></div>';window.renderPlayground(document.getElementById("playground"));
    } else if(page==="courses"){title="课程目录";main.innerHTML=catalog(false);}
    else{page="home";main.innerHTML=home();}
    document.querySelectorAll("[data-nav]").forEach(a=>{const active=a.dataset.nav===(["lesson","start"].includes(page)?"courses":page);a.classList.toggle("active",active);if(active)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});
    main.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{main.querySelectorAll(".filter").forEach(el=>el.setAttribute("aria-pressed",String(el===b)));main.querySelector(".cards").innerHTML=units.map((u,i)=>b.textContent==="全部"||b.textContent===u.level?card(u,i):"").join("");});
    document.title=title+" · Swift Lab";window.scrollTo(0,0);
  }
  document.querySelector(".skip").onclick=e=>{e.preventDefault();main.focus();main.scrollIntoView();};
  window.addEventListener("storage",event=>{
    const prefix=storeKey+":";
    if(event.key?.startsWith(prefix)&&event.newValue==="1"){
      const id=event.key.slice(prefix.length);
      if(ids.includes(id)) completed.add(id);
    }
  });
  window.addEventListener("hashchange",()=>{render();main.focus({preventScroll:true});});render();
})();
