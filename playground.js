(() => {
  "use strict";

  const examples = [
    {
      title: "向 Swift 问好",
      prompt: "把“小林”换成你的名字，再让学习天数增加一天。",
      source: String.raw`let name = "小林"
var days = 1

print("你好，\(name)！")
days = days + 1
print("这是学习 Swift 的第 \(days) 天。")`
    },
    {
      title: "计算学习时长",
      prompt: "修改每节课的分钟数和课程数量，看看总时长如何变化。",
      source: String.raw`let minutes = 25
let lessons = 3
let total = minutes * lessons

print("总时长：\(total) 分钟")
print("\(total / 60) 小时 \(total % 60) 分钟")`
    },
    {
      title: "拼一张名片",
      prompt: "用 + 拼接文本，再用字符串插值把城市加到名片里。",
      source: String.raw`let name: String = "小林"
let skill = "Swift"
var city = "上海"

let card = name + " · " + skill
print("\(card)，来自\(city)。")`
    }
  ];

  // Parse the supported expressions directly so source text never runs as JavaScript.
  class Reader {
    constructor(line, variables) {
      this.line = line;
      this.variables = variables;
      this.pos = 0;
    }
    spaces() { while (/\s/.test(this.line[this.pos] || "!")) this.pos++; }
    peek() { this.spaces(); return this.line[this.pos]; }
    take(char) {
      if (this.peek() !== char) return false;
      this.pos++;
      return true;
    }
    require(char) {
      if (!this.take(char)) throw Error("这里需要 " + char + "。");
    }
    identifier() {
      this.spaces();
      const match = this.line.slice(this.pos).match(/^[A-Za-z_][A-Za-z0-9_]*/);
      if (!match) throw Error("请使用由英文字母、数字或下划线组成的名称，名称不能以数字开头。");
      this.pos += match[0].length;
      return match[0];
    }
    done() {
      this.spaces();
      return this.pos >= this.line.length || this.line.startsWith("//", this.pos);
    }
    checkedInt(value) {
      if (!Number.isSafeInteger(value)) throw Error("这个整数超出了浏览器练习区支持的精确范围。");
      return value || 0;
    }
    string() {
      let result = "";
      while (this.pos < this.line.length) {
        if (result.length > 20000) throw Error("文本过长，请缩短练习内容。");
        const ch = this.line[this.pos++];
        if (ch === '"') return result;
        if (ch !== "\\") { result += ch; continue; }
        const escaped = this.line[this.pos++];
        if (escaped === "(") {
          result += this.expression();
          this.require(")");
        } else if (escaped === "n") result += "\n";
        else if (escaped === "t") result += "\t";
        else if (escaped === '"' || escaped === "\\") result += escaped;
        else throw Error("无法识别这处转义。字符串插值写作 " + String.raw`\(name)` + "。");
      }
      throw Error("字符串末尾缺少英文双引号。");
    }
    primary() {
      if (this.take('"')) return this.string();
      if (this.take("(")) {
        const value = this.expression();
        this.require(")");
        return value;
      }
      if (this.take("-")) {
        const value = this.primary();
        if (typeof value !== "number") throw Error("负号需要配合整数使用。");
        return this.checkedInt(-value);
      }
      this.spaces();
      const number = this.line.slice(this.pos).match(/^\d+/);
      if (number) {
        this.pos += number[0].length;
        if (this.line[this.pos] === ".") throw Error("这里支持整数。小数运算请在 Xcode 中运行。");
        return this.checkedInt(Number(number[0]));
      }
      const name = this.identifier();
      if (!this.variables.has(name)) throw Error("还没有声明「" + name + "」，请检查名称或先用 let、var 声明。");
      return this.variables.get(name).value;
    }
    product() {
      let value = this.primary();
      while (!this.done() && ["*", "/", "%"].includes(this.peek())) {
        const op = this.line[this.pos++];
        const right = this.primary();
        if (typeof value !== "number" || typeof right !== "number") throw Error("乘、除和取余运算需要两个整数。");
        if (right === 0 && op !== "*") throw Error("除数不能为零。");
        if (op === "*") value = this.checkedInt(value * right);
        else if (op === "/") value = this.checkedInt(Math.trunc(value / right));
        else value = this.checkedInt(value % right);
      }
      return value;
    }
    expression() {
      let value = this.product();
      while (!this.done() && ["+", "-"].includes(this.peek())) {
        const op = this.line[this.pos++];
        const right = this.product();
        if (op === "+" && typeof value === "string" && typeof right === "string") {
          if (value.length + right.length > 20000) throw Error("文本过长，请缩短练习内容。");
          value += right;
        }
        else {
          if (typeof value !== "number" || typeof right !== "number") throw Error("加减运算需要两个整数。用 + 拼接文本时，两边都应是字符串。");
          value = this.checkedInt(op === "+" ? value + right : value - right);
        }
      }
      return value;
    }
    statement(output) {
      if (this.done()) return;
      const first = this.identifier();
      if (first === "print" && this.take("(")) {
        const parts = [];
        if (!this.take(")")) {
          do { parts.push(String(this.expression())); } while (this.take(","));
          this.require(")");
        }
        output.push(parts.join(" "));
      } else if (first === "let" || first === "var") {
        const name = this.identifier();
        if (["let", "var", "print", "_", "true", "false", "class", "enum", "struct", "func", "return", "if", "else", "for", "while", "in", "import", "nil"].includes(name))
          throw Error("请换一个变量名。");
        if (this.variables.has(name)) throw Error("「" + name + "」已经声明过了。");
        let expected;
        if (this.take(":")) {
          expected = this.identifier();
          if (expected !== "Int" && expected !== "String") throw Error("这里支持 Int 和 String 两种类型。");
        }
        this.require("=");
        const value = this.expression();
        if (expected && expected !== (typeof value === "number" ? "Int" : "String")) throw Error("右边的值与声明的 " + expected + " 类型不一致。");
        this.variables.set(name, { mutable: first === "var", value });
      } else {
        const entry = this.variables.get(first);
        if (!entry) throw Error("这里可以写 let、var、变量赋值和 print(…)。");
        if (!entry.mutable) throw Error("「" + first + "」是 let 常量。如果希望再次赋值，请把声明改成 var。");
        this.require("=");
        const value = this.expression();
        if (typeof entry.value !== typeof value) throw Error("新值需要和原来的变量类型相同。");
        entry.value = value;
      }
      if (!this.done()) throw Error("请检查此处的内容，每行只写一条受支持的语句。");
    }
  }

  function interpret(source) {
    const lines = source.split(/\r?\n/);
    const output = [];
    const variables = new Map();
    let totalText = 0;
    for (const [i, line] of lines.entries()) {
      try {
        const count = output.length;
        new Reader(line, variables).statement(output);
        if (count !== output.length) totalText += output[output.length - 1].length;
        if (totalText > 200000) throw Error("这段练习太长，请分成几个小例子运行。");
      } catch (err) {
        return { error: "第 " + (i + 1) + " 行 · " + (err instanceof RangeError ? "表达式嵌套过深，请拆开书写。" : err.message) };
      }
    }
    return { output: output.join("\n"), printed: output.length > 0 };
  }

  const styles = `
    .swift-practice{--pg-line:#cfcfc5;--pg-paper:#fcfbf6;--pg-ink:#252723;--pg-accent:#ff6b41;color:var(--pg-ink);font:1rem/1.65 -apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif}
    .swift-practice *{box-sizing:border-box}
    .swift-practice .pg-toolbar,.swift-practice .pg-controls,.swift-practice .pg-panel-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
    .swift-practice .pg-toolbar{margin-bottom:16px}
    .swift-practice label{font-size:.92rem;font-weight:650}
    .swift-practice select,.swift-practice button{font:inherit;color:inherit;cursor:pointer}
    .swift-practice select{padding:7px 38px 7px 12px;border:1px solid #aaa99f;border-radius:5px;background-color:var(--pg-paper);max-width:100%;appearance:none;background-image:linear-gradient(45deg,transparent 50%,#45453d 50%),linear-gradient(135deg,#45453d 50%,transparent 50%);background-position:calc(100% - 17px) 52%,calc(100% - 12px) 52%;background-size:5px 5px;background-repeat:no-repeat}
    .swift-practice .pg-prompt{margin:0 0 16px;color:#57594f}
    .swift-practice .pg-grid{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);border:1px solid #30322c;border-radius:8px;overflow:hidden;background:#252723}
    .swift-practice .pg-panel{min-width:0;display:flex;flex-direction:column}
    .swift-practice .pg-panel:first-child{border-right:1px solid #586052}
    .swift-practice .pg-panel-heading{background:#353830;color:#fcfbf6;padding:10px 16px;font:500 .875rem/1.5 ui-monospace,Menlo,monospace}
    .swift-practice .pg-code,.swift-practice .pg-output{margin:0;border:0;width:100%;padding:18px 16px;min-height:225px;font:1rem/1.65 ui-monospace,SFMono-Regular,Menlo,monospace;tab-size:4}
    .swift-practice .pg-code{background:#252723;color:#f6ecd5;resize:vertical}
    .swift-practice .pg-output{color:#bdeda5;background:#242822;white-space:pre-wrap;overflow-wrap:anywhere;flex:1}
    .swift-practice .pg-output.pg-error{color:#ffbba1}
    @keyframes pg-show-line{from{opacity:0}to{opacity:1}}
    @media(prefers-reduced-motion:no-preference){
      .swift-practice .pg-output-line{animation:pg-show-line 90ms linear var(--pg-delay) backwards}
    }
    .swift-practice .pg-controls{margin:15px 0;justify-content:flex-start}
    .swift-practice .pg-controls button{border:1px solid #292b25;border-radius:5px;padding:8px 17px;background:var(--pg-paper);font-weight:650;min-height:42px}
    .swift-practice .pg-controls .pg-run{background:var(--pg-accent);color:#201e19}
    .swift-practice .pg-controls button:hover{filter:brightness(.95)}
    .swift-practice :is(select,textarea,button,summary):focus-visible{outline:3px solid #6478c9;outline-offset:2px}
    .swift-practice .pg-code:focus-visible{outline-offset:-3px}
    .swift-practice .pg-shortcut{font-size:.85rem;color:#65685e}
    .swift-practice .pg-help{border-top:1px solid var(--pg-line);margin-top:20px;padding-top:12px;font-size:.92rem;color:#50534a}
    .swift-practice .pg-help summary{cursor:pointer;font-weight:650}
    .swift-practice .pg-help p{margin:7px 0}
    @media(max-width:760px){.swift-practice .pg-grid{grid-template-columns:minmax(0,1fr)}.swift-practice .pg-panel:first-child{border-right:0}.swift-practice .pg-output{min-height:100px}.swift-practice .pg-shortcut{display:none}}
  `;

  const drafts = new Map();
  let current = 0;
  let sequence = 0;
  window.renderPlayground = function renderPlayground(container) {
    sequence++;
    const prefix = "swift-pg-" + sequence;
    container.innerHTML = `<style>${styles}</style><section class="swift-practice" aria-label="Swift 代码练习">
      <div class="pg-toolbar"><label for="${prefix}-example">练习示例</label><select id="${prefix}-example" aria-label="选择练习示例"></select></div>
      <p class="pg-prompt"></p>
      <div class="pg-grid">
        <div class="pg-panel"><div class="pg-panel-heading"><label for="${prefix}-code">main.swift</label><span>可编辑</span></div>
          <textarea class="pg-code" id="${prefix}-code" maxlength="12000" autocapitalize="off" autocomplete="off" spellcheck="false" aria-label="Swift 示例代码"></textarea></div>
        <div class="pg-panel"><div class="pg-panel-heading"><span>控制台输出</span></div><pre class="pg-output" role="status" aria-live="polite" aria-atomic="true"></pre></div>
      </div><div class="pg-controls"><button type="button" class="pg-run">运行代码</button><button type="button" class="pg-reset">还原示例</button><span class="pg-shortcut">⌘ / Ctrl + Enter 运行</span></div>
      <details class="pg-help"><summary>练习区支持哪些 Swift 语法？</summary>
        <p>浏览器内模拟执行基础 Swift 语句。每行写一条指令，名称使用英文字母、数字和下划线。可以声明 let 常量、var 变量，使用整数、字符串、四则运算、取余、字符串插值和 print 输出。用 // 添加注释。</p>
        <p>完整 Swift 语言、循环、函数、集合与 SwiftUI 界面，请在 Mac 的 Xcode 中运行。</p></details></section>`;
    const select = container.querySelector("select");
    const code = container.querySelector("textarea");
    const output = container.querySelector(".pg-output");
    const prompt = container.querySelector(".pg-prompt");
    examples.forEach((example, i) => select.add(new Option(example.title, i)));
    function showExample() {
      select.value = String(current);
      code.value = drafts.get(current) ?? examples[current].source;
      prompt.textContent = examples[current].prompt;
      output.textContent = "等待运行…";
      output.classList.remove("pg-error");
    }
    function run() {
      const result = interpret(code.value);
      output.classList.toggle("pg-error", !!result.error);
      if (result.error || !result.printed) {
        output.textContent = result.error ?? "运行完成。用 print(…) 可以显示输出。";
        return;
      }

      // Insert the complete result once for assistive technology. Only the
      // first few visual lines are staggered, so large results finish promptly.
      const lines = result.output.split("\n");
      const fragment = document.createDocumentFragment();
      const groups = Math.min(lines.length, 7);
      for (let i = 0; i < groups; i++) {
        const span = document.createElement("span");
        span.className = "pg-output-line";
        span.style.setProperty("--pg-delay", (140 + i * 180) + "ms");
        span.textContent = i === groups - 1 ? lines.slice(i).join("\n") : lines[i] + "\n";
        fragment.append(span);
      }
      output.replaceChildren(fragment);
    }
    select.addEventListener("change", () => { current = Number(select.value); showExample(); });
    code.addEventListener("input", () => {
      drafts.set(current, code.value);
      output.textContent = "代码已修改，等待运行…";
      output.classList.remove("pg-error");
    });
    code.addEventListener("keydown", event => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        run();
      }
    });
    container.querySelector(".pg-run").addEventListener("click", run);
    container.querySelector(".pg-reset").addEventListener("click", () => {
      drafts.delete(current);
      showExample();
      code.focus();
    });
    showExample();
  };
})();
