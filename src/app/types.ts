export type SnowmanPart = "hat" | "head" | "body";

export type CurrentState = {
  [key in SnowmanPart]: number;
};

export type GuessState = Partial<CurrentState>;
