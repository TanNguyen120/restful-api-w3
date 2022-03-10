/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        const staffs = await knex.knexObj('staff')
        res.status(200).json(staffs)

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});

//**************************************************************************************** */

router.get('/:id', async function (req, res, next) {
    try {
        const id = !isNaN(parseInt(req.params.id)) ? req.params.id : 1;
        const result = await knex.knexObj('staff').where('staff_id', id);
        res.status(200).json(result)

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});
//**************************************************************************************** */

router.put('/:id', async function (req, res, next) {
    try {
        const id = !isNaN(parseInt(req.params.id)) ? req.params.id : 1;
        const newfirstName = req.body.firstName;
        const newLastName = req.body.lastName;
        const addressId = req.body.addressId;
        const storeId = req.body.storeId;
        const userName = req.body.userName;
        const result = await knex.knexObj('staff').where('staff_id', id).update(
            {
                first_name: newfirstName,
                last_name: newLastName,
                address_id: addressId,
                username: userName,
                store_id: storeId
            });
        res.status(201).send('update succeed' + result);

    } catch (err) {
        res.status(500).send('some thing went wrong');
        console.error(err);
        throw err;
    }
});
//**************************************************************************************** */
router.post('/', async function (req, res, next) {
    try {
        const newfirstName = req.body.firstName;
        const newLastName = req.body.lastName;
        const addressId = req.body.addressId;
        const storeId = req.body.storeId;
        const userName = req.body.userName;
        const allCategories = await knex.knexObj('staff').insert({
            first_name: newfirstName,
            last_name: newLastName,
            address_id: addressId,
            username: userName,
            store_id: storeId
        });
        res.status(201).send('insert succeed')

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});

//**************************************************************************************** */
router.delete('/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const allCategories = await knex.knexObj('staff').where({ staff_id: id }).del();
        res.status(205).send('delete succeed')

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});


module.exports = router;