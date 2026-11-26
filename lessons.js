window.units = [
  {
    title: "Swift 语言基础",
    english: "Swift Basics",
    summary: "在 Mac 上运行第一行代码，用常量和变量记录一次学习。",
    level: "入门",
    lessons: [
      {
        title: "在 Mac 上运行第一行 Swift",
        mini: {
          goal: "让 Mac 说出你的名字。",
          idea: "print 会显示双引号里的文字。",
          tryIt: "把 Hello, Swift! 换成自己的名字，再运行。"
        },
        intro: "让 Mac 向你打个招呼。你会创建一个命令行项目，运行一行 Swift，并在 Xcode 的控制台看到它的输出。",
        steps: [
          "在 Mac App Store 安装与你的 macOS 兼容的 Xcode。首次打开时，按提示完成所需组件安装。Xcode 已包含 Swift。",
          "选择 File › New › Project，进入模板选择器，在 macOS 下选 Command Line Tool。项目取名为 SwiftPractice，语言选 Swift，再选一个文件夹保存。",
          "在左侧找到 main.swift，用下方代码替换原文。选择 My Mac，按 ⌘R 运行。在调试区域的控制台找到问候语。",
          "把引号里的 Hello, Swift! 换成你的名字，再按 ⌘R。英文双引号标出了文字的边界，控制台只显示里面的内容。"
        ],
        code: 'print("Hello, Swift!")',
        output: "Hello, Swift!",
        question: "print(\"早安\") 会显示什么？",
        choices: ["\"早安\"", "早安", "print"],
        answer: 1,
        explanation: "双引号圈出了要显示的两个字：早安。"
      },
      {
        title: "用 let 和 var 记录进度",
        mini: {
          goal: "给练习次数加一。",
          idea: "用 var 记录会变的次数，用 let 记下固定的主题。",
          tryIt: "把 attempts 的起始值从 1 改成 5，看看它加一后是多少。"
        },
        intro: "学习主题通常保持不变，练习次数会逐渐增加。给这两种数据分别取名，代码就能描述一次学习的变化。",
        steps: [
          "继续使用 SwiftPractice 项目。后续命令行示例都可以替换 main.swift 的全部内容，然后按 ⌘R。",
          "let 创建常量 topic，var 创建可重新赋值的变量 attempts。Swift 会从初始值判断它们分别是文字和整数。",
          "运行代码，观察 attempts += 1 的效果。再复制一次这行操作，放在 print 前面，预测次数会变成多少。"
        ],
        code: 'let topic = "Swift"\nvar attempts = 1\nattempts += 1\nprint(topic, attempts)',
        output: "Swift 2",
        question: "练习次数会变，开头用哪个词？",
        choices: ["let", "print", "var"],
        answer: 2,
        explanation: "var 允许改值，每练一次就能给次数加一。"
      }
    ]
  },
  {
    title: "类型与字符串",
    english: "Types & Strings",
    summary: "分清整数和小数，把计算结果写进一句话。",
    level: "入门",
    lessons: [
      {
        title: "让平均数保留小数",
        mini: {
          goal: "算出每次练习的平均时长。",
          idea: "两个整数相除会舍去小数，先换成 Double 就能算出半分钟。",
          tryIt: "把 45 换成 15，看看哪一行保留了半分钟。"
        },
        intro: "两次练习一共花了 45 分钟。计算平均时长时，操作数的类型会影响除法结果。",
        steps: [
          "minutes 和 sessions 都从整数字面量推断为 Int。先运行第一条 print，观察整数相除的结果。",
          "Double(minutes) 把分钟数转换成浮点数。对两个 Double 做除法，就能保留小数部分。",
          "把 45 改成 47，分别预测两行输出，再运行验证。务必在除法之前转成 Double，以免先丢掉小数部分。"
        ],
        code: 'let minutes = 45\nlet sessions = 2\nprint(minutes / sessions)\nprint(Double(minutes) / Double(sessions))',
        output: "22\n22.5",
        question: "45 分钟平分两次，保留小数是多少？",
        choices: ["22.5 分钟", "22 分钟", "23 分钟"],
        answer: 0,
        explanation: "22.5 加上 22.5 正好是 45。"
      },
      {
        title: "把变量放进一句话",
        mini: {
          goal: "让一句提醒自动填上时长。",
          idea: "文字里的 \\(minutes) 会换成 minutes 现在的值。",
          tryIt: "把分钟数从 15 改成 20，再读一遍提醒。"
        },
        intro: "做一条学习提醒。用字符串插值把课程名和分钟数放进同一段文字，数值改变时，提醒也随之改变。",
        steps: [
          "goal 是 String，minutes 是 Int。用反斜杠加圆括号把变量嵌入字符串，例如 \\(goal)。",
          "运行示例，查看 Swift 怎样把整数显示为文字。把 minutes 改成 20 再运行一次。",
          "在最后一句的插值括号里写 minutes * 2。插值也可以接收会产生一个值的表达式。"
        ],
        code: 'let goal = "学习 Swift"\nlet minutes = 15\nprint("今天的目标是\\(goal)，用时 \\(minutes) 分钟。")',
        output: "今天的目标是学习 Swift，用时 15 分钟。",
        question: "如果 minutes 是 20，提醒里会写多久？",
        choices: ["15 分钟", "20 分钟", "minutes 分钟"],
        answer: 1,
        explanation: "Swift 会把 minutes 的值 20 填进这句话。"
      }
    ]
  },
  {
    title: "条件与循环",
    english: "Control Flow",
    summary: "用条件判断是否达到目标，用循环完成重复任务。",
    level: "入门",
    lessons: [
      {
        title: "用 if 判断是否达标",
        mini: {
          goal: "让 Mac 判断今天有没有达标。",
          idea: "if 先检查条件，条件成立就执行它后面的动作，否则执行 else 里的动作。",
          tryIt: "把 finished 从 18 改成 25，看看提醒有什么变化。"
        },
        intro: "为学习打卡加一道判断。当天完成的分钟数达到目标时，显示祝贺；其余情况显示还需学习多久。",
        steps: [
          "finished >= target 比较两个整数，结果为 true 或 false。if 在条件为 true 时执行第一对花括号中的代码。",
          "当前只学了 18 分钟，条件为 false，程序会进入 else 分支，算出剩余的分钟数。",
          "依次把 finished 改成 24、25 和 26，每次都运行。注意刚好 25 分钟时程序选择了哪个分支。"
        ],
        code: 'let target = 25\nlet finished = 18\nif finished >= target {\n    print("今日达标")\n} else {\n    print("还差 \\(target - finished) 分钟")\n}',
        output: "还差 7 分钟",
        question: "目标是 25 分钟，正好学了 25 分钟，会显示什么？",
        choices: ["还差 1 分钟", "还差 0 分钟", "今日达标"],
        answer: 2,
        explanation: "大于或等于 25 分钟都算达标。"
      },
      {
        title: "用 for-in 重复练习",
        mini: {
          goal: "让 Mac 依次喊出练习轮数。",
          idea: "for 会按顺序取出轮号，每取一个就做一次相同的动作。",
          tryIt: "把 1...3 改成 1...4，看看最后一行是第几轮。"
        },
        intro: "同一句提示需要显示三次，每次带上不同的轮次。把重复的动作放进循环，Swift 会依次提供轮次编号。",
        steps: [
          "1...3 表示包含 1 和 3 的闭区间。for-in 把区间中的每个数依次赋给本次循环的 round。",
          "朗读每一轮的执行过程。第一轮 round 等于 1，打印后回到循环开头，直到最后一个数处理完毕。",
          "改用 1..<3，观察第三轮是否出现。半开区间保留起点并排除终点。"
        ],
        code: 'for round in 1...3 {\n    print("第 \\(round) 轮练习")\n}',
        output: "第 1 轮练习\n第 2 轮练习\n第 3 轮练习",
        question: "用 1...3 数轮次，第一轮是几？",
        choices: ["1", "0", "3"],
        answer: 0,
        explanation: "1...3 依次给出 1、2、3，所以从第 1 轮开始。"
      }
    ]
  },
  {
    title: "函数与参数",
    english: "Functions",
    summary: "给一段计算取个名字，用参数处理不同输入。",
    level: "进阶",
    lessons: [
      {
        title: "返回计算结果",
        mini: {
          goal: "把分钟换成秒。",
          idea: "把换算步骤取个名字就成了函数，每次给它分钟数，它都能交回秒数。",
          tryIt: "把 seconds(minutes: 3) 里的 3 改成 2，看看结果。"
        },
        intro: "学习记录经常需要把分钟换成秒。把规则写成一个函数，每次调用只要传入新的分钟数。",
        steps: [
          "func 开始函数定义。minutes: Int 指定参数的名字和类型，-> Int 说明函数会交回一个整数。",
          "return 把计算结果交回调用位置。seconds(minutes: 3) 得到 180，然后 print 才把这个数输出。",
          "在示例末尾追加 print(seconds(minutes: 5))。同一个定义可以接受多个不同的输入。"
        ],
        code: 'func seconds(minutes: Int) -> Int {\n    return minutes * 60\n}\n\nlet duration = seconds(minutes: 3)\nprint(duration)',
        output: "180",
        question: "让这个函数算 2 分钟，会得到几秒？",
        choices: ["60", "120", "180"],
        answer: 1,
        explanation: "每分钟有 60 秒，两分钟就是 120 秒。"
      },
      {
        title: "设置参数的默认值",
        mini: {
          goal: "给学习提醒设一个常用时长。",
          idea: "默认值像预先填好的时长，自己填了新时长就用新的。",
          tryIt: "把 minutes: Int = 15 里的 15 改成 10，观察哪条提醒变了。"
        },
        intro: "大多数学习提醒都设为 15 分钟，偶尔需要改成 30 分钟。默认参数能把常用设置写进函数定义。",
        steps: [
          "minutes: Int = 15 给参数设置默认值。调用时省略 minutes，函数就使用 15。",
          "第二次调用显式传入 minutes: 30，Swift 会把这一次传来的值用于拼接提醒。",
          "把默认值改成 20。比较两行输出，找出哪一次调用受到了这个修改的影响。"
        ],
        code: 'func reminder(topic: String, minutes: Int = 15) -> String {\n    return "\\(topic) · \\(minutes) 分钟"\n}\n\nprint(reminder(topic: "阅读"))\nprint(reminder(topic: "练习", minutes: 30))',
        output: "阅读 · 15 分钟\n练习 · 30 分钟",
        question: "常用时长是 15 分钟，这次填了 30，会用多久？",
        choices: ["10 分钟", "15 分钟", "30 分钟"],
        answer: 2,
        explanation: "这次填了 30，就用 30；省略时长时才用默认值。"
      }
    ]
  },
  {
    title: "数组与字典",
    english: "Collections",
    summary: "用数组管理待学列表，用字典查询每门课的时长。",
    level: "进阶",
    lessons: [
      {
        title: "整理有顺序的学习清单",
        mini: {
          goal: "从清单里找出排在第二的主题。",
          idea: "数组给每一项一个位置号，第一项是 0，第二项是 1。",
          tryIt: "把 topics[0] 改成 topics[1]，看看取到了哪个主题。"
        },
        intro: "把待学主题装进一个数组。数组会保留元素的位置，便于你追加新主题或依次读出内容。",
        steps: [
          "方括号中的三个字符串组成一个数组。Swift 的数组下标从 0 开始，因此 topics[0] 对应第一项。",
          "topics 用 var 声明，所以可以调用 append 把新主题加到末尾。count 会给出此时的元素个数。",
          "把 print(topics[0]) 改成 for topic in topics { print(topic) }，逐项打印清单。用下标取值前，确认下标落在有效范围内。"
        ],
        code: 'var topics = ["常量", "循环", "函数"]\ntopics.append("数组")\nprint(topics[0])\nprint(topics.count)',
        output: "常量\n4",
        question: "清单是“常量、循环、函数”，topics[1] 是谁？",
        choices: ["循环", "常量", "函数"],
        answer: 0,
        explanation: "从 0 开始数，位置 1 落在第二项“循环”上。"
      },
      {
        title: "按名称查找，并处理缺失值",
        mini: {
          goal: "按主题名字查出学习时长。",
          idea: "字典把名字和值配成对，查不到名字时可以用 ?? 给一个备用值。",
          tryIt: "把最后一行的“结构体”换成“循环”，看看查到几分钟。"
        },
        intro: "把每个主题对应的练习时长放进字典。一次查询可能找不到键，所以我们还要决定缺失时采用什么值。",
        steps: [
          "字典用键和值建立对应关系。示例中的键是 String，值是 Int，所以整个字典的类型为 [String: Int]。",
          "用方括号和键读取值。查询可能失败，Swift 用 Int? 表示“可能有一个整数，也可能没有值”。",
          "?? 0 会在查询得到 nil 时使用 0。先运行示例，再加上 minutes[\"结构体\"] = 10，放在最后一句之前，比较结果。"
        ],
        code: 'var minutes = ["函数": 15, "循环": 10]\nminutes["数组"] = 20\nprint(minutes["数组"] ?? 0)\nprint(minutes["结构体"] ?? 0)',
        output: "20\n0",
        question: "原来的字典没有“结构体”，写了 ?? 0 会显示几？",
        choices: ["10", "0", "20"],
        answer: 1,
        explanation: "找不到这个名字，就用 ?? 右边的 0。"
      }
    ]
  },
  {
    title: "SwiftUI Mac 实战",
    english: "Build for macOS",
    summary: "把所学用在一个带按钮、能记录练习次数的 Mac 小应用上。",
    level: "实战",
    lessons: [
      {
        title: "搭建第一个 Mac 窗口",
        mini: {
          goal: "把两行文字排进 Mac 窗口。",
          idea: "VStack 让里面的内容从上往下排，就像给两张字条排队。",
          tryIt: "把 spacing: 12 改成 spacing: 24，看两行字离得多远。"
        },
        intro: "从控制台转向真正的应用窗口。你会用 SwiftUI 做一张学习卡片，模板负责启动应用和显示窗口。",
        steps: [
          "在 Xcode 选择 File › New › Project，在模板选择器中选 macOS › App。项目可以取名为 StudyCounter，界面选 SwiftUI，语言选 Swift。若有 Storage 选项，选择 None。",
          "打开 ContentView.swift，以示例替换整个文件。保留模板生成的 App 入口文件，让它继续在 WindowGroup 中展示 ContentView()。",
          "VStack 把两个 Text 纵向排列。spacing 控制两行之间的距离，padding 给内容留出内边距。选择 My Mac，按 ⌘R 查看窗口。",
          "把 spacing 的值改成 24，再运行观察两行文字的间距。"
        ],
        code: 'import SwiftUI\n\nstruct ContentView: View {\n    var body: some View {\n        VStack(spacing: 12) {\n            Text("学习打卡").font(.title)\n            Text("今天从一行代码开始")\n        }\n        .padding(36)\n    }\n}',
        output: "Mac 窗口中，标题“学习打卡”下方显示“今天从一行代码开始”。",
        question: "VStack 会把两行字怎么排？",
        choices: ["左右并排", "叠在一起", "上下排列"],
        answer: 2,
        explanation: "第一行在上，第二行在下。spacing 管它们之间的距离。"
      },
      {
        title: "让按钮更新练习次数",
        mini: {
          goal: "做一个点一下就加一的按钮。",
          idea: "@State 记着窗口里的次数，按钮改变次数时，显示它的文字也会更新。",
          tryIt: "运行后连点两次“完成一次”，看看窗口里的数字。"
        },
        intro: "给上一节的窗口加一个计数器。每按一次按钮，界面就多显示一次练习记录。",
        steps: [
          "在同一项目中，用下方代码替换 ContentView.swift。@State 让 SwiftUI 管理当前视图的 count，初始值为 0。",
          "Button 后面的花括号定义点击动作。count += 1 更新状态，读取 count 的 Text 会随之刷新。",
          "按 ⌘R，连续点击“完成一次”三次，检查计数。退出并重新运行应用，观察它从 0 重新开始。",
          "再添加一个 Button(\"清零\") { count = 0 } 到 VStack 中。交替点击两个按钮，确认它们在修改同一份状态。"
        ],
        code: 'import SwiftUI\n\nstruct ContentView: View {\n    @State private var count = 0\n\n    var body: some View {\n        VStack(spacing: 12) {\n            Text("已练习 \\(count) 次")\n                .font(.title)\n            Button("完成一次") {\n                count += 1\n            }\n        }\n        .padding(36)\n    }\n}',
        output: "启动时显示“已练习 0 次”。连续点击三次后，窗口显示“已练习 3 次”。",
        question: "从 0 开始点两次，会显示几次？",
        choices: ["2 次", "1 次", "3 次"],
        answer: 0,
        explanation: "每次点击加 1，数字从 0 变成 1，再变成 2。"
      }
    ]
  }
];
