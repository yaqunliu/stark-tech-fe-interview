"use client";

import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Stack,
  Divider,
  TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextFieldsIcon from '@mui/icons-material/TextFields';
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LinkIcon from '@mui/icons-material/Link';
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ThemeProvider } from "@mui/material/styles";
import { formatDisplayDate } from "@/lib/utils";
import TaskDueDate from "@/components/TaskDueDate";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Root, Card, Header, NewButton, Toolbar, StyledTableContainer, TaskTitleCell, DateCell, NewTaskRow, theme, IconSortButton } from './pageStyle'
import SortMenu, { SortField } from "@/components/SortMenu";
import StatusMenu, { StatusField } from '@/components/StatusMenu';

type Task = {
  id: number;
  title: string;
  dueDate?: string;
  createdAt: string;
  completed: boolean;
  order: number;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refresh, setRefresh] = useState(Date.now());
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [taskStatus, setTaskStatus] = useState<StatusField>('active')
  const [placeholderRows, setPlaceholderRows] = useState<number>(1);

  async function fetchTasksFromApi() {
    const params = new URLSearchParams({
      sortBy: sortField,
      status: taskStatus
    });
    const res = await fetch(`/api/todos?${params.toString()}`);
    const {data} = await res.json();
    setTasks(data?.items || []);
  }

  useEffect(() => {
    fetchTasksFromApi();
  }, [refresh, sortField, taskStatus]);

  const handleCreateTask = async () => {
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title: ' '}),
      });
  
      if (!res.ok) throw new Error('Create failed');
      const data = await res.json()
  
      setPlaceholderRows((count) => Math.max(1, count - 1));
      setRefresh(Date.now());
      setEditingTaskId(data?.data?.id);
      setEditingTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTaskPlaceholder = () => {
    setPlaceholderRows((count) => count + 1);
  };

  // 完成任务
  const handleCompleteTask = async (id: number) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: true }),
    });
    if (res.ok) {
      setRefresh(Date.now());
    }
  };

  // 更新任务dueDate
  const handleDueDateChange = async (id: number, newDate: Date | null) => {
    const iso = newDate ? newDate.toISOString() : undefined;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              dueDate: iso,
            }
          : t
      )
    );
    const res = await fetch(`/api/todos/${id}`, { method: "PATCH", body: JSON.stringify({ dueDate: iso }) })
    if (res.ok) {
      setRefresh(Date.now());
    } else {
     // toast.error("Failed to update due date");
    }
  };
  // 更新任务名称
  const handleTitleSave = async (id: number, newTitle: string) => {
    const title = newTitle.trim();
    if (!title) {
      setEditingTaskId(null);
      setEditingTitle("");
      return;
    }
    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
       setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                title,
              }
            : t
        )
      );
      setRefresh(Date.now());
    } else {
      setRefresh(Date.now());
    }
    setEditingTaskId(null);
    setEditingTitle("");
  };

  // 处理排序
  const handleSortFieldChange = (field: SortField) => {
    setSortField(field);
  };
  
  // 处理筛选
  const handleStatusFieldChange = (field: StatusField) => {
    setTaskStatus(field)
  }

  return (
    <ThemeProvider theme={theme}>
       <LocalizationProvider
        dateAdapter={AdapterDateFns}
      >
        <Root>
          <Card>
            <Header>
              <Typography variant="h6" sx={{ fontWeight: 600, p: 2 }}>
                Tasks
              </Typography>
              <Divider  sx={{ borderColor: "#444", mx: 1 }}  variant="middle" />
              <Toolbar sx={{ ml: 2 }}>
                <NewButton
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleCreateTaskPlaceholder}
                  >
                    New Task
                  </NewButton>
                  <StatusMenu value={taskStatus} onChange={handleStatusFieldChange} />
                  <SortMenu value={sortField} onChange={handleSortFieldChange} />
              </Toolbar>
            </Header>

            <StyledTableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TaskTitleCell sx={{ width: "50%" }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <SortByAlphaIcon fontSize="small" sx={{ color: "#bdbdbd" }} />
                        <Typography variant="body2">Task Title</Typography>
                      </Stack>
                    </TaskTitleCell>
                    <DateCell>
                      <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-start">
                        <CalendarTodayOutlinedIcon fontSize="small" sx={{ color: "#bdbdbd" }} />
                        <Typography variant="body2">Due Date</Typography>
                      </Stack>
                   </DateCell>
                   <DateCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <EventNoteIcon fontSize="small" sx={{ color: "#bdbdbd" }} />
                      <Typography variant="body2">Created at</Typography>
                    </Stack>
                   </DateCell>
                   <DateCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <LinkIcon fontSize="small" sx={{ color: "#bdbdbd", transform: 'rotate(-45deg)' }} />
                      <Typography variant="body2">Task ID</Typography>
                    </Stack>
                   </DateCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id} hover>
                      <TaskTitleCell
                        onClick={() => {
                          setEditingTaskId(task.id);
                          setEditingTitle(task.title);
                        }}
                        sx={{ cursor: "pointer" }}
                      >
                        <Stack direction="row" spacing={1} alignItems="center">
                          {task.completed ? (
                            <CheckCircleIcon
                              fontSize="small"
                              sx={{ color: "green" }}
                              onClick={(e) => {
                                e.stopPropagation(); // 阻止触发单元格的 onClick
                                handleCompleteTask(task.id);
                              }}
                            />
                          ) : (
                            <RadioButtonUncheckedIcon
                              fontSize="small"
                              sx={{ color: "#bdbdbd", cursor: "pointer" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCompleteTask(task.id);
                              }}
                            />
                          )}

                          {editingTaskId === task.id ? (
                            <TextField
                              variant="standard"
                              value={editingTitle}
                              autoFocus
                              onChange={(e) => setEditingTitle(e.target.value)}
                              onBlur={() => {
                                setEditingTaskId(null);
                                setEditingTitle("");
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleTitleSave(task.id, editingTitle);
                                }
                              }}
                              InputProps={{
                                sx: {
                                  color: "#f5f5f5",
                                  fontSize: 14,
                                },
                              }}
                              fullWidth
                            />
                          ) : (
                            <Typography variant="body2">{task.title}</Typography>
                          )}
                        </Stack>
                      </TaskTitleCell>

                      <DateCell>
                        <TaskDueDate
                          value={task.dueDate}
                          onChange={(newVal) => handleDueDateChange(task.id, newVal)}
                        />
                      </DateCell>
                      <DateCell>{formatDisplayDate(task.createdAt)}</DateCell>
                      <DateCell>{task.order}</DateCell>
                    </TableRow>
                  ))}
                  {Array.from({ length: placeholderRows }, (_, idx) => (
                    <NewTaskRow key={`placeholder-${idx}`}>
                      <TaskTitleCell colSpan={4}>
                        <Stack direction="row" spacing={1} alignItems="center"  onClick={handleCreateTask} sx={{ cursor: 'pointer'}}>
                          <Typography variant="body2" sx={{ color: "#777", fontStyle: "italic", pl: theme.spacing(3)}}>
                            New Task
                          </Typography>
                        </Stack>
                      </TaskTitleCell>
                    </NewTaskRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          </Card>
        </Root>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
