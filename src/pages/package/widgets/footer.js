'use strict';

const blessed = require('@blessed/neo-blessed');
const getTheme = require('@utils/getTheme');
const runCommand = require('@utils/runCommand');

module.exports = function (screen, pkg) {
  const packageName = pkg.name;
  const theme = getTheme();

  const footer = blessed.listbar({
    parent: screen,
    bottom: 0,
    left: 0,
    right: 0,
    height: 'shrink',
    mouse: true,
    keys: true,
    border: 'line',
    vi: true,
    style: theme.footer.style,
    commands: {
      search: {
        keys: ['/'],
        callback: function () {
          screen.render();
        },
      },
      quit: {
        keys: ['q'],
        callback: function () {},
      },
      install: {
        keys: ['i'],
        callback: function () {
          const command = `pnpm add ${packageName}`;
          runCommand(screen, command);
        },
      },
      'install-global': {
        keys: ['l'],
        callback: function () {
          const command = `pnpm add -g ${packageName}`;
          runCommand(screen, command);
        },
      },
      'install-dev': {
        keys: ['d'],
        callback: function () {
          const command = `pnpm add -D ${packageName}`;
          runCommand(screen, command);
        },
      },
    },
  });

  return footer;
};
