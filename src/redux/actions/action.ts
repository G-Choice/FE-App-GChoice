
import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { GroupResApiType } from '../../@types/GroupResApiType';
export const updateGroupList = (groupList: GroupResApiType[]) => ({
  type: 'UPDATE_GROUP_LIST' as const,
  payload: groupList,
});
export const saveGroupCart = (groupCarts: any) => ({
  type: 'SAVE_GROUP_CART',
  payload: groupCarts,
});

export type GroupActionTypes = ReturnType<typeof updateGroupList>;
