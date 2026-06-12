class LeituraResponseDTO {
  constructor(leitura) {
    this.id = leitura.id;
    this.station_id = leitura.station_id;
    this.timestamp = leitura.timestamp;
    this.temperature_c = leitura.temperature_c;
    this.humidity_pct = leitura.humidity_pct;
  }
}

module.exports = LeituraResponseDTO;