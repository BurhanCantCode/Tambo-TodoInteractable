"use client";

import { withInteractable } from "@tambo-ai/react";
import { useState, useEffect } from "react";
import { todoListSchema } from "@/lib/types";

// Base component defined inline
function TodoList({ title, todos, theme = "light" }) {
  const [localTodos, setLocalTodos] = useState(todos);

  useEffect(() => {
    setLocalTodos(todos);
  }, [todos]);

  const toggleTodo = (id) => {
    setLocalTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const CheckIcon = ({ completed }) => (
    <svg 
      className={`w-5 h-5 ${completed ? 'text-green-500' : 'text-gray-400'}`}
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      {completed ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      ) : (
        <circle cx="12" cy="12" r="10" strokeWidth={2} />
      )}
    </svg>
  );

  const themeClasses = {
    light: "bg-white border-gray-200 text-gray-900",
    dark: "bg-gray-900 border-gray-700 text-white",
    blue: "bg-blue-50 border-blue-200 text-blue-900",
  };

  return (
    <div className={`max-w-md mx-auto rounded-xl border-2 p-6 shadow-lg ${themeClasses[theme]}`}>
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      
      <div className="space-y-3">
        {localTodos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📝</div>
            <p>No todos yet</p>
          </div>
        ) : (
          localTodos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-sm ${
                todo.completed 
                  ? 'opacity-60 bg-gray-50 border-gray-200' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className="flex-shrink-0 hover:scale-110 transition-transform"
              >
                <CheckIcon completed={todo.completed} />
              </button>
              
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
              </span>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        {localTodos.filter(t => t.completed).length} of {localTodos.length} completed
      </div>
    </div>
  );
}

// Make it interactable
const InteractableTodoList = withInteractable(TodoList, {
  componentName: "TodoList",
  description: "A todo list that displays tasks with title, todos, and theme",
  propsSchema: todoListSchema,
});

export function TodoDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Todo Dashboard</h1>
        
        <InteractableTodoList
          title="My Tasks"
          todos={[
            { id: "1", text: "Buy groceries", completed: false },
            { id: "2", text: "Walk the dog", completed: true },
            { id: "3", text: "Finish project", completed: false },
          ]}
          theme="light"
        />
        
        <div className="mt-8 text-center text-gray-600">
          <p>Try: "Change title to Work Tasks" or "Make it dark theme"</p>
        </div>
      </div>
    </div>
  );
}
