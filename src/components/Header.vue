<template>
    <div class="header">
        <h1 class="icon">
            <img src="../assets/Rakuten.svg.png" alt="">
        </h1>
        <el-menu :default-active="activeIndex"
                 class="el-menu-demo"
                 mode="horizontal"
                 :router="true"
                 @select="handleSelect">
            <el-menu-item index="/">Dashboard</el-menu-item>
            <el-menu-item index="/Jenkins">Jenkins</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                activeIndex: '/',
            };
        },
        methods: {
            handleSelect(key, keyPath) {

            }
        }
    }
</script>

<style scoped>
    .header {
        height: 60px;
        border-bottom: 1px solid #dcdfe6;
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
