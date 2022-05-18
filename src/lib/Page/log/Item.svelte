<script lang="ts">
  import dayjs from "dayjs";
import type { LogEntry } from "../../../ts/logs/main";

 import "../../../css/page/logitem.css"

  export let data: LogEntry;
</script>

<div class="logentry">
  <div class="timestamp">{dayjs(data.timestamp).format("HH:mm:ss.SSS")}</div>
  <div class="module">{data.caller}</div>
  <div class="category">{data.category}</div>
  <div class="message">{data.message}</div>
</div>
