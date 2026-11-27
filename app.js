// Browser exercise for the Swift loops lesson.
(() => {
  "use strict";

  const styles = `
    .loop-lab{--loop-ink:#312b25;--loop-copper:#a94725;--loop-line:#cbc2af;--loop-sand:#f7f3e8;background:#fffcf4;color:var(--loop-ink);border:1px solid var(--loop-line);border-radius:11px;overflow:hidden;font:1rem/1.5 -apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;min-width:0}
    .loop-lab *{box-sizing:border-box}
    .loop-lab .loop-lesson{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:stretch}
    .loop-lab .loop-codebox{align-self:center;padding:20px clamp(14px,2.6vw,28px)}
    .loop-lab .loop-code{display:block;color:#463b31;white-space:pre-wrap;font:600 clamp(1rem,2.1vw,1.22rem)/1.75 ui-monospace,SFMono-Regular,Menlo,monospace}
    .loop-lab .loop-kw{color:#a13a22}
    .loop-lab .loop-code select{font:inherit;color:var(--loop-ink);border:1px solid #b6633a;border-radius:5px;background:#ffe1b8;padding:1px 17px 1px 5px;appearance:none;cursor:pointer;background-image:linear-gradient(45deg,transparent 50%,#82482c 50%),linear-gradient(135deg,#82482c 50%,transparent 50%);background-size:4px 4px;background-position:calc(100% - 9px) 52%,calc(100% - 5px) 52%;background-repeat:no-repeat}
    .loop-lab .loop-caption{font-size:.94rem;color:#605540;margin:10px 0 0}
    .loop-lab .loop-stage{isolation:isolate;position:relative;overflow:hidden;min-height:196px;background:#efedda;border-left:1px solid var(--loop-line);background-image:radial-gradient(#d5cfb8 .85px,transparent .85px);background-size:8px 8px}
    .loop-lab .loop-count{position:absolute;top:11px;left:12px;z-index:1;background:#fffdf3;border:1px solid #ad9e80;color:#483b2c;font:600 .86rem/1.7 ui-monospace,Menlo,monospace;padding:1px 8px;border-radius:5px}
    .loop-lab .loop-ground{position:absolute;left:0;bottom:0;width:100%;height:34px;border-top:2px solid #8b805e;background:repeating-linear-gradient(-52deg,#e4d7b9 0 5px,#dfd2b2 5px 6px)}
    .loop-lab .loop-shadow{position:absolute;bottom:23px;left:50%;width:99px;height:18px;background:#aa9c75;border-radius:50%;transform:translateX(-50%);opacity:.6}
    .loop-lab .loop-cat{display:block;position:absolute;width:108px;height:97px;left:calc(50% - 54px);bottom:29px;transform-origin:50% 92%}
    .loop-lab .loop-cat svg{display:block;width:100%;height:100%}
    .loop-lab .loop-controls{padding:16px clamp(14px,2.6vw,28px) 18px;border-top:1px solid var(--loop-line)}
    .loop-lab .loop-controls fieldset{border:0;padding:0;margin:0;min-width:0}
    .loop-lab .loop-controls legend{padding:0;margin:0 0 8px;font-weight:700;color:var(--loop-ink);font-size:1rem}
    .loop-lab .loop-picks,.loop-lab .loop-actions{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
    .loop-lab .loop-pick{position:relative;display:inline-flex}
    .loop-lab .loop-pick input{position:absolute;opacity:0;width:1px;height:1px;left:50%;top:50%}
    .loop-lab .loop-pick span{display:inline-flex;align-items:center;justify-content:center;min-width:43px;min-height:40px;padding:4px 8px;background:#fffdf6;border:1px solid #ab9e88;border-radius:5px;cursor:pointer;font:600 1rem/1.2 ui-monospace,Menlo,monospace}
    .loop-lab .loop-pick input:checked+span{background:#ffdfc9;border:2px solid #a84924;padding:3px 7px;color:#683216}
    .loop-lab .loop-pick input:focus-visible+span,.loop-lab :is(button,select):focus-visible{outline:3px solid #4e6e9e;outline-offset:2px}
    .loop-lab .loop-pick input:disabled+span{cursor:default}
    .loop-lab .loop-actions{margin-top:12px}
    .loop-lab .loop-run{background:#343228;color:white;border:1px solid #343228;border-radius:6px;line-height:1.4;font-family:inherit;font-size:1rem;font-weight:650;min-height:42px;padding:7px 16px;cursor:pointer}
    .loop-lab .loop-run:disabled{background:#dcd8cb;color:#625d52;border-color:#c4bcaa;cursor:default}
    .loop-lab .loop-message{font-size:.95rem;color:#544c3f;line-height:1.5;margin:0;flex:1 1 200px}
    @media(max-width:570px){.loop-lab .loop-lesson{grid-template-columns:1fr}.loop-lab .loop-stage{border-left:0;border-top:1px solid var(--loop-line);min-height:178px}.loop-lab .loop-codebox{padding-block:13px}.loop-lab .loop-picks{gap:5px}.loop-lab .loop-pick span{min-width:36px}}
  `;

  function cat() {
    return `<svg viewBox="0 0 132 118" aria-hidden="true" fill="none" stroke="#573b28" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">
      <path d="M92 94c14-1 21-8 20-19-1-7-8-9-11-4 1-12 13-11 18-4 9 15-2 36-22 38Z" fill="#db8749"/>
      <path d="M109 66c4-4 10-2 13 2M112 75l9 1" stroke="#99532d"/>
      <path d="M43 75c2-17 19-24 35-17 13 5 23 20 23 38 0 6-4 9-9 9H45c-7 0-11-5-11-10 0-7 4-14 9-20Z" fill="#eaa65f"/>
      <path d="M40 89c3-11 12-17 21-15 8 2 12 13 9 29H44c-6 0-7-7-4-14Z" fill="#fff1d1" stroke="none"/>
      <path d="m88 76 7 4m-8 1 9 5" stroke="#a76032"/>
      <path d="M45 90v10c-7 0-10 8-2 8h10c3 0 5-3 5-6V92M78 101c-6 0-9 7-2 7h12c7 0 10-4 11-9" fill="#edb377"/>
      <path d="M31 48 32 22q0-4 4-2l18 11c8-3 18-3 25 0l17-10q3-2 3 2l-1 27c5 9 4 17-1 24-7 10-20 14-34 13-17-1-30-7-35-17-3-7-3-15 3-22Z" fill="#efaf70"/>
      <path d="m36 27 1 14 10-8Zm58 0-10 7 10 6Z" fill="#e78f77" stroke="none"/>
      <path d="m55 32 3 6m9-7v7m9-6-3 6" stroke="#a96139" stroke-width="3"/>
      <path d="M43 69c1-8 8-11 17-8 8-5 17-2 18 6s-8 13-17 13-17-5-18-11Z" fill="#fff1d4" stroke="none"/>
      <path d="M41 56q3-5 6 0m25-1q3-5 6 0" stroke-width="3"/>
      <path d="M56 63q3-2 6 0l-3 3Z" fill="#a25d4e" stroke-width="1.6"/>
      <path d="M59 66v2m0 0q-3 4-6 1m6-1q3 4 6 0" stroke-width="1.8"/>
      <path d="m35 65-12-2m13 7-13 2m61-8 14-3m-14 8 15 1" stroke-width="1.6"/>
    </svg>`;
  }

  const mounted = new WeakMap();
  let serial = 0;
  window.mountLoopPrediction = function mountLoopPrediction(host) {
    mounted.get(host)?.();
    if (!document.getElementById("loop-predict-styles")) {
      const style = document.createElement("style");
      style.id = "loop-predict-styles";
      style.textContent = styles;
      document.head.append(style);
    }
    const name = "loop-pick-" + (++serial);
    const numbers = [1, 2, 3, 4, 5, 6];
    host.innerHTML = `<section class="loop-lab" aria-label="猜一猜，再运行">
      <div class="loop-lesson"><div class="loop-codebox"><code class="loop-code"><span class="loop-kw">for</span> _ <span class="loop-kw">in</span> 1...<select aria-label="修改循环终点">${numbers.map(n => '<option' + (n === 3 ? ' selected' : '') + '>' + n + '</option>').join('')}</select> {
    jump()
}</code><p class="loop-caption">这里的 jump() 是游戏定义的动作，每调用一次，小猫就跳一下。</p></div>
      <div class="loop-stage" aria-label="小猫跳跃舞台"><span class="loop-count">已落地 <b>0</b> 次</span><div class="loop-ground" aria-hidden="true"></div><div class="loop-shadow" aria-hidden="true"></div><div class="loop-cat" aria-hidden="true">${cat()}</div></div></div>
      <div class="loop-controls"><fieldset><legend>猜一猜，小猫会跳几次？</legend><div class="loop-picks">${numbers.map(n => '<label class="loop-pick"><input type="radio" name="' + name + '" value="' + n + '" aria-label="' + n + ' 次"><span>' + n + '</span></label>').join('')}</div></fieldset>
      <div class="loop-actions"><button type="button" class="loop-run" disabled>运行代码</button><p class="loop-message" role="status" aria-live="polite" aria-atomic="true">先选一个数字，再运行。</p></div></div></section>`;
    const root = host.querySelector(".loop-lab");
    const fieldset = root.querySelector("fieldset");
    const bound = root.querySelector("select");
    const target = root.querySelector(".loop-cat");
    const count = root.querySelector(".loop-count b");
    const message = root.querySelector(".loop-message");
    const runButton = root.querySelector(".loop-run");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    let animation;
    let turn = 0;
    let running = false;
    let complete = false;

    function cancel() {
      turn++;
      clearTimeout(timer);
      animation?.cancel();
      animation = undefined;
      running = false;
    }
    function reset() {
      cancel();
      complete = false;
      count.textContent = "0";
      fieldset.disabled = false;
      root.querySelectorAll("input").forEach(input => { input.checked = false; });
      runButton.disabled = true;
      runButton.textContent = "运行代码";
      message.textContent = "先选一个数字，再运行。";
    }
    function picked() {
      return root.querySelector("input:checked");
    }
    function choose() {
      if (running) return;
      complete = false;
      count.textContent = "0";
      runButton.textContent = "运行代码";
      const choice = picked();
      runButton.disabled = !choice;
      message.textContent = choice ? "你猜 " + choice.value + " 次。运行看看吧。" : "先选一个数字，再运行。";
    }
    function run() {
      if (running) return;
      if (complete) {
        reset();
        root.querySelector("input").focus();
        return;
      }
      const choice = picked();
      if (!choice) return;
      cancel();
      const currentTurn = turn;
      const goal = Number(bound.value);
      const guess = Number(choice.value);
      let landed = 0;
      running = true;
      fieldset.disabled = true;
      runButton.disabled = true;
      runButton.textContent = "运行中";
      message.textContent = "每完成一轮，就记一次落地。";
      count.textContent = "0";

      function active() { return currentTurn === turn && root.isConnected; }
      function land() {
        if (!active()) return;
        landed++;
        count.textContent = String(landed);
        if (landed < goal) {
          timer = setTimeout(jump, reduced.matches ? 110 : 150);
          return;
        }
        running = false;
        complete = true;
        fieldset.disabled = false;
        runButton.disabled = false;
        runButton.textContent = "再猜一次";
        message.textContent = (guess === goal ? "猜对啦！" : "你猜了 " + guess + " 次，小猫实际跳了 " + goal + " 次。") +
          "从 1 数到 " + goal + "，共 " + goal + " 轮，每轮跳一次。";
      }
      function jump() {
        if (!active()) return;
        if (reduced.matches || typeof target.animate !== "function") {
          timer = setTimeout(land, 240);
          return;
        }
        animation = target.animate([
          { transform: "scale(1, 1)", offset: 0 },
          { transform: "scale(1.10, .84)", offset: .14 },
          { transform: "translateY(-38px) scale(.97, 1.03)", offset: .46 },
          { transform: "translateY(-43px)", offset: .54 },
          { transform: "translateY(0) scale(1.10, .86)", offset: .86 },
          { transform: "scale(1, 1)", offset: 1 }
        ], { duration: 550, easing: "ease-in-out" });
        animation.finished.then(land, () => {});
      }
      jump();
    }
    bound.addEventListener("change", reset);
    fieldset.addEventListener("change", choose);
    runButton.addEventListener("click", run);
    function dispose() {
      if (mounted.get(host) !== dispose) return;
      cancel();
      bound.removeEventListener("change", reset);
      fieldset.removeEventListener("change", choose);
      runButton.removeEventListener("click", run);
      mounted.delete(host);
    }
    mounted.set(host, dispose);
    return dispose;
  };
})();

// Swift Lab course navigation and workshops.
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
  let disposePrediction;
  function closePrediction() {
    if (disposePrediction) disposePrediction();
    disposePrediction = undefined;
  }
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
    return '<section class="catalog" aria-label="课程目录"><div class="section-code">LEARNING PATH</div><div class="catalog-head"><'+tag+' class="view-title">'+(home?"学习路线":"课程目录")+'<small>15 节课</small></'+tag+'><a class="hero-link" href="#lesson/3/2">'+icon("play")+'猜一猜：小猫会跳几次？</a></div>'+
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
        position=i===2&&j===1?1:0;renderEnvironment();renderStep(true);
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
      if(i===2&&j===1){
        steps.unshift({type:"predict",title:"猜一猜，再运行",html:'<div data-loop-prediction></div>'});
      }
      return steps;
    }
    async function copyCode(button) {
      try{await navigator.clipboard.writeText(sourceCode());button.textContent="已复制";}
      catch{const range=document.createRange();range.selectNodeContents(stage.querySelector("pre code"));const sel=getSelection();sel.removeAllRanges();sel.addRange(range);button.textContent="已选中，请复制";}
    }
    function renderStep(moveFocus=false) {
      closePrediction();
      const steps=makeSteps(), step=steps[position], codeIndex=steps.findIndex(s=>s.type==="code");
      const predicting=step.type==="predict";
      environment.hidden=predicting;
      main.querySelector(".workshop-goal").hidden=predicting;
      stage.innerHTML='<div class="step-meter"><span>第 '+(position+1)+' / '+steps.length+' 步</span><progress aria-label="本课步骤" value="'+(position+1)+'" max="'+steps.length+'"></progress></div>'+
        '<div class="work-card"><h2 tabindex="-1">'+escape(step.title)+'</h2>'+step.html+'</div>'+
        '<div class="step-actions">'+(position>0?'<button type="button" class="lite" data-back>上一步</button>':'')+
        (position+1<steps.length?'<button type="button" class="primary" data-forward>'+(position===steps.length-2?"去答题":"下一步")+'</button>':'')+
        (!predicting&&position<codeIndex?'<button type="button" class="skip-setup" data-skip>已打开 '+sourceFile()+'</button>':'')+'</div>';
      if(predicting)disposePrediction=window.mountLoopPrediction(stage.querySelector("[data-loop-prediction]"));
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
    closePrediction();
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
