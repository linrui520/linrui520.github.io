(() => {
  "use strict";

  // These diagrams highlight real command and field names in an instructional layout.
  const paths = {
    folder: '<path d="M3 7V5h6l2 3h10v12H3V7Z"/>',
    file: '<path d="M5 3h10l4 4v14H5z"/><path d="M14 3v5h5M8 12h8m-8 4h6"/>',
    terminal: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m6 9 3 3-3 3m5 1h5"/>',
    app: '<rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 8h20M7 11v7m3-6h8m-8 4h6"/>',
    layers: '<path d="m2 8 10-5 10 5-10 5zM3 12l9 5 9-5M3 16l9 5 9-5"/>',
    play: '<path d="m7 4 12 8-12 8z"/>'
  };
  function icon(name) {
    return '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths[name] + '</svg>';
  }
  function card(title, illustration, tip) {
    return { title, html: '<figure class="setup-guide"><div class="setup-guide-art">' + illustration + '</div><figcaption>' + tip + '</figcaption></figure>' };
  }
  function path(labels) {
    return '<ol class="setup-guide-path" aria-label="菜单路径">' + labels.map(label => '<li>' + label + '</li>').join('') + '</ol>';
  }
  const newProject = card("打开新建项目菜单",
    path(["File", "New", "Project…"]) + '<span class="setup-guide-shortcut">快捷键 <kbd>⇧</kbd><kbd>⌘</kbd><kbd>N</kbd></span>',
    '在 Mac 屏幕顶部的 Xcode 菜单栏操作。若出现快捷模板菜单，点 <b>Choose Template</b>。');

  function template(isApp) {
    const name = isApp ? "App" : "Command Line Tool";
    return card("选中 " + name + " 模板",
      '<div class="setup-guide-templates"><span class="setup-guide-platform"><small>平台</small>macOS</span><div class="setup-guide-template">' + icon(isApp ? "app" : "terminal") + '<b>' + name + '</b></div></div>',
      '先选上方的 <b>macOS</b>，再选图中的模板，点 <b>Next</b>。');
  }
  function config(isApp) {
    const rows = [["Product Name", isApp ? "StudyCounter" : "SwiftPractice"], ["Language", "Swift"]];
    if (isApp) rows.push(["Interface", "SwiftUI"], ["Storage", "None"]);
    return card("填写项目选项并保存",
      '<dl class="setup-guide-values">' + rows.map(([key, value]) => '<div><dt>' + key + '</dt><dd>' + value + '</dd></div>').join('') + '</dl>',
      (isApp ? '若有 <b>Storage</b>，选 <b>None</b>。' : '') + '若要求填写 <b>Organization Identifier</b>，练习可填 <code>com.example</code>。点 <b>Next</b>，选文件夹，再点 <b>Create</b>。');
  }
  function tree(folder, file, extra) {
    return '<ul class="setup-guide-tree" aria-label="项目文件位置"><li><span class="setup-guide-folder">' + icon("folder") + folder + '</span><ul><li><strong>' + icon("file") + file + '</strong></li>' + (extra ? '<li><span>' + icon("file") + extra + '</span></li>' : '') + '</ul></li></ul>';
  }
  function openFile(isApp) {
    const file = isApp ? "ContentView.swift" : "main.swift";
    return card("打开 " + file,
      tree(isApp ? "StudyCounter" : "SwiftPractice", file, isApp ? "StudyCounterApp.swift" : ""),
      '在左侧项目导航中展开同名文件夹，再单击高亮文件。' + (isApp ? '保留 <code>StudyCounterApp.swift</code>，它负责启动应用。' : '按 <kbd>⌘1</kbd> 可显示项目导航。'));
  }
  const playground = [
    card("选中已有的 Playground.swift",
      '<div class="setup-guide-single">' + icon("file") + '<b>Playground.swift</b></div>',
      '适用于 Xcode 26 及以后的版本。若左侧已有这个文件，直接打开它。'),
    card("找准练习代码的位置",
      '<div class="setup-guide-block"><code>import Playgrounds</code><code>#Playground {</code><span>在这里放入 print 语句</span><code>}</code></div>',
      '第一行引入 Playgrounds。要运行的语句放在 <code>#Playground</code> 的一对花括号里面。'),
    card("找到 Canvas 和 Resume",
      path(["Editor", "Canvas"]) + '<div class="setup-guide-canvas">' + icon("layers") + '<span>Canvas 画布</span><strong>' + icon("play") + 'Resume</strong></div>',
      '填好练习代码后，在画布点 <b>Resume</b> 查看结果。如果画布已打开，可以直接使用。')
  ];

  window.projectSetupSteps = function projectSetupSteps(kind) {
    if (kind === "playground") return playground.slice();
    if (kind !== "cli" && kind !== "app") return [];
    const isApp = kind === "app";
    return [newProject, template(isApp), config(isApp), openFile(isApp)];
  };
})();
