import fs from "fs";
import path from "path";

import { Item } from "@/app/components/types";
import Player from "@/app/components/Player";

interface IItem {
  params: {
    id: string;
  };
}

function getItem(id: string): Item | undefined {
  const itemFolder = path.join(process.cwd(), "public", "items");
  const itemDataJson = `${itemFolder}/${id}/data.json`;
  if (!fs.existsSync(itemDataJson)) {
    return undefined;
  }
  const metadataContent = fs.readFileSync(itemDataJson, "utf8");
  const metadata: Omit<Item, "id"> = JSON.parse(metadataContent);

  return {
    id: Number(id),
    title: metadata.title,
  };
}

const ItemPage = ({ params: { id } }: IItem) => {
  const item = getItem(id);
  return (
    <div>
      {item ? (
        <div key={`item-line-${item.id}`} className="my-2 p-2">
          <div className="text-yellow-200 text-xs">#{item.id}</div>
          <div className="text-green-400 text-xl">{item.title}</div>
          <div className="my-2">
            <Player id={item.id} className="mx-auto" />
          </div>
        </div>
      ) : (
        "404 not found"
      )}
    </div>
  );
};

export default ItemPage;
