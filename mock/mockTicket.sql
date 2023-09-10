{
    id:# auto incrementing,
    server: references user_id gotten from req.session,
    total: cost,
    items:[references product-id],
    created_on: date.now(),
}