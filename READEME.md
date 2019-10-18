
## 时间组件

### props

* isType :  设置为选择时间格式；daterange （选择时间段）  date （选择日期） date （选择日期时间）  默认 daterange [String]
* isLabel :  设置输入框label； 默认 选择时间 [String]
* isPlaceholder  ： 设置输入框提示文字；默认 请选择时间 [String]
* isDay  ： isType设置为date/datetime时，使用该属性可设置默认日期是某一天；默认 0 [Number]
* isBefore : isType设置为daterange时，使用该属性可设置默认日期是当前时间到之前的某一天； 默认 6 [Number]
* isPickerwidth :  设置组件宽度；  默认  135 [Number]
* isOptions :  设置组件是否可以选取当前时间之后的时间；  默认   { disabledDate (time) { return time.getTime() > Date.now() } }  [Object]


#### events数据

* @my-blur 监听事件；isType设置为date/datetime时，传入的参数是一个字符串；isType设置为daterange时，传入的参数是一个数组；

