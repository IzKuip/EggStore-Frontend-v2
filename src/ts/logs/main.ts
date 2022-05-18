import { get, writable } from "svelte/store";

export function log(caller: string, title: string, message: string) {
  const timestamp = new Date().getTime();
  const log = get(systemLog);

  const data: LogEntry = {
    timestamp,
    title,
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
  title: string;
  caller: string;
  message: string;
}
