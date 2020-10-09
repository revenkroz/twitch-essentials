import OptionsSync from 'webext-options-sync';
import { uuidv4 } from '../utils';

class Index extends OptionsSync {
  async get(key) {
    return (await this.getAll())[key];
  }

  /**
   * Arrays and objects are not supported, so we store json
   */
  async addCommand(type, name, content) {
    const commands = await this.getCommands();
    commands.push({ id: uuidv4(), type, name, content });
    await this.set({ commands: JSON.stringify(commands) });
  }

  async removeCommand(removedCommand) {
    const commands = await this.getCommands();
    let commandIdx = null;
    commands.forEach((command, idx) => {
      if (command.id === removedCommand.id) {
        commandIdx = idx;
      }
    });

    if (null !== commandIdx) {
      commands.splice(commandIdx, 1);
      await this.set({ commands: JSON.stringify(commands) });
    }
  }

  async getCommands() {
    return JSON.parse(await this.get('commands'));
  }
}

export default new Index({
  defaults: {
    commands: '[]', // see comment above
  },
  logging: true,
});
