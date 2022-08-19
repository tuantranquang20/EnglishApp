import { applySnapshot, Instance, SnapshotOut, types } from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { createUserDefaultModel, UserModel } from "./user";

export const UserStoreModel = types
  .model("UserStore")
  .props({
    userInformation: types.optional(UserModel, createUserDefaultModel()),
  })
  .extend(withEnvironment)
  .actions((self) => {
    const setUserStore = (body = {}) => {
      applySnapshot(self.userInformation, body);
    };
    return { setUserStore };
  });

type UserStoreType = Instance<typeof UserStoreModel>;
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>;
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () =>
  types.optional(UserStoreModel, {});
