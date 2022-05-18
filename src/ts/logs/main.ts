import { get, writable } from "svelte/store";

export function log(caller: string, category: string, message: string) {
  const timestamp = new Date().getTime();
  const log = get(systemLog);

  const data: LogEntry = {
    timestamp,
    category,
    caller,
    message,
  };

  log.push(data);

  systemLog.set(log);

  console.log(get(systemLog))
}

export const systemLog = writable<LogEntry[]>([]);

export interface LogEntry {
  timestamp: number;
  category: string;
  caller: string;
  message: string;
}
