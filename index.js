/**
 * Created by Hao on 2018/5/15.
 */
import './style.less'
import template from './template.html'
import moment from 'moment'
import $ from 'jquery'

export default {
  template,
  props: {
    isPickerwidth: {
      type: Number,
      default: 135
    },
    isType: {
      type: String,
      default: 'daterange'
    },
    isLabel: {
      type: String,
      default: '选择时间'
    },
    isPlaceholder: {
      type: String,
      default: '请选择时间'
    },
    isDay: {
      type: Number,
      default: 0
    },
    isBefore: {
      type: Number,
      default: 6
    },
    isOptions: {
      type: Object,
      default: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  data () {
    return {
      dateVal: this.isType === 'daterange' ? [] : '',
      dateCopy: this.isType === 'daterange' ? [] : '',
      isFocus: false,
      selectDate: '',
      pickerOptions: this.isOptions,
      defaultTime: this.isType === 'daterange' ? ['00:00:00', '23:59:59'] : '00:00:00'
    }
  },
  methods: {
    // 设置默认通话时间
    setCallTime () {
      let sTime = moment().subtract(this.isBefore, 'd').format('MM-DD')
      let eTime = moment().format('MM-DD')
      let now = ''
      if (this.isType === 'daterange') {
        this.selectDate = sTime + ' ~ ' + eTime
        this.dateCopy = [moment().subtract(this.isBefore, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
        return
      } else if (this.isType === 'datetime') {
        now = moment().subtract(this.isDay, 'd').format('YYYY-MM-DD HH:mm:ss')
      } else {
        now = moment().subtract(this.isDay, 'd').format('YYYY-MM-DD')
      }
      this.dateCopy = now
      this.selectDate = now
    },
    // 选择时间
    dateChange () {
      this.$refs.refTime.focus()
    },
    dateFocus () {
      this.isFocus = true
    },
    dateBlur () {
      this.isFocus = false
      if (this.isType === 'daterange') {
        let before = moment(this.dateVal[0]).format('MM-DD')
        let now = moment(this.dateVal[1]).format('MM-DD')
        this.selectDate = before + ' ~ ' + now
      } else {
        let now = this.isType === 'date' ? moment(this.dateVal).format('YYYY-MM-DD') : moment(this.dateVal).format('YYYY-MM-DD HH:mm:ss')
        this.selectDate = now
      }
      this.$emit('my-blur', this.dateVal, 'blur')
    },
    clearTime () {
      this.dateVal = this.isType === 'daterange' ? [] : ''
      this.selectDate = ''
      this.setCallTime()
      this.$emit('my-blur', this.dateCopy, 'clear')
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setCallTime()
      if (this.isType === 'daterange') {
        $('.el-date-editor').removeClass('el-visible-style')
      } else {
        $('.el-date-editor').addClass('el-visible-style')
      }
    })
  },
  watch: {}
}
