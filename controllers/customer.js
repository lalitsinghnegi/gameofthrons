const axios = require("axios");
let continents = [];
const customerList = async (req, res) => {
  if (req.query.id !== undefined) {
    res.status(200).send(await getCustomerList(req.query.id));
  } else {
    res.status(200).send(await getCustomerList());
  }
};

const getCustomerList = (id = -1) => {
  return axios
    .get("https://thronesapi.com/api/v2/Characters")
    .then(function (response) {
      let customers = response.data;
      return axios
        .get("https://thronesapi.com/api/v2/Continents")
        .then((response) => {
          continents = response.data;
          let allCustomers = filterCustomers(id, customers);
          for (let i = 0; i < allCustomers.length; i++) {
            if (allCustomers[i].id % 2 == 0) {
              allCustomers[i].continentName = getContinent(0);
            } else {
              allCustomers[i].continentName = getContinent(1);
            }
          }
          return allCustomers;
        });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

// filter continent
const getContinent = (cont) => {
  let filteredContinent = continents.filter((c) => c.id == cont);
  return filteredContinent[0].name;
};

const filterCustomers = (id, data) => {
  if (id == -1) return data;
  else {
    let fil = data.filter((f) => f.id == id);
    return fil;
  }
};

module.exports = { customerList };
