const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// EJSの設定
app.set("view engine", "ejs");

//トップページへのルーティング
app.get("/", function (req, res) {
  res.render("index", { tasks: tasks });
});

//サーバーを開始する
app.listen(3000, function () {});

// タスクの配列
const tasks = [
  { id: 1, title: "eeee" },
  { id: 2, title: "eeee2" },
  { id: 3, title: "test3" },
];

//タスク登録へのルーティング
app.post("/create-task", function (req, res) {
  let task = {};
  //タスクが未登録の場合1を登録
  if (tasks.length === 0) {
    task = {
      id: 1,
      title: req.body.title,
    };
  } else {
    //タスクが存在する場合最後の要素を取得
    const lastElement = tasks[tasks.length - 1];
    //最後の要素のidを取得
    const lastId = lastElement.id;
    task = {
      id: lastId + 1,
      title: req.body.title,
    };
  }

  tasks.push(task);
  console.log(tasks);
  res.render("index", { tasks: tasks });
});

//完了機能
app.post("/complete-task", (req, res) => {
  const taskId = req.body.taskId;

  //idが一致する要素のインデックスを取得
  const index = tasks.findIndex((el) => el.id === +taskId);
  //インデックスの要素を削除
  tasks.splice(index, 1);

  res.render("index", { tasks: tasks });
});

app.put("update-task");
