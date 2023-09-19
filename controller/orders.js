const { User, Products, Orders, OrderProduct } = require('../model/index');
const { withAuth, getDate } = require('../utils/helpers');
const router = require('express').Router();

//creates a new ticket using the request body
router.post('/new', withAuth, async (req, res) => {
  //deconstruct the request body
  const { total, items } = req.body;

  try {
    //create ticket using info from body, session, and heloer functions
    const newTicket = await Orders.create({
      userId: req.session.userId,

      created_on: getDate(),
      total: total
    });

    const orderId = newTicket.id;

    //map through item array, format for bulkcreate
    const itemArray = items.map((item) => {
      return { order_id: orderId, product_id: item };
    });

    //creates multiple tables using user input
    const newTicketItem = await OrderProduct.bulkCreate(itemArray);

    //renders menu after ticket is created
    res.status(200).json({
      message: 'ticket saved',
      newTicket: newTicket,
      items: newTicketItem
    });
  } catch (err) {
    res.status(504).json({ message: 'ticket not saved', error: err });
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

    let products = [];

    //serializes through all products in the order
    allOrders.forEach((order) => {
      const product = order.products.map((item) => item.get({ plain: true }));
      products.push(product);
    });

    //plugs serialized data into tickets page
    res
      .status(200)

      .render('tickets', { orders, products });
  } catch (error) {
    res.status(404).json({ message: 'no orders found', err: error });
  }
});

//grabs specific ticket using ticket id
router.get('/ticket_id/:id', withAuth, async (req, res) => {
  try {
    //retrieves specific ticket
    const ticketid = await Orders.findByPk(req.params.id, {
      include: [{ model: User }, { model: Products }]
    });

    //serializes data
    const ticket = ticketid.get({ plain: true });

    //loads ticket page with retrieved data
    res.status(200).render('tickets', { orders: [ticket] });
  } catch (error) {
    res.status(404).json({ message: 'ticket not found' });
  }
});

//retrieves all tickets by a server
router.get('/server_id/:id', withAuth, async (req, res) => {
  try {
    //searches for tickets matching server id
    const serverTickets = await Orders.findAll({
      where: {
        userId: req.params.id
      },
      include: [{ model: User }, { model: Products }]
    });

    //serialized data
    const tickets = serverTickets.map((ticket) => ticket.get({ plain: true }));

    //loads ticket page with retrieved tickets
    res.status(200).render('tickets', { orders: tickets });
  } catch (error) {
    res.status(404).json({ message: 'tickets not found' });
  }
});

module.exports = router;
