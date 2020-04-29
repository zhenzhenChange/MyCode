/**
 * 中介者模式：解除对象与对象之间得到紧耦合关系（Vue 数据变化，触发视图渲染，只通知到组件级别）
 * 迪米特法则（最少知识原则）：一个对象应该尽可能少地了解另外的对象
 */

/**
 * 多人游戏：一方全部死亡则输，另一方胜利
 * 缺陷：如果玩家人数多了起来，每个玩家死亡都会通知到其他玩家，紧耦合
 */
class Player {
  constructor(name) {
    this.name = name;
    this.enemy = null;
  }

  win() {
    console.log(`${this.name} Won!`);
  }

  lose() {
    console.log(`${this.name} Lost!`);
  }

  die() {
    this.lose();
    this.enemy && this.enemy.win();
  }
}

const player1 = new Player('小明');
const player2 = new Player('小红');

player1.enemy = player2;
player2.enemy = player1;

player1.die();

/**
 * 中介者模式改造
 */

class Player {
  constructor(teamName, teamColor) {
    this.teamName = teamName;
    this.teamColor = teamColor;
    this.state = 'alive';
  }

  win() {
    console.log(`${this.teamName} Won!`);
  }

  lose() {
    console.log(`${this.teamName} Lost!`);
  }

  die() {
    this.state = 'dead';
    PlayerDirectorResult.ReceiveMessage('Dead', this);
  }

  remove() {
    PlayerDirectorResult.ReceiveMessage('Remove', this);
  }

  changeTeam(newTeamColor) {
    PlayerDirectorResult.ReceiveMessage('ChangeTeam', this, newTeamColor);
  }
}

function PlayerDirector() {
  const players = {};
  const operations = {
    Add(player) {
      const teamColor = player.teamColor;
      players[teamColor] = players[teamColor] || [];
      players[teamColor].push(player);
    },
    Remove(player) {
      players[player.teamColor] = players[player.teamColor].filter((item) => item != player);
      operations.Dead(player);
    },
    ChangeTeam(player, newTeamColor) {
      operations.Remove(player);
      player.teamColor = newTeamColor;
      operations.Add(player);
    },
    Dead(player) {
      const teamColor = player.teamColor;
      const team = players[teamColor];
      const isAllDead = team.every((item) => item.state == 'dead');

      if (isAllDead) {
        team.forEach((item) => item.lose());

        for (const color in players) {
          if (color != teamColor) {
            players[color].forEach((item) => item.win());
          }
        }
      }
    },
  };

  return {
    ReceiveMessage(operation, ...args) {
      operations[operation].apply(this, args);
    },
  };
}

function PlayerFactory(team, teamColor) {
  const player = new Player(team, teamColor);
  PlayerDirectorResult.ReceiveMessage('Add', player);
  return player;
}

const PlayerDirectorResult = PlayerDirector();

const player1 = PlayerFactory('皮蛋', 'red');
const player2 = PlayerFactory('小乖', 'red');
const player3 = PlayerFactory('宝宝', 'red');
const player4 = PlayerFactory('小强', 'red');

const player5 = PlayerFactory('黑妞', 'blue');
const player6 = PlayerFactory('葱头', 'blue');
const player7 = PlayerFactory('胖墩', 'blue');
const player8 = PlayerFactory('海盗', 'blue');

player1.changeTeam('blue');
player2.remove();
player3.die();
player4.remove();
