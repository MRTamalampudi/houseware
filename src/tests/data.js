
export const todos = [
    {
        "id": 37,
        "title": "Meet dhoni",
        "completed": false
    },
    {
        "id": 38,
        "title": "Go to the gym",
        "completed": true
    },
    {
        "id": 39,
        "title": "Buy groceries",
        "completed": false
    },
    {
        "id": 40,
        "title": "Read a book",
        "completed": true
    },
    {
        "id": 41,
        "title": "Call mom",
        "completed": false
    }
]

export const activeTodos = todos.filter(todo=> !todo.completed)
export const completedTodos = todos.filter(todo => todo.completed)