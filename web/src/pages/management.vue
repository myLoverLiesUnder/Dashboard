<template>
    <div>
        <div class="block">
            <div class="title">
                <el-divider content-position="left">Job Management</el-divider>
            </div>
            <div class="source">
                <el-table
                        :data="jobs"
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table :data="props.row.jobList" label-position="left" inline>
                                <el-table-column
                                        type="index">
                                </el-table-column>
                                <el-table-column
                                        label="JobName"
                                        prop="jobName"
                                        width="300px">
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="JobType"
                            prop="jobType">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import { getJobs, getJobTypes } from "../axios/api";

    export default {
        name: "management",
        data() {
            return {
                jobs: [],
                jobTypes: []
            }
        },
        methods: {
            getTableData() {
                getJobs().then(res => {
                    if (res.status === 200) {
                        this.jobs = res.data;
                        console.log(this.jobs)
                    }
                });
                getJobTypes().then(res => {
                    if (res.status === 200) {
                        this.jobTypes = res.data;
                        console.log(this.jobTypes)

                    }
                })
            }
        },
        mounted() {
            this.getTableData();
        }
    }
</script>

<style scoped>

</style>
