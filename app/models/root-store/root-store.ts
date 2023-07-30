import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { UserStoreModel } from "../user/user-store";
import { FinishStoreModel } from "../finish/finish-store";

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  user: types.optional(UserStoreModel, {}),
  finish: types.optional(FinishStoreModel, {})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
