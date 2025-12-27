const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

const ideas = [
    {
        id: 1,
        text: "positive newsletter, a newsletter that only shares positive, uplifting news",
        tag: 'tech',
        username: "tony stark",
        date: '2022-01-02',
    },
    {
        id: 2,
        text: "milk cartons that turn a different colour the older your milk is getting",
        tag: 'inventions',
        username: "steve rogers",
        date: '2022-01-02',
    },
    {
        id: 3,
        text: "atm location app which lets you know where the closest atm is and if it is in service",
        tag: 'software',
        username: "bruce banner",
        date: '2022-01-02',
    }
]


router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.json({
            success: true,
            data: ideas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "something went wron, please try again"
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        res.json({
            success: true,
            data: idea
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "something went wrong please try again"
        });
    }

})

// Add an idea
router.post('/', async (req, res) => {
    const idea = new Idea({
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
    });

    try {
        const savedIdea = await idea.save();
        res.json({
            success: true,
            data: savedIdea
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            data: error
        });
    }
})

// Update idea

router.put('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);

        if (idea.username === req.body.username) {
            const updatedIdea = await Idea.findByIdAndUpdate(
                req.params.id, {
                    $set: {
                        text: req.body.text,
                        tag: req.body.tag
                    }
                }, {
                    new: true
                }
            );
            return res.json({
                success: true,
                data: updatedIdea
            });
        }
        
        // username doesn't match
        
        res.status(403).json({
            success: false,
            error: "username doesn't match "
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            erorr: "something went wrong please try again"
        })
    }
})

// delete idea 

router.delete('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);

        if (idea.username === req.body.username) {
            await Idea.findByIdAndDelete(req.params.id);
            res.json({
                success: true,
                data: {}
            })
        }

        res.status(403).json({
            success: false,
            error: "Username doesn't match"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            error: "something went wrong please try again"
        })
    }


});

module.exports = router;
