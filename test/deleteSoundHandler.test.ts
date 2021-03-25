import "ts-jest";
import DeleteSoundCommandHandler from "../src/handlers/deleteSoundHandler";
import Discord from "discord.js";
import { instance, mock, when } from "ts-mockito";

test("activate_commandContentLengthIsOne_returnsFalse", () => {
  const uut = new DeleteSoundCommandHandler();

  const messageMock = mock(Discord.Message);
  when(messageMock.content).thenReturn("$delete");

  const result = uut.activate(instance(messageMock));

  expect(result).toBe(false);
});

test("activate_commandContentLengthIsOverOne_returnsTrue", () => {
  const uut = new DeleteSoundCommandHandler();

  const messageMock = mock(Discord.Message);
  when(messageMock.content).thenReturn("$delete sound_name");

  const result = uut.activate(instance(messageMock));

  expect(result).toBe(true);
});

test("parseCommand_commandContentLengthIsOne_returnsNull", () => {
  const uut = new DeleteSoundCommandHandler();

  const messageMock = mock(Discord.Message);
  const guildMock = mock(Discord.Guild);

  when(guildMock.id).thenReturn("serverId");

  when(messageMock.guild).thenReturn(instance(guildMock));
  when(messageMock.content).thenReturn("$delete");

  const result = uut.parseCommand(instance(messageMock));

  expect(result).toBe(null);
});

test("parseCommand_guildIsNull_returnsNull", () => {
  const uut = new DeleteSoundCommandHandler();

  const messageMock = mock(Discord.Message);

  when(messageMock.guild).thenReturn(null);
  when(messageMock.content).thenReturn("$delete sound_name");

  const result = uut.parseCommand(instance(messageMock));

  expect(result).toBe(null);
});

test("parseCommand_commandContentLengthIsOverOneAndServerIdIsNotNull_returnsServerIdAndSoundName", () => {
  const uut = new DeleteSoundCommandHandler();

  const messageMock = mock(Discord.Message);
  const guildMock = mock(Discord.Guild);

  when(guildMock.id).thenReturn("serverId");

  when(messageMock.guild).thenReturn(instance(guildMock));
  when(messageMock.content).thenReturn("$delete sound_name");

  const result = uut.parseCommand(instance(messageMock));

  expect(result).toEqual({
    serverId: instance(guildMock).id,
    soundName: "sound_name",
  });
});
