import { useState } from "react";
function TodoList() {
  const [todos, setTodos] = useState([
    {
        id: 1,
        text: '检查域名是否打开',
        completed: false
    },{
        id: 2,
        text: '检查论坛资料有没有更新，正常，工整',
        completed: false
    },{
        id: 3,
        text: '检查屏蔽，被墙。。',
        completed: false
    },{
        id: 4,
        text: '检查4978.49365.。是否打开图片有没有更新',
        completed: false
    },{
        id: 5,
        text: '要公开资料记得公开上去',
        completed: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  
  // Các hàm xử lý: addTodo, toggleTodo, deleteTodo
  const addTodo = () => {
    if(inputValue.trim() !== ''){
        const newTodo = {
        id: Date.now(), // Dùng timestamp làm ID (đảm bảo unique)
        text: inputValue.trim(), // Nội dung todo
        completed: false // Ban đầu chưa hoàn thành
        }
    

    setTodos([...todos,newTodo]);

    // Reset input về rỗng sau khi thêm
    setInputValue('');
    };
  }

  // Hàm đánh dấu todo là hoàn thành/chưa hoàn thành
  const toggleTodo = (id) =>{
    setTodos(todos.map(todo => {
        if(todo.id === id){
            return {...todo, completed: !todo.completed};
        }
        return todo;
    }));
  }

  // Hàm xóa todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

 // Hàm xử lý khi nhấn phím Enter trong input
 const handleKeyPress = (e) =>{
    if(e.key === 'Enter'){
        addTodo();
    }
 }

 return(
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-600">每天工作</h1>
        <div className="flex mb-6">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="工作要加"
                className="flex-1 px-4 py-6 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></input>
             <button
                onClick={addTodo}
                className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-200"
            >
                加
            </button>
        </div>
        <ul className="space-y-3">
            {todos.map(todo =>(
                <li
                key={todo.id} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
                >
                    <span className={`flex-1 cursor-pointer ${
                todo.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-800'
              }`}
              onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
               <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
            >
              删除
            </button>
                </li>
            ))}
        </ul>
      <div className="mt-4 text-sm text-gray-600">
        总计: {todos.length} | 
        完成: {todos.filter(todo => todo.completed).length} |
        没做好: {todos.filter(todo => !todo.completed).length}
      </div>
    </div>
 );
}

export default TodoList;