

export const db = wx.cloud.database()

class HYCollection {
    constructor(collectionName) {
        this.collection = db.collection(collectionName)
    }

    // 增删改查
    add(data) {
        return this.collection.add({
            data
        })
    }

    remove(condition, isDoc = true) {
        if (isDoc ) {
            return this.collection.doc(condition).remove()
        } else {
            return this.collection.where(condition).remove()
        }
    }

    updata(condition,data, isDoc = true) {
        if (isDoc ) {
            return this.collection.doc(condition).update({data})
        } else {
            return this.collection.where(condition).updata({data})
        }
    }

    query(offset = 0, size = 20 , condition = {}, isDoc = false) {
        if (isDoc ) {
            return this.collection.doc(condition).get()
        } else {
            return this.collection.where(condition).skip(offset).limit(size).get()
        }
    }
}

export const f_col = new HYCollection("c_favor")
export const l_col = new HYCollection("c_like")
export const c_history = new HYCollection("c_history")
export const c_menu = new HYCollection("c_menu")