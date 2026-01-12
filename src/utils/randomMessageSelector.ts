const selectRandomMessage = (messageList: string[]): string =>
  messageList[Math.floor(Math.random() * messageList.length)];

const WELCOME_MESSAGES: string[] = [
  "Happy playlisting!",
  "Welcome to the playlist zone!",
];

export const getRandomWelcomeMessage = (): string =>
  selectRandomMessage(WELCOME_MESSAGES);
