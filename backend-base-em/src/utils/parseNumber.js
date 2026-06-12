function parseNumber(value) {
  if (value === null || value === undefined) return null;

  return Number(String(value).replace(',', '.'));
}

module.exports = parseNumber;