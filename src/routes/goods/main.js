/**
 * goods > main
 * Router: /goods
 */

// Import module
const express = require('express');
const router = express.Router();
const sqlite = require('../../modules/sqlite.js');

// Middleware
router.use((req, res, next) => {
  next();
})

// Methods
router.get("/", viewIndex);
router.get("/items/:page", doGetGoodsData);
router.get("/view/:goodsId", viewGoodsDetails);

// SQL Collect Goods Data
// idが高齢順
const SelectGDByNewArrivals = (limit = [0, 4]) => {
  return `SELECT GD.id, GD.name, GD.description, goods_image.file, sellings.price FROM goods AS GD 
    JOIN goods_image ON goods_image.goods_id = GD.id
    JOIN sellings ON sellings.goods_id = GD.id
    GROUP BY goods_image.goods_id
    ORDER BY GD.id DESC LIMIT ${limit[0]}, ${limit[1]}`;
}

// purchaseで購入された個数が多い順、購入個数が0のアイテムはidが高齢順
const SelectGDByLanking = (limit = [0, 4]) => {
  return `SELECT GD.id, GD.name, GD.description, goods_image.file, sellings.price FROM goods AS GD 
    JOIN goods_image ON goods_image.goods_id = GD.id
    JOIN sellings ON sellings.goods_id = GD.id
    LEFT JOIN (SELECT goods_id, sum(amount) AS amountit FROM purchase
        GROUP BY goods_id
        ORDER BY amountit DESC
      ) AS LANKING ON LANKING.goods_id = GD.id
    GROUP BY goods_image.goods_id
    ORDER BY amountit DESC, GD.id DESC
    ${limit[0]}, ${limit[1]}`;
}

const

function viewIndex(req, res) {
  const db = sqlite.init(sqlite.LS.GD);
    
  db.all(SelectGDByNewArrivals([0, 30]), [], (err, newArrivalsArray) => {
    db.close();

    if (err) {
      console.error(err);
      return res.redirect("/");
    }
    
    res.render('goods/index.ejs');

  });
}

function doGetGoodsData(req, res) {
  const page = req.params.page;
  const db = sqlite.init(sqlite.LS.GD);
    
  db.all(SelectGDByNewArrivals([(page-1)*20, page*20]), [], (err, newArrivalsArray) => {
    db.close();

    if (err) {
      return console.error(err);
    }
    
    res.json(newArrivalsArray);
  });

}

function viewGoodsDetails(req, res) {
  const goodsId = req.params.goodsId;

  const query = `SELECT name, description, promotion, selling_id, price, stock_amount FROM goods
    INNER JOIN sellings ON sellings.goods_id = goods.id
    WHERE goods.id = ?`;
  db.all(SelectGDByNewArrivals([(page-1)*20, page*20]), [], (err, newArrivalsArray) => {
    db.close();

    if (err) {
      return console.error(err);
    }
    
    res.json(newArrivalsArray);
  });
  res.render("goods/goodsdetails.ejs", {
    GoodsId: goodsId,
    HdrRootTagHTML: `<a href="/goods">Goods</a>`,
    HdrTagHTML: `<a href="/goods/view/${goodsId}">${goodsId}</a>`
  });
}

module.exports = router;