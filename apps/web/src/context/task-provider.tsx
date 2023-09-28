"use client";

import { createContext, useReducer, useContext } from "react";
import { ACTIONS, actions } from "@/lib/constants";
import { TaskState } from "@/types";

import type { PropsWithChildren } from "react";

export const initialState: TaskState = {};

type Action = ACTIONS;
type State = typeof initialState;
type Dispatch = (action: Action) => void;

const TaskContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export function UseTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined)
    throw new Error(`useUserDispatch must be used within a UserProvider`);
  return context;
}

function TaskReducer(state: State, action: Action) {
  switch (action.type) {
    case actions.INVALID_ACTION: {
      return state;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function TaskContextProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(TaskReducer, {
    ...initialState,
  });
  const value = { state, dispatch };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
