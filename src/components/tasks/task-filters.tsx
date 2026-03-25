import { SearchIcon, XIcon } from "lucide-react";
import { type TaskFilters } from "@/api/tasks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TaskFiltersBar({
  filters,
  onChange,
}: {
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
}) {
  const hasFilters =
    !!filters.search ||
    (filters.status && filters.status !== "all") ||
    (filters.priority && filters.priority !== "all");

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          className="pl-9"
          value={filters.search ?? ""}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
      </div>
      <Select
        value={filters.status ?? "all"}
        onValueChange={(v) =>
          onChange({ ...filters, status: v as TaskFilters["status"] })
        }
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="todo">Todo</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="done">Done</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={filters.priority ?? "all"}
        onValueChange={(v) =>
          onChange({ ...filters, priority: v as TaskFilters["priority"] })
        }
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priority</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
      {hasFilters && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onChange({ search: "", status: "all", priority: "all" })}
        >
          <XIcon />
        </Button>
      )}
    </div>
  );
}
