import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"

export const FinishStoreModel = types
  .model("FinishStore")
  .props({
    flag: types.optional(types.boolean, true),
  })
  .extend(withEnvironment)
  .actions((self) => {
    const setFinishStore = (body = true) => {
      self.flag = body
    }
    return { setFinishStore }
  })

type FinishStoreType = Instance<typeof FinishStoreModel>
export interface FinishStore extends FinishStoreType {}
type FinishStoreSnapshotType = SnapshotOut<typeof FinishStoreModel>
export interface FinishStoreSnapshot extends FinishStoreSnapshotType {}
