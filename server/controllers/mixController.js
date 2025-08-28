// server/controllers/mixController.js

const Mix = require('../models/Mix');

// @desc Create a new mix
exports.createMix = async (req, res) => {
    const {mixName, settings} = req.body;
    console.log('--- Request untuk membuat mix baru diterima ---'); // <-- LOG 1

    console.log('Data dari body:', { mixName, settings }); // <-- LOG 2
    try {
         console.log('ID User yang membuat:', req.user._id); // <-- LOG 3

        const mix = new Mix({
            mixName, 
            settings,
            owner: req.user._id,
        });
        console.log('Objek mix berhasil dibuat, sebelum disimpan.'); // <-- LOG 4
        const createdMix = await mix.save();
        console.log('Mix berhasil disimpan ke DB!'); // <-- LOG 5
        res.status(201).json(createdMix);
         console.log('Respons berhasil dikirim.'); // <-- LOG 6
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
};

// @desc Get all mixes for a user
exports.getMyMixes = async (req, res) => {
    try{ 
        const mixes = await Mix.find({owner: req.user._id});
        res.json(mixes);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
};

// @desc Delete a mix
exports.deleteMix = async (req, res) => {
    try {
        const mix = await Mix.findById(req.params.id);
        if (!mix) {
            return res.status(404).json({message: 'Mix not found'});
        }

        // make sure yg hapus mix itu ya ownernya
        if (mix.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({message: 'User not authorized'});
        }

        // pakai deleteOne untuk mongoose v6+
        await mix.deleteOne();
        res.json({message: 'Mix removed'});
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}