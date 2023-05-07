import path from "path";
import fs from "fs";
import Player from "./components/Player";

async function getData() {
  const itemFolder = path.join(process.cwd(), "public", "items");
  const items = fs.readdirSync(itemFolder);

  return { count: items.length, ids: items.map(Number) };
}

export default async function Page() {
  const data = await getData();

  return (
    <main>
      <pre>{JSON.stringify(data)}</pre>
      <Player x={4} />
    </main>
  );
}
