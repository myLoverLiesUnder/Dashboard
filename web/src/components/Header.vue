<template>
    <div class="header">
        <div class="container">
            <h1 class="icon">
                <img src="../assets/Rakuten.svg.png" alt="">
            </h1>
            <el-menu :default-active="activeIndex"
                     class="el-menu-demo"
                     mode="horizontal"
                     :router="true">
                <el-menu-item index="/">Dashboard</el-menu-item>
                <el-menu-item index="/management">Management</el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        computed: {
            activeIndex: function () {
                return this.$store.state.activeIndex.activeIndex
            }
        },
    }
</script>

<style scoped>
    .header {
        height: 60px;
    }

    .container {
        height: 100%;
        border-bottom: 1px solid #dcdfe6;
        width: 1150px;
        margin: 0 auto;
    }

    .icon {
        float: left;
        margin: 0;
    }

    .icon > img {
        width: 146px;
        height: 50px;
    }

    .el-menu-demo {
        float: right;
    }

</style>
