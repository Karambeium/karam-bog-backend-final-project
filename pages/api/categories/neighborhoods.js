// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongo from '../../../server/mongo';

export default async function handler(req, res) {
  const db = await mongo();
  const neighborhoods = db.collection('neighborhoods')
  const results = await neighborhoods.distinct("name");
  res.status(200).json(results);
}
