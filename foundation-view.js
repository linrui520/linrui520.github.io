(() => {
  'use strict';
  const titles = ['程序是什么', 'Swift、macOS 和 Xcode', '读懂第一行代码'];
  const escape = value => String(value).replace(/[&<>"']/g, char =>
    ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
  const book = '<svg width="23" height="23" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.6"><path d="M2.5 4.8c4-1.1 7.3-.5 9.5 1.6 2.6-2.1 5.7-2.7 9.5-1.6v14.5c-3.5-1-6.7-.4-9.5 1.8-2.6-2.2-5.7-2.8-9.5-1.8zM12 6.4v14.1"/></svg>';

  function board(index, step) {
    if (index === 0) {
      const ticket = '<div class="fd-ticket"><div><small>电影片长</small><b>90 <span>分钟</span></b></div><i></i></div>';
      const parts = '<div class="fd-split"><div class="fd-total" aria-hidden="true">90 分钟</div><div class="fd-time-bars"><div><strong>60</strong><small>分钟</small></div><div><strong>30</strong><small>分钟</small></div></div></div>';
      const output = '<div class="fd-display"><small>换算结果</small><b>1 <span>小时</span> 30 <span>分钟</span></b></div>';
      return [ticket, parts, output][step];
    }
    if (index === 1) {
      const rule = '<div class="fd-code-card fd-rules"><small>用 Swift 表达规则</small><div><b>分出整小时</b><b>保留剩余分钟</b></div></div>';
      const editor = '<div class="fd-editor"><small>在 Xcode 中制作</small><div><b>编辑换算工具</b><span>▷ 运行并测试</span></div></div>';
      const app = '<div class="fd-window"><small>电影时长换算</small><div>90 分钟 <b>1 小时 30 分钟</b></div></div>';
      return [rule, editor, app][step];
    }
    if (step === 2) return '<div class="fd-display"><small>控制台输出</small><b>你好，Mac</b></div>';
    const verb = step === 0 ? '<mark>print</mark>' : 'print';
    const phrase = step === 1 ? '<mark>"你好，Mac"</mark>' : '"你好，Mac"';
    return '<div class="fd-code-card"><small>Swift</small><code>'+verb+'('+phrase+')</code></div>';
  }

  function demonstration(index, demo) {
    const tabs = demo.frames.map((frame, k) => '<button type="button" role="tab" id="fd-tab-'+k+
      '" aria-selected="'+(k===0)+'" aria-controls="fd-frame-'+k+'" tabindex="'+(k===0?0:-1)+
      '" data-frame="'+k+'"><span>0'+(k+1)+'</span>'+escape(frame.label)+'</button>').join('');
    const panels = demo.frames.map((frame, k) => '<div class="fd-panel" role="tabpanel" tabindex="0" id="fd-frame-'+k+
      '" aria-labelledby="fd-tab-'+k+'"'+(k?' hidden':'')+'><div class="fd-stage">'+board(index,k)+
      '</div><p>'+escape(frame.text)+'</p></div>').join('');
    const controls = '<div class="fd-playbar"><button type="button" class="fd-play">播放演示</button>'+
      '<span class="fd-play-state" role="status" aria-live="polite" aria-atomic="true"></span></div>';
    return '<section class="fd-demo"><h2 class="fd-sr-only" id="fd-demo-title">'+escape(demo.title)+'</h2><div class="fd-demo-box">'+
      '<div role="tablist" aria-labelledby="fd-demo-title" class="fd-tabs">'+tabs+'</div>'+panels+controls+'</div></section>';
  }

  function textSection(section) {
    return '<section class="fd-prose"><h2>'+escape(section.heading)+'</h2>'+
      section.paragraphs.map(p=>'<p>'+escape(p)+'</p>').join('')+'</section>';
  }

  window.foundationView = (index, lesson, completed = false) => {
    const nextHref = ['#start/2', '#start/3', '#lesson/1/1'][index];
    const nextText = index===2?'进入 Swift 语言基础':'学习下一课';
    const links = titles.map((title,k)=>'<a href="#start/'+(k+1)+'"'+(k===index?' aria-current="page"':'')+
      '><span>0'+(k+1)+'</span>'+escape(title)+'</a>').join('');
    const reading = lesson.sections.map(textSection).join('');
    return '<nav class="crumb" aria-label="面包屑"><a href="#courses">课程目录</a><span aria-hidden="true">/</span>零基础导读</nav>'+
      '<div class="fd-layout"><aside class="fd-aside"><nav aria-labelledby="fd-nav-title"><h2 id="fd-nav-title">'+book+'零基础导读</h2>'+links+'</nav></aside>'+
      '<article class="fd-article"><div class="fd-head"><div class="fd-chapter">第 '+(index+1)+' / 3 课<span>'+escape(lesson.title)+'</span></div>'+
      '<h1>'+escape(lesson.intro)+'</h1></div><div class="fd-content">'+demonstration(index,lesson.demonstration)+
      '<details class="fd-fold fd-check"><summary>考考我<small>答对进入下一课</small></summary>'+
      '<div class="fd-quiz"><p>'+escape(lesson.question)+'</p><div class="choices">'+
      lesson.choices.map((choice,k)=>'<button type="button" data-choice="'+k+'"><span class="fd-letter">'+String.fromCharCode(65+k)+'</span>'+escape(choice)+'</button>').join('')+
      '</div><p class="feedback" role="status"></p></div></details>'+
      '<div class="fd-actions"><a class="primary'+(completed?'':' hidden')+'" id="next-lesson" href="'+nextHref+'">'+nextText+'</a></div>'+
      '<details class="fd-fold fd-reading"><summary>了解更多</summary><div class="fd-reading-body">'+reading+
      '<aside class="fd-takeaway"><h2>记住这一点</h2><p>'+escape(lesson.takeaway)+'</p></aside></div></details></div></article></div>';

  };

  let disposePrevious = () => {};
  window.bindFoundationDemo = root => {
    disposePrevious();
    const demo = root.querySelector('.fd-demo');
    if (!demo) return;
    const tabs = [...demo.querySelectorAll('[role="tab"]')];
    const panels = [...demo.querySelectorAll('.fd-panel')];
    const toggle = demo.querySelector('.fd-play');
    const status = demo.querySelector('.fd-play-state');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const last = tabs.length - 1;
    let frame = reduced.matches ? last : 0;
    let timer = null;
    let mode = 'manual';
    let deadline = 0;
    let remaining = 2800;

    function sync() {
      demo.dataset.mode = mode;
      toggle.textContent = reduced.matches ? (frame === last ? '回看第一步' : '查看结果')
        : mode === 'playing' ? '暂停' : mode === 'paused' ? '继续播放' : frame === last ? '重播' : '播放演示';
      status.textContent = (mode === 'playing' ? '播放中' : mode === 'paused' ? '已暂停' : '第 '+(frame+1)+' 步')+
        ' · '+tabs[frame].textContent.slice(2);
      tabs.forEach((tab,k)=>{
        tab.setAttribute('aria-selected', String(k===frame));
        tab.tabIndex = k===frame ? 0 : -1;
        panels[k].hidden = k!==frame;
      });
    }
    function clearTimer() {
      window.clearTimeout(timer);
      timer = null;
    }
    function select(index) {
      clearTimer();
      frame = index;
      mode = 'manual';
      remaining = 2800;
      sync();
    }
    function schedule() {
      deadline = performance.now() + remaining;
      timer = window.setTimeout(()=>{
        timer = null;
        if (!demo.isConnected) return;
        frame++;
        remaining = 2800;
        if (frame === last) mode = 'finished';
        sync();
        if (mode === 'playing') schedule();
      }, remaining);
    }
    toggle.onclick = () => {
      if (reduced.matches) {
        select(frame === last ? 0 : last);
        return;
      }
      if (mode === 'playing') {
        remaining = Math.max(50,deadline - performance.now());
        clearTimer();
        mode = 'paused';
      } else {
        if (mode !== 'paused') {
          frame = 0;
          remaining = 2800;
          // A replay also restarts the intro motion if its tab is already visible.
          panels[0].getAnimations?.({subtree:true}).forEach(animation=>{
            animation.cancel();
            animation.play();
          });
        }
        mode = 'playing';
        schedule();
      }
      sync();
    };
    tabs.forEach((tab,k)=>{
      tab.onclick = () => select(k);
      tab.onkeydown = event => {
        const targets = {ArrowLeft:(k+tabs.length-1)%tabs.length, ArrowRight:(k+1)%tabs.length, Home:0, End:last};
        if (!Object.hasOwn(targets,event.key)) return;
        event.preventDefault();
        const index = targets[event.key];
        select(index);
        tabs[index].focus();
      };
    });
    function changeMotion() { select(reduced.matches ? last : frame); }
    const observer = new MutationObserver(()=>{
      if (!demo.isConnected) dispose();
    });
    function dispose() {
      clearTimer();
      observer.disconnect();
      reduced.removeEventListener('change', changeMotion);
      window.removeEventListener('pagehide', suspend);
      disposePrevious = () => {};
    }
    observer.observe(root,{childList:true});
    reduced.addEventListener('change', changeMotion);
    function suspend() { select(frame); }
    window.addEventListener('pagehide', suspend);
    disposePrevious = dispose;
    sync();
  };
})();
