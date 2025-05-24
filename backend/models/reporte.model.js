const db = require('../config/db');

const obtenerResumenPilas = (callback) => {
  const sql = 'SELECT * FROM resumen_pilas';
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  obtenerResumenPilas
};
