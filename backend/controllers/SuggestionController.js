const fs = require('fs');
const path = require('path');
const csv = require('csv-parser'); // Make sure to install with: npm i csv-parser

const rulesPath = path.join(__dirname, '../data/tour_association_rules.csv');

exports.getSuggestions = async (req, res) => {
  const { tourName } = req.params;
  const suggestions = new Set();

  fs.createReadStream(rulesPath)
    .pipe(csv())
    .on('data', (row) => {
      try {
        const antecedents = row.antecedents.split(',').map(item => item.trim());
        const consequents = JSON.parse(row.consequents);
        if (antecedents.includes(tourName)) {
          consequents.forEach(t => suggestions.add(t));
        }
      } catch (err) {
        console.error('Parse error:', err);
      }
    })
    .on('end', () => {
      res.json(Array.from(suggestions));
    });
};
