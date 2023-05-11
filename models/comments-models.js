const db = require("../db/connection");
const format = require("pg-format");

exports.selectCommentsByArticleId = async (id) => {
  const { rows } = await db.query(
    `SELECT * FROM comments WHERE article_id=$1 ORDER BY created_at DESC`,
    [id]
  );
  if (rows.length === 0)
    return Promise.reject({
      code: 404,
      msg: "Please enter a valid Article ID. Go back and try again.",
    });

  return rows;
};

// exports.selectCommentsByArticleId = (id) => {
//   return db
//     .query(`SELECT * FROM comments WHERE article_id=$1`, [id])
//     .then(({ rows }) => {
//       if (rows.length === 0) {
//         return Promise.reject({
//           code: 404,
//           msg: "Please enter a valid Article ID. Go back and try again.",
//         });
//       } else return rows[0];
//     });
// };

exports.insertComment = async ({ author, body }, id) => {
  if (!author || !body) {
    return Promise.reject({ code: 400, msg: "No comment submitted" });
  }
  const { rows } = await db.query(
    `INSERT INTO comments (article_id,author,body) VALUES ($1, $2, $3) RETURNING *`,
    [id, author, body]
  );
  return rows[0];
};

exports.deleteCommentById = async (id) => {
  const { rows } = await db.query(
    `DELETE FROM comments WHERE comment_id=$1 RETURNING *`,
    [id]
  );
  if (rows.length === 0)
    return Promise.reject({
      code: 404,
      msg: "Comment doesn't exist!",
    });
};
