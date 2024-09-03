
const isServer = typeof window === 'undefined';

export const setJsonValueInLocalStorage = (key: string, value: any) => {
    const tempValue = typeof value === 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(key, tempValue);
};

export const getJsonValueFromLocalStorage = (key: string) => {

    if (!isServer) {
        let data: any = localStorage.getItem(key);
        try {
            return JSON.parse(data);
        } catch (error) {
            return data;
        }
    }

};

export const clearLocalStorage = () => {
    localStorage.clear();
};

export const removeJsonValueFromLocalStorage = (key: string) => {

    try {
        if (key) {
            localStorage.removeItem(key);
        } else {
            return 'Key not found in localStorage'
        }
    } catch (error) {
        console.log(error);
    }
}