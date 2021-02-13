
const express = require('express');
// create new router
const router = express.Router();



// create a JSON data array
let data = [
    {
        id:1,
        name:"kitty",
        action:"sleeping"
    },
    {
        id:2,
        name:"puppy",
        action:"eating"
    },
    {
        id:3,
        name:"moh",
        action:"walking"
    },
    {
        id:4,
        name:"her",
        action:"running"
    },
    {
        id:5,
        name:"coco",
        action:"running"
    },
    {
        id:6,
        name:"fifi",
        action:"eating"
    },
    {
        id:7,
        name:"amani",
        action:"eating"
    },
    {
        id:8,
        name:"amanda",
        action:"eating"
    }
];

// this end-point of an API returns JSON data array
router.get('/', function (req, res) {
    res.status(200).json(data);
});

// this end-point returns an object from a data array find by id
// we get `id` from URL end-points
router.get('/:id', function (req, res) {
    // find an object from `data` array match by `id`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    // if object found return an object else return 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});
// CREATE
// this api end-point add new object to item list
// that is add new object to `data` array
router.post('/', function (req, res) {
    // get itemIds from data array
    

    // create new id (basically +1 of last item object)
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
   
    
    // create an object of new Item
    let newItem = {
        id: newId, // generated in above step
        name: req.body.name, // value of `name` get from POST req
        action:req.body.action,
    
    };

    // push new item object to data array of items
    data.push(newItem);

    // return with status 201
    // 201 means Created. The request has been fulfilled and 
    // has resulted in one or more new resources being created. 
    res.status(201).json(newItem);
});

// UPDATE
// this api end-point update an existing item object
// for that we get `id` and `name` from api end-point of item to update
router.put('/:id', function (req, res) {
    // get item object match by `id`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    // check if item found
    if (found) {
        let updated = {
            id: found.id,
            name: req.body.name, // set value of `name` get from req
            action: req.body.action, // set value of `action` get from req
             
        };
        let targetIndex = data.indexOf(found);

        // replace object from data list with `updated` object
        data.splice(targetIndex, 1, updated);
        
        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        res.status(200).json(updated);
        
    } else {
        res.sendStatus(404);
    }
    
});
// DELETE
// this api end-point delete an existing item object from
// array of data, match by `id` find item and then delete
router.delete('/:id', function (req, res) {
    // find item from array of data
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        // if item found then find index at which the item is
        // stored in the `data` array
        let targetIndex = data.indexOf(found);

        // splice means delete item from `data` array using index
        data.splice(targetIndex, 1);
    }

    // return with status 204
    // success status response code 204 indicates
    // that the request has succeeded
    res.sendStatus(204);
});
module.exports = router;