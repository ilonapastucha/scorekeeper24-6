import PlayersList from './PlayersList';
import React from 'react';
import { shallow } from 'enzyme';
import Player from '../Player/Player';

it('renders without crashing', () => {
  shallow(<PlayersList players={[]} />);
});

it('renders correct number of players', () => {
  const players = [
    {
        name: 'Ania',
        score: 5
    },
    {
        name: 'Robert',
        score: 0
    }
]
const playerComponent = shallow(<PlayersList players={players} />);
const expectedPlayersNumber = playerComponent.find(Player).length;

expect(expectedPlayersNumber).toEqual(2);
});

it('shall chain call onScoreUpdate by onPlayerScoreChange', ()=> {
  const players = [
    {
      name: 'Ania',
      score: 5
    },
    {
      name: 'Kasia',
      score: 0
    }
  ]
  const mockedOnScoreUpdate = jest.fn();
  const playerComponent = shallow(<PlayersList players={players} onScoreUpdate={mockedOnScoreUpdate} />);
  const firstPlayer = playerComponent.find(Player).first();
  const onPlayerScoreChange = firstPlayer.prop('onPlayerScoreChange');

  onPlayerScoreChange(10);

  expect(mockedOnScoreUpdate).toBeCalledWith(0, 10);
});

it('check that onPlayerRemove was called', () => {
  const players = [
    {
        name: 'Ola',
        score: 5
    },
    {
        name: 'Janek',
        score: 0
    }
  ]
  const mockedonPlayerRemove = jest.fn();
  const playerComponent = shallow(<PlayersList players={players} onPlayerRemove={mockedonPlayerRemove} />);
  const firstPlayer = playerComponent.find(Player).first();
  const onPlayerRemove = firstPlayer.prop('onPlayerRemove');

  onPlayerRemove();

  expect(mockedonPlayerRemove).toBeCalled();  
});