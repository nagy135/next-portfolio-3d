import fs from "fs";
import path from "path";
import { Item } from "@/app/components/types";
import Player from "@/app/components/Player";

async function getItems(): Promise<{ count: number; items: Item[] }> {
  const itemFolder = path.join(process.cwd(), "public", "items");
  const items = fs.readdirSync(itemFolder);

  return {
    count: items.length,
    items: items.map((strId) => {
      const itemDataJson = `${itemFolder}/${strId}/data.json`;
      let title = "unknown";
      if (fs.existsSync(itemDataJson)) {
        // OPTIM: possible to make this parallel
        const metadataContent = fs.readFileSync(itemDataJson, "utf8");
        const metadata: Omit<Item, "id"> = JSON.parse(metadataContent);
        title = metadata.title;
      }
      return {
        id: Number(strId),
        title,
      };
    }),
  };
}

const Items = async () => {
  const data = await getItems();
  return (
    <div className="container mx-auto">
      {data.items.map((item) => (
        <div
          key={`item-line-${item.id}`}
          className="my-2 p-2 border-b-2 border-slate-500"
        >
          <div className="text-yellow-200 text-xs">#{item.id}</div>
          <div className="text-green-400 text-xl">{item.title}</div>
          <div className="my-2">
            <Player id={item.id} className="mx-auto" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;
