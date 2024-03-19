import { GroupResApiType } from "../../@types/GroupResApiType";

interface GroupState {
    groupList: GroupResApiType[]; 
  }
  
  const initialState: GroupState = {
    groupList: [],
    groupCart: null,
  };
  
  type GroupAction = { type: 'UPDATE_GROUP_LIST'; payload: GroupResApiType[] };
  
  const groupReducer = (state = initialState, action: GroupAction): GroupState => {
    switch (action.type) {
      case 'UPDATE_GROUP_LIST':
        return {
          ...state,
          groupList: action.payload,
        };
      default:
        return state;
    }
  };
  
  const cartreducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'SAVE_GROUP_CART':
        return {
          ...state,
          groupCart: action.payload,
        };
      default:
        return state;
    }
  };
  
  
  export {groupReducer,cartreducer} ;
  