const { User, Products, Orders } = require('../model/index');
const { withAuth, getDate } = require('../utils/helpers');

const router = require('express').Router();

//creates a new ticket using the request body
router.post('/new', withAuth, async (req, res) => {
  //deconstruct the request body
  const { total, items } = req.body;

  try {
    //create ticket using info from body, session, and heloer functions
    const newTicket = await Orders.create({
      server: req.session.userId,
      items: items,
      created_on: getDate(),
      total: total
    });

    //renders menu after ticket is created
    res
      .status(200)
      .json({ message: 'ticket saved', newTicket: newTicket })
      .redirect('/menu');
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

//retrieves all saved orders and loads them into tickets page
router.get('/', withAuth, async (req, res) => {
  try {
    //retrieves all tickets
    const allOrders = await Orders.findAll({
      include: [{ model: User }, { model: Products }]
    });

    //serializes data
    const orders = allOrders.map((order) => order.get({ plain: true }));

    //plugs serialized data into tickets page
    res.status(200).json({ message: 'orders found' }).render('tickets', orders);
  } catch (error) {
    res.status(404).json({ message: 'no orders found' });
  }
});

//grabs specific ticket using ticket id
router.get('/orders/ticket_id/:id', withAuth, async (req, res) => {
  try {
    //retrieves specific ticket
    const ticketid = await Orders.findByPk(req.params.id, {
      include: [{ model: Products }, { model: User }]
    });

    //serializes data
    const ticket = ticketid.get({ plain: true });

    //loads ticket page with retrieved data
    res
      .status(200)
      .json({ message: 'order found' })
      .render('tickets', { orders: [ticket] });
  } catch (error) {
    res.status(404).json({ message: 'ticket not found' });
  }
});

//retrieves all tickets by a server
router.get('/orders/server_id/:id', withAuth, async (req, res) => {
  try {
    //searches for tickets matching server id
    const serverTickets = await Orders.findAll({
      where: {
        server: req.params.id
      },
      include: [{ model: User }, { model: Products }]
    });

    //serialized data
    const tickets = serverTickets.map((ticket) => ticket.get({ plain: true }));

    //loads ticket page with retrieved tickets
    res
      .status(200)
      .json({ message: 'tickets found' })
      .render('tickets', { orders: tickets });
  } catch (error) {
    res.status(404).json({ message: 'tickets not found' });
  }
});

module.exports = router;
