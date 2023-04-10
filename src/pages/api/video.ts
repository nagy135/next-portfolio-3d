import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import * as z from 'zod';


const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/),
});

type IdParam = z.infer<typeof idParamSchema>;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Make sure the request method is GET
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    // Validate the request query using Zod
    const { id } = idParamSchema.parse(req.query) as IdParam;
    const videoFilePath = path.join(process.cwd(), 'public', 'videos', `${id}.mp4`);

    // Check if the video file exists
    if (!fs.existsSync(videoFilePath)) {
      res.status(404).json({ message: 'Video not found' });
      return;
    }

    // Set the content type header to "video/mp4"
    res.setHeader('Content-Type', 'video/mp4');

    // Create a read stream from the video file and pipe it to the response
    const stream = fs.createReadStream(videoFilePath);
    stream.pipe(res);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.issues[0].message });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
