// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongo from '../../../server/mongo';

export default async function handler(req, res) {
  const db = await mongo();
  const cuisines = db.collection('restaurants');
  const results = await cuisines.distinct("cuisine");
  // console.log(results);
  res.status(200).json(results);
}
