package com.example.todo;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    private List<String> tasks = new ArrayList<>();

    @GetMapping
    public List<String> getTasks() {
        return tasks;
    }

    @PostMapping
    public List<String> addTask(@RequestParam String task) {
        if (task != null && !task.trim().isEmpty()) {
            tasks.add(task);
        }
        return tasks;
    }

    @DeleteMapping
    public List<String> deleteTask(@RequestParam String task) {
        tasks.remove(task);
        return tasks;
    }
}
