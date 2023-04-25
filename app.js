const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// EJSの設定
app.set("view engine", "ejs");

//サーバーを開始する
app.listen(3000, function () {});

// タスクの配列
const tasks = [
  { id: 1, title: "eeee" },
  { id: 2, title: "eeee2" },
  { id: 3, title: "test3" },
];

//トップページのルーティング
app.get("/", function (req, res) {
  res.render("index", { tasks: tasks });
});

//新しいidを生成する関数
const generateTaskId = () => {
  //タスクが存在しない場合id:1を返す
  if (tasks.length === 0) {
    return 1;
  } else {
    //タスクが存在する場合最後の要素のインデックスを取得
    const lastElement = tasks[tasks.length - 1];
    //最後の要素のidを取得
    const lastId = lastElement.id;

    return lastId + 1;
  }
};

//タスク登録処理
app.post("/create", function (req, res) {
  let task = {};

  task = {
    id: generateTaskId(),
    title: req.body.title,
  };

  tasks.push(task);
  res.redirect("/");
});

//タスク完了処理
app.post("/complete-task", (req, res) => {
  const taskId = req.body.taskId;

  //idが一致する要素のインデックスを取得
  const index = tasks.findIndex((el) => el.id === +taskId);
  //インデックスの要素を削除
  tasks.splice(index, 1);

  res.redirect("/");
});

//タスク編集画面遷移
app.get("/edit/:id", (req, res) => {
  const taskId = req.params.id;
  //idに一致するタスクをfindで取得する
  const task = tasks.find((task) => task.id === +taskId);

  if (task === undefined) {
    //idが一致しない場合indexに遷移
    res.redirect("/");
  }

  res.render("edit", { task: task });
});

//タスク更新処理
app.post("/update/:id", (req, res) => {
  const id = req.params.id;
  const newTitle = req.body.task;

  //更新するタスクIDが一致するまでループ
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === +id) {
      tasks[i].title = newTitle;
      break;
    }
  }

  res.redirect("/");
});
