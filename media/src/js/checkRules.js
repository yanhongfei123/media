const strategys = {
    isNotEmpty: function (value, errorMsg) {
        if (value === '') {
            return errorMsg;
        }
    },
    // 限制最小长度
    minLength: function (value, length, errorMsg) {
        if (value.length < length) {
            return errorMsg;
        }
    },
    // 手机号码格式
    mobileFormat: function (value, errorMsg) {
        if (!/(^1\d{1}[0-9]{9}$)/.test(value)) {
            return errorMsg;
        }
    },
    
};

export default strategys