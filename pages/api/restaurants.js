// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongo from '../../server/mongo'

export default async function handler(req, res) {
  const db = await mongo()
  const restaurants = db.collection('restaurants');
  const params = req.query;
  let results = [];
  let cuisineFilter = "";
  let boroughFilter = "";
  let sortOrder = "";
  let sortValue;
  let page;
  let pageSize;
  if ((Object.keys(params)[0] === "cuisine") && (Object.keys(params)[1] === "borough")) {
      cuisineFilter = Object.values(params)[0];
      boroughFilter = Object.values(params)[1];
      console.log(cuisineFilter);
      console.log(boroughFilter);
      results = await restaurants.find({ "borough" : boroughFilter, "cuisine" : cuisineFilter
      }).limit(10).toArray();
  } else if (Object.keys(params)[0] === "sort_by") {
      console.log(Object.values(params));
      sortOrder = Object.values(params)[0];
      console.log(sortOrder);
      let sortArray = sortOrder.split(".");
      console.log(sortArray);
      sortOrder = sortArray[1];
        if (sortOrder === "asc") {
          sortValue = 1;
        } else if (sortOrder === "desc") {
          sortValue = -1;
        }
      console.log(sortOrder);
      console.log(sortValue);
      results = await restaurants.aggregate(
        // [
        //   { "$sort" : { "grades" : sortValue}}
        // ]
      ).limit(10).toArray();
      // results = await restaurants.find().sort({"grades" : sortValue}).limit(10).toArray();
  } else if ((Object.keys(params)[0] === "page") && (Object.keys(params)[1] === "page-size")) {
      page = parseInt(Object.values(params)[0]);
      pageSize = parseInt(Object.values(params)[1]);
      results = await restaurants.find().skip(page * pageSize).limit(pageSize).toArray();
  } else {
      results = await restaurants.find().limit(10).toArray();
  }
  console.log(results);
  // { $filter: { input: results, as: "result", cond: result } }
  res.status(200).json(results);
}
