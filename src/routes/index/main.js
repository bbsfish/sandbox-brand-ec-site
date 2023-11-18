/**
 * index > main
 * Router: /
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
router.get("/about", viewAbout);

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
    ORDER BY amountit DESC, GD.id DESC LIMIT ${limit[0]}, ${limit[1]}`;
}

function viewIndex(req, res) {
  const db = sqlite.init(sqlite.LS.GD);
    
  try {
    db.serialize(() => {
      let newArrivalsArray = [];
      let lankingArray = [];
  
      db.all(SelectGDByNewArrivals(), [], (err, rows) => {
        if (err) throw err;
        newArrivalsArray = rows;
      });
  
      db.all(SelectGDByLanking(), [], (err, rows) => {
        if (err) throw err;
        lankingArray = rows;

        res.render('index/index.ejs', {
          NewArrivals: newArrivalsArray,
          Lanking: lankingArray
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
}

function viewAbout(req, res) {
  res.render('index/about.ejs', {
    MainHTML: "about.ejs"
  });
}

module.exports = router;