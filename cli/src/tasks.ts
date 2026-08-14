import fs from "node:fs";
import path from "node:path";

export interface TaskInfo {
  id: string;
  filePath: string;
  relativePath: string;
  title: string;
  status: "Planned" | "Active" | "Blocked" | "Done";
  dependsOn: string[];
}

export interface TaskGraphResolution {
  ready: TaskInfo[];
  blocked: { task: TaskInfo; missingDependencies: string[] }[];
  done: TaskInfo[];
  cycles: string[][];
}

export function parseTaskFile(filePath: string, docsRoot = "docs"): TaskInfo | null {
  if (!fs.existsSync(filePath) || !filePath.endsWith(".md") || path.basename(filePath) === "index.md") {
    return null;
  }

  const content = fs.readFileSync(filePath, "utf8");
  const fileName = path.basename(filePath, ".md");
  const idMatch = fileName.match(/^(TASK-\d+)/i) || content.match(/^#\s+(TASK-\d+)/m);
  const id = idMatch ? idMatch[1].toUpperCase() : fileName;

  const titleMatch = content.match(/^#\s+(?:TASK-\d+:\s*)?([^\r\n]+)/m);
  const title = titleMatch ? titleMatch[1].trim() : fileName;

  const statusMatch = content.match(/##\s+Status\s*\r?\n\s*([A-Za-z]+)/i);
  let status: TaskInfo["status"] = "Planned";
  if (statusMatch) {
    const rawStatus = statusMatch[1].toLowerCase();
    if (rawStatus === "done" || rawStatus === "completed") {
      status = "Done";
    } else if (rawStatus === "active" || rawStatus === "in-progress") {
      status = "Active";
    } else if (rawStatus === "blocked") {
      status = "Blocked";
    }
  }

  const dependsOn: string[] = [];

  // Match depends_on: ["TASK-001", "TASK-002"] or depends_on: [TASK-001]
  const yamlDepMatch = content.match(/depends_on:\s*\[([^\]]*)\]/i);
  if (yamlDepMatch) {
    const deps = yamlDepMatch[1]
      .split(",")
      .map((d) => d.trim().replace(/['"]/g, "").toUpperCase())
      .filter(Boolean);
    dependsOn.push(...deps);
  }

  // Match "- Blocking tasks: TASK-001, TASK-002" or "- Depends on: TASK-001"
  const textDepMatches = content.matchAll(/(?:Blocking tasks|Depends on):\s*([^\r\n]+)/gi);
  for (const match of textDepMatches) {
    const deps = match[1]
      .split(/[,;\s]+/)
      .map((d) => d.trim().replace(/['"`]/g, "").toUpperCase())
      .filter((d) => /^TASK-\d+$/i.test(d));
    for (const dep of deps) {
      if (!dependsOn.includes(dep)) {
        dependsOn.push(dep);
      }
    }
  }

  return {
    id,
    filePath,
    relativePath: path.relative(path.resolve(docsRoot, ".."), filePath).replace(/\\/g, "/"),
    title,
    status,
    dependsOn
  };
}

export function loadAllTasks(tasksDir: string): TaskInfo[] {
  if (!fs.existsSync(tasksDir)) {
    return [];
  }

  const tasks: TaskInfo[] = [];
  const entries = fs.readdirSync(tasksDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith(".md") && entry.name !== "index.md") {
      const parsed = parseTaskFile(path.join(tasksDir, entry.name), path.dirname(tasksDir));
      if (parsed) {
        tasks.push(parsed);
      }
    } else if (entry.isDirectory() && entry.name === "done") {
      const doneEntries = fs.readdirSync(path.join(tasksDir, "done"), { withFileTypes: true });
      for (const doneEntry of doneEntries) {
        if (doneEntry.isFile() && doneEntry.name.endsWith(".md") && doneEntry.name !== "index.md") {
          const parsed = parseTaskFile(path.join(tasksDir, "done", doneEntry.name), path.dirname(tasksDir));
          if (parsed) {
            parsed.status = "Done";
            tasks.push(parsed);
          }
        }
      }
    }
  }

  return tasks.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
}

export function detectCycles(tasks: TaskInfo[]): string[][] {
  const taskMap = new Map<string, TaskInfo>(tasks.map((t) => [t.id, t]));
  const cycles: string[][] = [];
  const visited = new Set<string>();
  const inStack = new Set<string>();

  function dfs(currentId: string, currentPath: string[]): void {
    visited.add(currentId);
    inStack.add(currentId);

    const task = taskMap.get(currentId);
    if (task) {
      for (const dep of task.dependsOn) {
        if (!visited.has(dep)) {
          dfs(dep, [...currentPath, dep]);
        } else if (inStack.has(dep)) {
          const cycleStart = currentPath.indexOf(dep);
          cycles.push(cycleStart !== -1 ? [...currentPath.slice(cycleStart), dep] : [...currentPath, dep]);
        }
      }
    }

    inStack.delete(currentId);
  }

  for (const task of tasks) {
    if (!visited.has(task.id)) {
      dfs(task.id, [task.id]);
    }
  }

  return cycles;
}

export function resolveTaskGraph(tasks: TaskInfo[]): TaskGraphResolution {
  const doneIds = new Set(tasks.filter((t) => t.status === "Done").map((t) => t.id));
  const cycles = detectCycles(tasks);

  const ready: TaskInfo[] = [];
  const blocked: { task: TaskInfo; missingDependencies: string[] }[] = [];
  const done: TaskInfo[] = [];

  for (const task of tasks) {
    if (task.status === "Done") {
      done.push(task);
      continue;
    }

    const missing = task.dependsOn.filter((dep) => !doneIds.has(dep));
    if (missing.length === 0) {
      ready.push(task);
    } else {
      blocked.push({ task, missingDependencies: missing });
    }
  }

  return { ready, blocked, done, cycles };
}

export function formatTaskGraph(resolution: TaskGraphResolution): string {
  const lines: string[] = ["AIOS Task Dependency Graph:", ""];

  if (resolution.cycles.length > 0) {
    lines.push("⚠️ WARNING: Circular dependencies detected:");
    for (const cycle of resolution.cycles) {
      lines.push(`  - ${cycle.join(" -> ")}`);
    }
    lines.push("");
  }

  lines.push(`Ready for Execution (${resolution.ready.length}):`);
  if (resolution.ready.length === 0) {
    lines.push("  - None");
  } else {
    for (const t of resolution.ready) {
      const deps = t.dependsOn.length > 0 ? ` (depends on: ${t.dependsOn.join(", ")})` : "";
      lines.push(`  - [${t.id}] ${t.title} [Status: ${t.status}]${deps}`);
    }
  }

  lines.push("", `Blocked on Prerequisites (${resolution.blocked.length}):`);
  if (resolution.blocked.length === 0) {
    lines.push("  - None");
  } else {
    for (const b of resolution.blocked) {
      lines.push(`  - [${b.task.id}] ${b.task.title} (waiting on: ${b.missingDependencies.join(", ")})`);
    }
  }

  lines.push("", `Completed (${resolution.done.length}):`);
  if (resolution.done.length === 0) {
    lines.push("  - None");
  } else {
    for (const d of resolution.done) {
      lines.push(`  - [${d.id}] ${d.title}`);
    }
  }

  return lines.join("\n");
}
