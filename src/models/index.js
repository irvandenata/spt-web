const {model} = require('mongoose');
const db = require('./db');
const District = require('./district');
const User = require('./user');
const Province = require('./province');
const Grade = require('./grade');
const Group = require('./group');
const Position = require('./position');
const DailyCost = require('./dailyCost');
const TransportCost = require('./transportCost');
const TicketCost = require('./ticketCost');
const AccommodationCost = require('./accommodationCost');
const RentCost = require('./rentCost');
module.exports = {
  District,
  Province,
  db,
  User,
  Grade,
  Group,
  Position,
  DailyCost,
  TransportCost,
  TicketCost,
  AccommodationCost,
  RentCost,
}