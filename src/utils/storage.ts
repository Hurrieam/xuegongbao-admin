import {isSSR} from './is';

function getStorage() {
    if (!isSSR) {
        return localStorage;
    }

    return {
        getItem: () => '',
        setItem: () => '',
        removeItem: () => ''
    };
}

export default getStorage();
