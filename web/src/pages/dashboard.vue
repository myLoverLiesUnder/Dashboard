<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="JobName"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="JobType"
                    prop="jobType">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { getJobs } from "../axios/api";

    export default {
        name: "dashboard",
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            getJobData() {
                getJobs().then((res) => {
                    if (res.status === 200) {
                        this.tableData = res.data;
                    }
                })
            }
        },
        mounted() {
            this.getJobData()
        }
    }
</script>

<style scoped>

</style>
