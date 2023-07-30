import { Instance, SnapshotOut, types } from "mobx-state-tree";

export const UserModel = types.model("User").props({
  email: types.maybeNull(types.string),
  username: types.maybeNull(types.string),
  _id: types.maybeNull(types.string),
});

type UserType = Instance<typeof UserModel>;
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>;
export interface UserSnapshot extends UserSnapshotType {}
export const createUserDefaultModel = () => ({
  username: "",
  email: "",
  _id: "",
});
