import { useState } from "react";

type Todo = {
  id: number,
  task: string,
  checked: boolean
};

type Todos = Todo[];

function App() {
  const [idCounter, setIdCounter] = useState(0);
  const [todos, setTodo] = useState<Todos>([]);

  /**
   * フォーム送信したらtodo配列にtodoを追加
   * @param {EventReact.FormEvent<HTMLFormElement>} e 送信イベント
   */
  const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputText = e.currentTarget["task"].value;
    const nextid = idCounter + 1;
    setIdCounter(nextid);
    setTodo([...todos, { id: nextid, task: inputText, checked: false }]);
    e.currentTarget["task"].value = '';
  };

  /**
   * 指定idをtodo配列から取り除く
   * @param {number} id
   */
  const handleClickDeleteButton = (id :number) => {
    setTodo(todos.filter((todo: Todo) => todo.id !== id));
  };

  /**
   * TODOのチェックボックスがクリックされたら該当の checked フラグを toggle する
   * @param {number} id
   */
  const handleChangeCheckBox = (id: number) => {
    const changedTodos = todos.map((todo: Todo) => {
      if (todo.id === id) {
        return { ...todo, checked: !todo.checked };
      }
      return todo;
    });
    setTodo(changedTodos);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input name="task" />
        <button>登録</button>
      </form>
      <div>
        {todos.map((todo: Todo) => (
          <div key={todo.id} className={todo.checked ? "checked" : ""}>
            <input
              type="checkbox"
              onChange={() => handleChangeCheckBox(todo.id)}
            />
            {todo.task}
            <button onClick={() => handleClickDeleteButton(todo.id)}>
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;