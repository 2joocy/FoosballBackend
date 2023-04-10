## Description

What you need to do, in order for this to work, is to create a frontend in ReactJS that can communicate with this backend through https calls with `fetch` in nodejs.

The requirements are:

- The website should show a history of all matches on the front
- The website should display matches and the players in those matches
- The website should be able to track games, both player score per player and who won
- The website should be mobile friendly, or designed for mobile first

## Routes

### Players

#### `/players` POST

##### Input:

```
{
  name: string
}
```

##### Output

```
{
  id: string;
  name: string;
}
```

#### `/players` GET

##### Input:

```
{
}
```

##### Output

```
[
  {
    id: string;
    name: string;
  }
]
```

#### `/players/<PlayerId>/mmr` GET

##### Input:

```
{
}
```

##### Output

```
{
  mmr: number;
}
```

### Games

#### `/games` POST

##### Input:

```
{
  name: string;
}
```

##### Output

```
{
  id: string;
  name: string;
}
```

#### `/games` GET

##### Input:

```
{
}
```

##### Output

```
[
  {
    id: string;
    name: string;
  }
]

```

#### `/games/<GameId>/players` POST

##### Input:

```
{
  playerId: string;
  goals: number;
  wasWinner: boolean;
}
```

##### Output

```
{
  game_id: string;
  player_id: string;
  goals: number;
  was_winner: boolean;
}
```

#### `/games/<GameId>/players` GET

##### Input:

```
{
  gameId: string;
}
```

##### Output

```
[
  {
    game_id: string;
    player_id: string;
    goals: number;
    was_winner: boolean;
  }
]

```

#### `/games/history/playerId` GET

##### Input:

```
{
}
```

##### Output

```
[
  {
    game_id: string;
    player_id: string;
    goals: number;
    was_winner: boolean;
  }
]

```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

TODOs:

- Authentication
- Object Validation
- ORM for the database
