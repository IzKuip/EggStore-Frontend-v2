export interface EggEntry {
  amount: string | number;
  id: number;
  registrar: string;
  timestamp: number;
}

export function sortByKey(obj: object) {
  let keys = Object.keys(obj);
  keys.sort();
  let sorted = {};
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    sorted[key] = obj[key];
  }
  return sorted;
}
