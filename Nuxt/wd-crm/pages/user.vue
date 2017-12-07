<template>
  <section class="container user-index">
    <search-user @select="handleSelect" @select-end="handleSelectEnd"></search-user>
    <el-table :data="mode ? result : currentList" stripe class="user-list-table">
      <el-table-column type="index" fixed="left"></el-table-column>
      <el-table-column fixed="left" width="150" label="手机号码">
        <template scope="scope">
          <span v-if="mode">{{scope.row.phone}}</span>
          <span :title="scope.row.phone" v-else>{{scope.row.phone.replace(/^(\d{3})\d+(\d{4})$/, '$1****$2')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nick" label="昵称" min-width="150"></el-table-column>
      <el-table-column label="注册日期" min-width="120">
        <template scope="scope">
          <span>{{date(scope.row.created)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后登录" min-width="120"></el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template scope="scope">
          <el-button type="primary" size="mini">查看历史订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="sub-pager text--right" v-show="!mode">
      <el-pagination layout="prev, pager, next"
                     :total="totalPages" :page-size="1"
                     @current-change="handlePageChange"
                     :current-page="currentPage"
                     style="padding-right: 0; display: inline-block;"></el-pagination>
    </div>
  </section>
</template>
<script>
  import { user } from '~/assets/lib/constant'
  import { dateFormat } from '~/assets/lib/common-tools'
  import { mapState } from 'vuex'
  import SearchUser from '~/components/common/SearchUser'
  export default {
    async fetch ({ store }) {
      await store.dispatch({ type: `user/${user.FETCH_USER_LIST}` })
    },
    components: {
      SearchUser
    },
    data () {
      return {
        mode: 0,
        result: []
      }
    },
    computed: {
      ...mapState('user', [
        'currentList', 'itemPerPage', 'currentPage', 'totalPages'
      ])
    },
    methods: {
      date: dateFormat,
      handlePageChange (v) {
        console.log(v)
        this.$store.dispatch({
          type: `user/${user.FETCH_USER_LIST}`,
          currentPage: v
        })
      },
      handleSelect (v) {
        this.mode = 1
        this.result = [{ ...v }]
      },
      handleSelectEnd () {
        this.mode = 0
        this.result = []
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .user-index {
    display: block;
    padding-top: 25px;
    .sub-pager {
      margin-top: 25px;
    }
  }
</style>
