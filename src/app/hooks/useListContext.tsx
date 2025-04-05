import { Context, createContext, ReactNode, useContext, useReducer } from 'react';

const ListContext: Context<ListContextType> = createContext<ListContextType>(null!);

type ListContextProviderProps = {
  id: string;
  children: ReactNode;
  value?: ListContextType;
};

type ListContextLimitType = {
  limit: number;
}

type ListContextOffsetType = {
  cursor?: string;
}

type ListContextTotalType = {
  total: number;
}

type ListContextRowsType = {
  rows: any[];
}

type ListContextValuesType = ListContextLimitType & ListContextOffsetType & ListContextTotalType & ListContextRowsType;

export type ListContextType = ListContextValuesType & {
  setLimit: (newLimit: number) => void;
  setCursor: (newCursor: string) => void;
  setTotal: (newTotal: number) => void;
  setRows: (newRows: any[]) => void;
  id: string;
};

export const defaultListForm = {
  limit: 10,
  total: 0,
  rows: []
}

export const ListContextProvider = ({ id, children }: ListContextProviderProps) => {
  const reducer = (state: ListContextValuesType, updatedState: ListContextLimitType | ListContextOffsetType | ListContextTotalType | ListContextRowsType) => {
    return { ...state, ...updatedState };
  };
  const [ state, dispatch ] = useReducer(reducer, defaultListForm);
  const { limit, cursor, total, rows } = state;
  const setLimit = (newLimit: number) => dispatch({ limit: newLimit });
  const setCursor = (newCursor: string) => dispatch({ cursor: newCursor });
  const setTotal = (newTotal: number) => dispatch({ total: newTotal });
  const setRows = (newRows: any[]) => dispatch({ rows: newRows });
  const listContext = { limit, setLimit, cursor, setCursor, total, setTotal, rows, setRows, id };

  return <ListContext.Provider value={listContext}>{children}</ListContext.Provider>
};

export function useListContext() {
    const context = useContext(ListContext);

    if(!context){
        throw new Error('List Context Provider not found, useListContext call is thus invalid.')
    }

    return context;
}
