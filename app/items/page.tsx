import fs from "fs";
import path from "path";
import { Item } from "@/app/components/types";
import Player from "@/app/components/Player";

async function getData(): Promise<{ count: number; items: Item[] }> {
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
  const data = await getData();
  return (
    <>
      {data.items.map((item) => (
        <>
          <div>{item.title}</div>
          <div>{item.id}</div>
          <Player id={item.id} />
        </>
      ))}
    </>
  );
};

export default Items;
