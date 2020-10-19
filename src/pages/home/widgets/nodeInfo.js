'use strict';

const blessed = require('@blessed/neo-blessed');
const getTheme = require('@utils/getTheme');
const { exec } = require('child_process');

module.exports = function (screen) {
  const theme = getTheme();
  const { border, style } = theme.box;
  const box = blessed.box({
    top: '10%+1',
    left: 0,
    height: '30%',
    width: '35%',
    label: ' Node.js Info ',
    border,
    style,
    tags: true,
  });

  const info = {
    node: '',
    pnpm: '',
  };

  exec('node -v', (err, stdout) => {
    info.node = stdout;
    render();
  });

  exec('pnpm -v', (err, stdout) => {
    info.pnpm = stdout;
    render();
  });

  function render() {
    box.setContent(`
  {bold}node:{/} ${info.node}
  {bold}pnpm:{/} ${info.pnpm}
  `);
    screen.render();
  }

  render();

  return box;
};
