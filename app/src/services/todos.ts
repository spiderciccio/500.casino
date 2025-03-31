export interface ToDo {
  _id: number;
  text: string;
  complete: boolean;
  createdAt: string;
}

const API_URL = import.meta.env.VITE_API_URL

export const get = (): Promise<ToDo[]> => fetch(`${API_URL}/todos`).then((res) => res.json());

export const add = (text: string): Promise<ToDo> => fetch(`${API_URL}/todos`, {
  method: "POST",
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text })
}).then((res) => res.json());

export const update = (todo: ToDo): Promise<ToDo> => fetch(`${API_URL}/todos/${todo._id}`, {
  method: "PATCH",
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ complete: todo.complete })
}).then((res) => res.json());
