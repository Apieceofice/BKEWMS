import moment from "moment";
moment.locale("zh-cn");
const formTime = {
  getTime: (date) => {
    //转化为中文时间
    return moment(date).format("YYYY/MM/DD");
  },
};

export default formTime;
