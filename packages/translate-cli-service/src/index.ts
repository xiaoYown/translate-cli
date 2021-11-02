import { Command } from 'commander';
import { COMMANDS } from './constants/commands';
import serve from './commands/serve';

const program = new Command();

const commands = [
  {
    command: COMMANDS.SERVE,
    desc: 'Start a translate-cli server.',
    action: serve,
  },
];

commands.forEach(({ command, desc, action }) => {
  program
    .command(`${command}`)
    .description(desc)
    .action((...args) => {
      action(...args);
    });
});

program.parse(process.argv);
