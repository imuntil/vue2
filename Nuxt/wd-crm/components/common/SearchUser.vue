<template>
  <div class="user-search">
    <el-autocomplete v-model="search" icon="circle-close"
                     :on-icon-click="handleIconClick"
                     placeholder="输入手机号码" @select="handleSelect"
                     :props="{ value: field, label: field }"
                     :fetch-suggestions="querySearch"
                     :trigger-on-focus="false">
      <el-button slot="append" icon="search"></el-button>
    </el-autocomplete>
    <el-button type="primary" style="margin-left: 20px;" @click="handleIconClick">重置</el-button>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { filterUserByPhone } from '~/assets/lib/api'
  /* eslint-disable no-unused-vars */
  import _ from 'lodash'
  export default {
    data () {
      return {
        search: '',
        field: 'phone',
        d: null
      }
    },
    computed: {
      ...mapState('user', ['store', 'all'])
    },
    methods: {
      handleIconClick () {
        this.search = ''
      },
      handleSelect (v) {
        this.$emit('select', v)
      },
      async querySearch (queryString, cb) {
        const s = queryString.trim()
        let res = []
        if (s.charAt(0) !== '1' || s.length < 3) {
          res = []
        } else if (this.all) {
          res = this.store.filter(this.createFilter(s))
        } else {
          if (this.d) {
            clearTimeout(this.d)
            this.d = null
          }
          this.d = setTimeout(async () => {
            res = await this.filterFromServer(s)
            cb(res)
            this.d = null
          }, 200)
        }
        cb(res)
      },
      createFilter (queryString) {
        return user => {
          return user.phone.indexOf(queryString) === 0
        }
      },
      async filterFromServer (ps) {
        const { err, fail, data } = await filterUserByPhone({ phoneStr: ps })
        if (err || fail) return []
        return data.data
      }
    },
    watch: {
      search (v) {
        if (!v.trim().length) {
          this.$emit('select-end')
        }
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss">

</style>
