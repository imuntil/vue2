/**
 * Created by 斌 on 2017/3/12.
 */
export default {
    phone: {
        getMessage(filed, params, data) {
            return (data && data.message) || 'phone number is wrong';
        },
        validate(value) {
            let _reg = /^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
            return _reg.test(value);
        }
    }
};