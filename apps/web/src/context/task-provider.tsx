"use client";

import { ACTIONS, actions, addTaskDefaultValues } from "@/lib/constants";
import { createContext, useReducer, useContext } from "react";
import { TaskState } from "@/types";

import type { PropsWithChildren } from "react";

export const initialState: TaskState = {
  addTask: { ...addTaskDefaultValues, isOpen: false },
  taskAlertDialog: { isOpen: false },
};

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
    case actions.EDIT_TASK: {
      return {
        ...state,
        addTask: { ...action.payload, isOpen: true },
      };
    }
    case actions.TOGGLE_ADD_TASK_DIALOG: {
      return {
        ...state,
        addTask: {
          ...state.addTask,
          isOpen: action.payload || !state.addTask.isOpen,
        },
      };
    }
    case actions.DELETE_TASK: {
      return { ...state, taskAlertDialog: { ...action.payload, isOpen: true } };
    }
    case actions.CANCEL_DELETE_TASK: {
      return { ...state, taskAlertDialog: { isOpen: false } };
    }
    case actions.TOGGLE_DELETE_TASK_DIALOG: {
      return {
        ...state,
        taskAlertDialog: {
          ...state.taskAlertDialog,
          isOpen: action.payload.isOpen || !state.taskAlertDialog.isOpen,
        },
      };
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
