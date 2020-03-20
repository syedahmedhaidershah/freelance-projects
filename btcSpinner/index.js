const express = require('express');
const bp = require('body-parser');
const cors = require('cors');

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app, use(cors());

app.get('*', () => {
    const res = {
        num_scatters: 0,
        progressive_win: 0,
        time: 7715,
        progressive_seed: 0,
        bonus_multiplier: 0,
        inttotalbet: 0,
        progressive_jackpot: 116517680,
        total_jackpot: 50000000000,
        intwinnings: 0,
        game_id: "373a9f63f1e31a58daffe4d6ee3724cd",
        game_seed: "3f1a3SWRzmBqc13jMNACSZ5jWdKB91Tm8i53Ln9NvnGK16668521702982276694",
        intbalance: 0,
        prize: 0,
        unique_id: 0,
        server_seed_hash: "701ef5a6004c17674711b678650f23546630d03657b7d2a4e41f6b823a7cf307",
        fake_intbalance: 950000,
        reel_positions: [28, 25, 15, 26, 23],
        intgameaarnings: 100000,
        prizes: {},
        free_spin_info: { left: 0 }
    }
})

app.listen(9896, () => {
    console.log(`live on 9896`)
})