const parseNumber = require('../utils/parseNumber');

class LeituraRequestDTO {
  constructor(data) {
    this.station_id = data.station_id;
    this.timestamp = data.timestamp;
    this.temperature_c = parseNumber(data.temperature_c);
    this.humidity_pct = parseNumber(data.humidity_pct);
  }
}

module.exports = LeituraRequestDTO;