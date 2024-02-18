require('dotenv').config()

const cheerio = require('cheerio');
const request = require('request');

const Doviz = require('../models/Doviz');
const { successResponse, errorResponse } = require("../utils/ResponseHandler");

const indexController = function (req, res, next) {
  var dovizler = [];
  request(process.env.ALL_CURRENCY_DATA, (error, response, body) => {
    if (error || res.statusCode !== 200) return errorResponse(res, 'Server Error', 500);

    try {
      let $ = cheerio.load(body);

      let bist100 = $('#imkb_header_son_data').text();
      let bist100Son = $('#imkb_header_son').text();

      let dolar = $('#usd_header_son_data').text();
      let dolarSon = $('#usd_header_son').text();

      let euro = $('#eur_header_son_data').text();
      let euroSon = $('#eur_header_son').text();

      let altin = $('#gld_header_son_data').text();
      let altinSon = $('#gld_header_son').text();

      let petrol = $('#petrol_header_son_data').text();
      let petrolSon = $('#petrol_header_son').text();

      let bono = $('#bono_header_son_data').text();
      let bonoSon = $('#bono_header_son').text();

      var durum = new Doviz(
          bist100,
          bist100Son,
          dolar,
          dolarSon,
          euro,
          euroSon,
          altin,
          altinSon,
          petrol,
          petrolSon,
          bono,
          bonoSon
      );
      dovizler.push(durum);

      successResponse(res, dovizler);
    }catch (error){
      return errorResponse(res, 'Parse Error', 500);
    }
  });
};

module.exports = {
  indexController,
};
