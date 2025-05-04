# 获取法定节假日信息

## 使用说明

* 数据来源(国务院办公厅)：https://www.gov.cn/zhengce/content/202411/content_6986382.htm
* 接口请求方法仅支持GET请求
* 个人项目不保证永久维护
* 开源免费

## 直接使用

### 接口地址

            https://holiday.qeeu.top/holiday

### 参数

        eg:
            https://holiday.qeeu.top/holiday?date=2025-05-01

### 响应

        eg:
            {
                "date": "2025-05-01",
                "year": 2025,
                "month": 5,
                "day": 1,
                "status": 3
            }

        status: 0普通工作日 1周末双休日 2需要补班的工作日 3法定节假日

### 注意事项

```
服务器资源有限，请勿频繁请求。
``` 
