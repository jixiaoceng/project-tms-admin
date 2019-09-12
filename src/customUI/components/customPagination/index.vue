<template>
  <el-scrollbar class="emao-pagination">
    <el-pagination
      class="text-right"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="currentPage"
      :page-sizes="[50, 100]"
      :page-size="pageSize"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-scrollbar>
</template>

<script>
export default {
  props: {
    // 当前页
    currentPage: {
      type: Number || String,
      default: 1
    },
    // 默认多少条
    pageSize: {
      type: Number || String,
      default: 50
    },
    // 一共多少个元素
    total: {
      type: Number || String,
      default: 0
    }
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.$emit('getCurrentPage', currentPage)
    },
    handleSizeChange(pageSize) {
      this.$emit('getPerPage', pageSize)
    }
  }
}
</script>

<style lang="scss" scoped>
.emao-pagination{
  margin: 20px 0 0
}
</style>
