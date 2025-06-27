import { signal } from "@preact/signals-react";

// state for grid size
export const gridSize = signal<number>(4);
// a state to store comparing values
export const compareArray = signal<string[]>([])
// state for storing the refs(use sets causing it stored only unique refs)
export const CardRefs = signal<Set<HTMLDivElement>>(new Set())
// players move state
export const player1Move = signal<boolean>(true);
// Player 1 point
export const Player1Point = signal<number>(0);
// Player 1 point
export const Player2Point = signal<number>(0);
// counter for match progress
export const counter = signal<number>(0);