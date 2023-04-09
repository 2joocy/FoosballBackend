CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS players (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS games (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS game_players (
    game_id uuid REFERENCES games(id),
    player_id uuid REFERENCES players(id),
    PRIMARY KEY (game_id, player_id),
    goals INT NOT NULL,
    was_winner BOOLEAN NOT NULL
);