/**
 * Created by cw on 2017/10/23.
 */

import {inQiyiWeb} from '../env/env';
import {on_receive_patch} from '../webview/webview'

export function postPatch(patch) {
    if (inQiyiWeb) {
        on_receive_patch(patch)
    }else {
        __base__.postPatch("on_receive_patch(" + JSON.stringify(patch) + ");");
    }
}

