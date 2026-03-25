import api from "@/lib/api";

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

interface TasksResponse {
  success: boolean;
  message: string;
  data: Task[];
  statusCode: number;
}

interface TaskResponse {
  success: boolean;
  message: string;
  data: Task;
  statusCode: number;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  status?: "todo" | "in-progress" | "done";
  priority?: "low" | "medium" | "high";
}


export const getTasks = async () => {
  const { data } = await api.get<TasksResponse>("/api/tasks");
  return data.data;
};

export const getTask = async (id: string) => {
  const { data } = await api.get<TaskResponse>(`/api/tasks/${id}`);
  return data.data;
};

export const createTask = async (payload: CreateTaskPayload) => {
  const { data } = await api.post<TaskResponse>("/api/tasks", payload);
  return data.data;
};

export const updateTask = async ({
  id,
  ...payload
}: UpdateTaskPayload & { id: string }) => {
  const { data } = await api.put<TaskResponse>(`/api/tasks/${id}`, payload);
  return data.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/api/tasks/${id}`);
};
