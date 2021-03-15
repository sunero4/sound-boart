import { prefix } from "./config";

export type SoundBoartEvent = { aliases: string[] };

export const uploadEvent = {
  aliases: ["up", "upload"],
};

export const listEvent = {
  aliases: ["l", "list"],
};

export const playEvent = {
  aliases: ["play"],
};

export const events = [uploadEvent, listEvent];