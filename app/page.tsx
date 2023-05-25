import path from "path";
import fs from "fs";
import Link from "next/link";

async function getData() {
  const itemFolder = path.join(process.cwd(), "public", "items");
  const items = fs.readdirSync(itemFolder);

  return { count: items.length, ids: items.map(Number) };
}

export default async function Page() {
  const data = await getData();

  return (
    <main>
      <div className="container mx-auto mt-5">
        <div className="text-7xl w-1/2 mx-auto text-center">Welcome</div>
        <div className="text-xl w-1/2 mt-10 mx-auto text-center">
          This is my page to preview my 3d printed models with their video
          animations and 3d-viewable preview
        </div>
        <Link
          className="border-gray-50 border-2 rounded p-3 text-3xl mx-auto block w-1/3 text-center mt-20"
          href="/items"
        >
          Continue
        </Link>
      </div>
    </main>
  );
}
