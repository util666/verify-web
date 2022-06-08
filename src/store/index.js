
import {createStore} from "vuex"
import account from "./module/account"
import global from "./module/global"


const store = createStore({
    modules: {
        account,
        global,
    }
})

export default store
