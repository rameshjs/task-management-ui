import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PlusIcon, LogOutIcon, Loader2Icon } from "lucide-react";

import { useAuth } from "@/context/auth-context";
import { getTasks, createTask, updateTask, deleteTask, type Task } from "@/api/tasks";
import { Button } from "@/components/ui/button";
import { TaskTable } from "@/components/tasks/task-table";
import { getTaskColumns } from "@/components/tasks/task-columns";
import { CreateTaskModal } from "@/components/tasks/create-task-modal";
import { EditTaskModal } from "@/components/tasks/edit-task-modal";
import { DeleteTaskModal } from "@/components/tasks/delete-task-modal";

type ModalState =
  | { type: "closed" }
  | { type: "create" }
  | { type: "edit"; task: Task }
  | { type: "delete"; task: Task };

export default function DashboardPage() {
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState<ModalState>({ type: "closed" });

  const closeModal = () => setModal({ type: "closed" });

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      closeModal();
      toast.success("Task created");
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      closeModal();
      toast.success("Task updated");
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      closeModal();
      toast.success("Task deleted");
    },
    onError: (err) => toast.error(err.message),
  });

  const columns = useMemo(
    () =>
      getTaskColumns({
        onEdit: (task) => setModal({ type: "edit", task }),
        onDelete: (task) => setModal({ type: "delete", task }),
      }),
    [],
  );

  return (
    <div className="mx-auto flex min-h-svh max-w-5xl flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => setModal({ type: "create" })}>
            <PlusIcon />
            New Task
          </Button>
          <Button variant="ghost" size="icon" onClick={logout}>
            <LogOutIcon />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-muted-foreground">
          <p>No tasks yet.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setModal({ type: "create" })}
          >
            <PlusIcon />
            Create your first task
          </Button>
        </div>
      ) : (
        <TaskTable data={tasks} columns={columns} />
      )}

      {modal.type === "create" && (
        <CreateTaskModal
          isPending={createMutation.isPending}
          onClose={closeModal}
          onSubmit={(values) => createMutation.mutate(values)}
        />
      )}

      {modal.type === "edit" && (
        <EditTaskModal
          task={modal.task}
          isPending={updateMutation.isPending}
          onClose={closeModal}
          onSubmit={(values) =>
            updateMutation.mutate({ id: modal.task._id, ...values })
          }
        />
      )}

      {modal.type === "delete" && (
        <DeleteTaskModal
          task={modal.task}
          isPending={deleteMutation.isPending}
          onClose={closeModal}
          onConfirm={() => deleteMutation.mutate(modal.task._id)}
        />
      )}
    </div>
  );
}
